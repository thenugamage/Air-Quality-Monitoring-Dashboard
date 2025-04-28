using AQI_Colombo.Models;
using AQI_Colombo.Services;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AQI_Colombo.Pages
{
    public class ManageSensorsModel : PageModel
    {
        private readonly SensorService _sensorService;

        public ManageSensorsModel(SensorService sensorService)
        {
            _sensorService = sensorService;
        }

        public List<Sensor> Sensors { get; set; } = new();

        public async Task OnGetAsync()
        {
            Sensors = await _sensorService.GetAllAsync();
        }
    }
}