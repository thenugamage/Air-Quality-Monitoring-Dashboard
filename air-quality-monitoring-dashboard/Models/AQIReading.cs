using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace air_quality_monitoring_dashboard.Models
{
    public class AQIReading
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("sensorId")]
        public string SensorId { get; set; }

        [BsonElement("aqi")]
        public int AQI { get; set; }

        [BsonElement("timestamp")]
        public DateTime Timestamp { get; set; }
    }
}
