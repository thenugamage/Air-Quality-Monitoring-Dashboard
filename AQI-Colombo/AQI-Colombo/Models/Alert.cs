using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace AQI_Colombo.Models
{
    public class Alert
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string AQILevel { get; set; } = string.Empty;
        public int ThresholdValue { get; set; }
        public string AlertMessage { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
