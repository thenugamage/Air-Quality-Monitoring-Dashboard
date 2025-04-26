using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace air_quality_monitoring_dashboard.Models
{
    public class Sensor
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("location")]
        public string Location { get; set; }

        [BsonElement("latitude")]
        public double Latitude { get; set; }

        [BsonElement("longitude")]
        public double Longitude { get; set; }

        [BsonElement("isActive")]
        public bool IsActive { get; set; }
    }
}
