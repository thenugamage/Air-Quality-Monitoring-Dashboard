using AQI_Colombo.Models;
using MongoDB.Driver;

namespace AQI_Colombo.Services
{
    public class SensorService
    {
        private readonly IMongoCollection<Sensor> _sensorsCollection;

        public SensorService(IMongoDatabase database)
        {
            _sensorsCollection = database.GetCollection<Sensor>("Sensors");
        }

        public async Task<List<Sensor>> GetAllAsync() =>
            await _sensorsCollection.Find(_ => true).ToListAsync();

        public async Task<Sensor?> GetByIdAsync(string id) =>
            await _sensorsCollection.Find(s => s.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Sensor sensor) =>
            await _sensorsCollection.InsertOneAsync(sensor);

        public async Task UpdateAsync(string id, Sensor updatedSensor) =>
            await _sensorsCollection.ReplaceOneAsync(s => s.Id == id, updatedSensor);

        public async Task DeleteAsync(string id) =>
            await _sensorsCollection.DeleteOneAsync(s => s.Id == id);
    }
}
