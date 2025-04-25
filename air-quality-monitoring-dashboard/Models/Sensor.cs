namespace air_quality_monitoring_dashboard.Models
{
    public class Sensor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; } // optional
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public bool IsActive { get; set; }
        public List<AQIReading> Readings { get; set; }
    }
}
