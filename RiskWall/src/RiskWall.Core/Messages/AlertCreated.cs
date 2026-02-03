using System;

namespace RiskWall.Core.Messages
{
    public class AlertCreated
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Severity { get; set; } = string.Empty;
        public string SourceFile { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string Details { get; set; } = string.Empty;
        public bool IsAcknowledged { get; set; }

        public AlertCreated() { }

        public AlertCreated(Guid id, DateTime createdAt, string severity, string sourceFile, string message, string details, bool isAcknowledged)
        {
            Id = id;
            CreatedAt = createdAt;
            Severity = severity;
            SourceFile = sourceFile;
            Message = message;
            Details = details;
            IsAcknowledged = isAcknowledged;
        }
    }
}
