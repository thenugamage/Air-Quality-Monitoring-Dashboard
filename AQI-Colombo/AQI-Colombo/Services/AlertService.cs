using AQI_Colombo.Models;
using MongoDB.Driver;

namespace AQI_Colombo.Services
{
    public class AlertService
    {
        private readonly IMongoCollection<Alert> _alertsCollection;

        public AlertService(IMongoDatabase database)
        {
            _alertsCollection = database.GetCollection<Alert>("Alerts");
        }

        public async Task<List<Alert>> GetAllAsync() =>
            await _alertsCollection.Find(_ => true).ToListAsync();

        public async Task<Alert?> GetByAQILevelAsync(string level) =>
            await _alertsCollection.Find(a => a.AQILevel == level).FirstOrDefaultAsync();

        public async Task CreateAsync(Alert alert) =>
            await _alertsCollection.InsertOneAsync(alert);

        public async Task UpdateAsync(string id, Alert updatedAlert) =>
            await _alertsCollection.ReplaceOneAsync(a => a.Id == id, updatedAlert);

        public async Task DeleteAsync(string id) =>
            await _alertsCollection.DeleteOneAsync(a => a.Id == id);
    }
}
