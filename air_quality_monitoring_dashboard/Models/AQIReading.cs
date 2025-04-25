namespace air_quality_monitoring_dashboard.Models
{
    public class AQIReading
    {
        public int Id { get; set; }
        public int SensorId { get; set; }
        public Sensor Sensor { get; set; }
        public int AQI { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
