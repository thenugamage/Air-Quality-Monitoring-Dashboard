using AQI_Colombo.Models;
using MongoDB.Driver;

namespace AQI_Colombo.Services
{
    public class AQIReadingService
    {
        private readonly IMongoCollection<AQIReading> _aqiReadingsCollection;

        public AQIReadingService(IMongoDatabase database)
        {
            _aqiReadingsCollection = database.GetCollection<AQIReading>("AQIReadings");
        }

        public async Task<List<AQIReading>> GetReadingsBySensorIdAsync(string sensorId) =>
            await _aqiReadingsCollection.Find(r => r.SensorId == sensorId).ToListAsync();

        public async Task AddReadingAsync(AQIReading reading) =>
            await _aqiReadingsCollection.InsertOneAsync(reading);
    }
}
