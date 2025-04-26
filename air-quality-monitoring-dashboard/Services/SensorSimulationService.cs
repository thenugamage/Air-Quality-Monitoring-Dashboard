using Microsoft.Extensions.Hosting;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using air_quality_monitoring_dashboard.Services;
using air_quality_monitoring_dashboard.Models;

namespace air_quality_monitoring_dashboard.Services
{
    public class SensorSimulationService : BackgroundService
    {
        private readonly MongoDbService _mongoService;
        private readonly Random _rand = new();

        public SensorSimulationService(MongoDbService mongoService)
        {
            _mongoService = mongoService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var sensors = await _mongoService.GetSensorsAsync();

                // Only simulate for active sensors
                var activeSensors = sensors.Where(s => s.IsActive).ToList();

                foreach (var sensor in activeSensors)
                {
                    var aqi = _rand.Next(50, 200); // Random AQI value between 50-200

                    var reading = new AQIReading
                    {
                        SensorId = sensor.Id,
                        AQI = aqi,
                        Timestamp = DateTime.UtcNow
                    };

                    await _mongoService.AddAQIReadingAsync(reading);
                }

                // Wait for 5 minutes before generating next set of data
                await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
            }
        }
    }
}
