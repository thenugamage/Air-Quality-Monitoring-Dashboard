using Microsoft.AspNetCore.Mvc.RazorPages;
using air_quality_monitoring_dashboard.Services;
using System.Threading.Tasks;

namespace air_quality_monitoring_dashboard.Pages.Admin
{
    public class DashboardModel : PageModel
    {
        private readonly MongoDbService _mongoService;

        public int ActiveSensorsCount { get; set; }
        public int TotalReadingsCount { get; set; }

        public DashboardModel(MongoDbService mongoService)
        {
            _mongoService = mongoService;
        }

        public async Task OnGetAsync()
        {
            var sensors = await _mongoService.GetSensorsAsync();
            var readings = await _mongoService.GetAllAQIReadingsAsync(); // We'll add this method next!

            ActiveSensorsCount = sensors.Count(s => s.IsActive);
            TotalReadingsCount = readings.Count;
        }
    }
}
