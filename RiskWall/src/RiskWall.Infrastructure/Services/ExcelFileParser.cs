using ExcelDataReader;
using RiskWall.Core.Entities;
using RiskWall.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;

namespace RiskWall.Infrastructure.Services
{
    public class ExcelFileParser : IFileParser
    {
        public ExcelFileParser()
        {
             System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
        }

        public IEnumerable<Alert> Parse(Stream stream, string filename)
        {
            var alerts = new List<Alert>();

            if (filename.EndsWith(".csv", StringComparison.OrdinalIgnoreCase))
            {
                // Use StreamReader for text/log tailing support
                // LeaveOpen: true so we don't close the base stream (Worker manages it)
                using (var reader = new StreamReader(stream, System.Text.Encoding.UTF8, detectEncodingFromByteOrderMarks: true, bufferSize: 1024, leaveOpen: true))
                {
                    string? line;
                    while ((line = reader.ReadLine()) != null)
                    {
                        if (string.IsNullOrWhiteSpace(line)) continue;

                        var parts = line.Split(',');
                        
                        // Skip header if it looks like one (simple check)
                        if (parts.Length > 0 && parts[0].Equals("Message", StringComparison.OrdinalIgnoreCase)) continue;

                        if (parts.Length > 0)
                        {
                            alerts.Add(new Alert
                            {
                                Id = Guid.NewGuid(),
                                Message = parts[0].Replace("\0", "").Trim(),
                                Severity = parts.Length > 1 ? parts[1].Replace("\0", "").Trim() : "Info",
                                SourceFile = filename,
                                CreatedAt = DateTime.UtcNow
                            });
                        }
                    }
                }
                return alerts;
            }

            IExcelDataReader excelReader = ExcelReaderFactory.CreateReader(stream);

            using (excelReader)
            {
                var result = excelReader.AsDataSet(new ExcelDataSetConfiguration()
                {
                    ConfigureDataTable = (_) => new ExcelDataTableConfiguration()
                    {
                        UseHeaderRow = true
                    }
                });

                if (result.Tables.Count > 0)
                {
                    var table = result.Tables[0];
                    foreach (DataRow row in table.Rows)
                    {
                        var msg = row[0]?.ToString();
                        if (!string.IsNullOrWhiteSpace(msg))
                        {
                            alerts.Add(new Alert
                            {
                                Id = Guid.NewGuid(),
                                Message = msg,
                                Severity = table.Columns.Count > 1 ? (row[1]?.ToString() ?? "Info") : "Info",
                                SourceFile = filename,
                                CreatedAt = DateTime.UtcNow
                            });
                        }
                    }
                }
            }
            return alerts;
        }
    }
}
