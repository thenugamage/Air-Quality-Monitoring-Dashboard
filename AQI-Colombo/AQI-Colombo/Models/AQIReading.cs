using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace AQI_Colombo.Models
{
    public class AQIReading
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string SensorId { get; set; } = string.Empty;
        public int AQI { get; set; }
        public DateTime RecordedAt { get; set; } = DateTime.UtcNow;
    }
}
