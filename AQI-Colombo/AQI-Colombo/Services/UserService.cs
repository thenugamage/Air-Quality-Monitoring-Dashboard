using AQI_Colombo.Models;
using MongoDB.Driver;

namespace AQI_Colombo.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _usersCollection;

        public UserService(IMongoDatabase database)
        {
            _usersCollection = database.GetCollection<User>("Users");
        }

        public async Task<User?> GetByUsernameAsync(string username) =>
            await _usersCollection.Find(u => u.Username == username).FirstOrDefaultAsync();

        public async Task CreateAsync(User user) =>
            await _usersCollection.InsertOneAsync(user);
    }
}
