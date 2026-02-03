using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using RiskWall.API.Hubs;
using RiskWall.Core.Entities;
using RiskWall.Core.Interfaces;
using System.Threading.Tasks;

namespace RiskWall.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlertsController : ControllerBase
    {
        private readonly IAlertRepository _repository;
        private readonly IHubContext<AlertHub> _hubContext;

        public AlertsController(IAlertRepository repository, IHubContext<AlertHub> hubContext)
        {
            _repository = repository;
            _hubContext = hubContext;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] bool activeOnly = false)
        {
            var alerts = activeOnly ? await _repository.GetActiveAsync() : await _repository.GetAllAsync();
            return Ok(alerts);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Alert alert)
        {
            await _repository.AddAsync(alert);
            // Broadcast to all connected clients
            await _hubContext.Clients.All.SendAsync("ReceiveAlert", alert);
            return CreatedAtAction(nameof(Get), new { id = alert.Id }, alert);
        }
    }
}
