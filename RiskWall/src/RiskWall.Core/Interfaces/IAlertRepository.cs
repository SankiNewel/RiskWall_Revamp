using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using RiskWall.Core.Entities;

namespace RiskWall.Core.Interfaces
{
    public interface IAlertRepository
    {
        Task<Alert> AddAsync(Alert alert);
        Task<IEnumerable<Alert>> GetAllAsync();
        Task<IEnumerable<Alert>> GetActiveAsync(); // Unacknowledged
        Task<Alert?> GetByIdAsync(Guid id);
        Task UpdateAsync(Alert alert);
    }
}
