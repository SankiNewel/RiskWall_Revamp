using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RiskWall.Core.Interfaces;
using RiskWall.Infrastructure.Data;
using RiskWall.Infrastructure.Services;

namespace RiskWall.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(connectionString));

            services.AddScoped<IAlertRepository, AlertRepository>();
            services.AddScoped<IFileParser, ExcelFileParser>();

            return services;
        }
    }
}
