using MassTransit;
using Microsoft.AspNetCore.SignalR;
using RiskWall.API.Hubs;
using RiskWall.Core.Entities;
using RiskWall.Core.Interfaces;
using RiskWall.Core.Messages;

namespace RiskWall.API.Consumers
{
    public class AlertConsumer : IConsumer<AlertCreated>
    {
        private readonly ILogger<AlertConsumer> _logger;
        private readonly IAlertRepository _alertRepository;
        private readonly IHubContext<AlertHub> _hubContext;

        public AlertConsumer(ILogger<AlertConsumer> logger, IAlertRepository alertRepository, IHubContext<AlertHub> hubContext)
        {
            _logger = logger;
            _alertRepository = alertRepository;
            _hubContext = hubContext;
        }

        public async Task Consume(ConsumeContext<AlertCreated> context)
        {
            var message = context.Message;
            _logger.LogInformation("Received Alert: {Message}", message.Message);

            var alert = new Alert
            {
                Id = message.Id,
                CreatedAt = message.CreatedAt,
                Severity = message.Severity,
                SourceFile = message.SourceFile,
                Message = message.Message,
                Details = message.Details,
                IsAcknowledged = message.IsAcknowledged
            };

            await _alertRepository.AddAsync(alert);
            await _hubContext.Clients.All.SendAsync("ReceiveAlert", alert);
        }
    }
}
