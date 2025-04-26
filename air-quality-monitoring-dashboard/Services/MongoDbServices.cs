using MongoDB.Driver;
using air_quality_monitoring_dashboard.Models;

namespace air_quality_monitoring_dashboard.Services
{
    public class MongoDbService
    {
        private readonly IMongoCollection<Sensor> _sensors;
        private readonly IMongoCollection<AQIReading> _aqiReadings;
        private readonly IMongoCollection<User> _users;

        public MongoDbService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("MongoDb"));
            var database = client.GetDatabase("AQIDashboardDb");

            _sensors = database.GetCollection<Sensor>("Sensors");
            _aqiReadings = database.GetCollection<AQIReading>("AQIReadings");
            _users = database.GetCollection<User>("Users");
        }

        // CRUD operations

        public async Task<List<Sensor>> GetSensorsAsync() =>
            await _sensors.Find(sensor => true).ToListAsync();

        public async Task<Sensor> GetSensorByIdAsync(string id) =>
            await _sensors.Find(sensor => sensor.Id == id).FirstOrDefaultAsync();

        public async Task CreateSensorAsync(Sensor sensor) =>
            await _sensors.InsertOneAsync(sensor);

        public async Task UpdateSensorAsync(string id, Sensor sensor) =>
            await _sensors.ReplaceOneAsync(s => s.Id == id, sensor);

        public async Task DeleteSensorAsync(string id) =>
            await _sensors.DeleteOneAsync(sensor => sensor.Id == id);

        public async Task AddAQIReadingAsync(AQIReading reading) =>
            await _aqiReadings.InsertOneAsync(reading);

        public async Task<List<AQIReading>> GetAQIReadingsBySensorIdAsync(string sensorId) =>
            await _aqiReadings.Find(r => r.SensorId == sensorId).ToListAsync();
        public async Task<List<AQIReading>> GetAllAQIReadingsAsync() =>
            await _aqiReadings.Find(r => true).ToListAsync();
        public async Task<List<User>> GetAllUsersAsync() =>
            await _users.Find(u => true).ToListAsync();


    }
}
