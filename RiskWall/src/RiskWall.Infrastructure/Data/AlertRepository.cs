using Microsoft.EntityFrameworkCore;
using RiskWall.Core.Entities;
using RiskWall.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RiskWall.Infrastructure.Data
{
    public class AlertRepository : IAlertRepository
    {
        private readonly AppDbContext _context;

        public AlertRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Alert> AddAsync(Alert alert)
        {
            _context.Alerts.Add(alert);
            await _context.SaveChangesAsync();
            return alert;
        }

        public async Task<IEnumerable<Alert>> GetAllAsync()
        {
            return await _context.Alerts.OrderByDescending(a => a.CreatedAt).ToListAsync();
        }

        public async Task<IEnumerable<Alert>> GetActiveAsync()
        {
            return await _context.Alerts
                .Where(a => !a.IsAcknowledged)
                .OrderByDescending(a => a.CreatedAt)
                .ToListAsync();
        }

        public async Task<Alert?> GetByIdAsync(Guid id)
        {
            return await _context.Alerts.FindAsync(id);
        }

        public async Task UpdateAsync(Alert alert)
        {
            _context.Entry(alert).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
