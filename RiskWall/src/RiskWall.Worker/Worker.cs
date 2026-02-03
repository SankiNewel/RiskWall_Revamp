using RiskWall.Core.Entities;
using RiskWall.Core.Interfaces;
using RiskWall.Infrastructure.Services;
using MassTransit;

namespace RiskWall.Worker
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly IConfiguration _configuration;
        private readonly IFileParser _fileParser;
        private FileSystemWatcher? _watcher;
        private readonly IBus _bus; // Use IBus for Singleton consumers

        public Worker(ILogger<Worker> logger, IConfiguration configuration, IBus bus)
        {
            _logger = logger;
            _configuration = configuration;
            _fileParser = new ExcelFileParser(); // Ideally DI, but manual for now locally
            _bus = bus;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var path = _configuration["WatchPath"] ?? @"C:\Sanket\RiskWall\DropZone";
            if (!Directory.Exists(path)) Directory.CreateDirectory(path);

            _watcher = new FileSystemWatcher(path, "*.*")
            {
                NotifyFilter = NotifyFilters.FileName | NotifyFilters.LastWrite
            };

            _watcher.Changed += async (s, e) => await ProcessFile(e.FullPath);
            _watcher.EnableRaisingEvents = true;

            _logger.LogInformation("Worker running. Watching: {Path}", path);

            while (!stoppingToken.IsCancellationRequested)
            {
                await Task.Delay(1000, stoppingToken);
            }
        }

        private readonly Dictionary<string, long> _fileOffsets = new();
        private readonly System.Collections.Concurrent.ConcurrentDictionary<string, SemaphoreSlim> _fileLocks = new();

        private async Task ProcessFile(string filePath)
        {
            var semaphore = _fileLocks.GetOrAdd(filePath, _ => new SemaphoreSlim(1, 1));
            
            // Wait to enter critical section for this file
            if (!await semaphore.WaitAsync(0))
            {
                // If we can't get the lock immediately (or within small timeout), it implies another event is processing it.
                // Since we seek to end, we can ignore this event or wait? 
                // Better to wait standard way to ensure we process latest data eventually.
                await semaphore.WaitAsync();
            }

            try
            {
                 _logger.LogInformation("Processing file: {Path}", filePath);
                
                // Small delay to allow write to complete if it was a write event
                await Task.Delay(200);

                using var stream = File.Open(filePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                
                long lastOffset = 0;
                if (_fileOffsets.ContainsKey(filePath))
                {
                    lastOffset = _fileOffsets[filePath];
                }

                _logger.LogInformation("File: {Path}, StreamLen: {Len}, LastOffset: {Offset}", filePath, stream.Length, lastOffset);

                if (stream.Length < lastOffset)
                {
                    lastOffset = 0;
                }

                stream.Seek(lastOffset, SeekOrigin.Begin);

                if (stream.Position == stream.Length)
                {
                    return;
                }

                var alerts = _fileParser.Parse(stream, Path.GetFileName(filePath));

                _fileOffsets[filePath] = stream.Position;

                foreach (var alert in alerts)
                {
                    try
                    {
                        var message = new RiskWall.Core.Messages.AlertCreated(
                            alert.Id,
                            alert.CreatedAt,
                            alert.Severity,
                            alert.SourceFile,
                            alert.Message,
                            alert.Details ?? string.Empty,
                            alert.IsAcknowledged
                        );

                        await _bus.Publish(message);
                        _logger.LogInformation("Alert published: {Message}", alert.Message);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Failed to publish alert");
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing file: {Path}", filePath);
            }
            finally
            {
                semaphore.Release();
            }
        }
    }
}
