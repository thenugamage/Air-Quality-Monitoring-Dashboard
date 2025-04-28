
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map centered on Colombo
    const map = L.map('aqi-map').setView([6.9271, 79.8612], 12);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Sample sensor data - replace with your actual data source
    const sensorData = [
      {
        id: 1,
        location: "Fort",
        latitude: 6.9344,
        longitude: 79.8428,
        aqi: 45,
        category: "Good",
        lastUpdated: "2025-04-21 10:15",
        trend: [42, 39, 45, 50, 47, 45]
      },
      {
        id: 2,
        location: "Pettah",
        latitude: 6.9365,
        longitude: 79.8500,
        aqi: 78,
        category: "Moderate",
        lastUpdated: "2025-04-21 10:10",
        trend: [65, 70, 72, 75, 80, 78]
      },
      {
        id: 3,
        location: "Kollupitiya",
        latitude: 6.9147,
        longitude: 79.8500,
        aqi: 110,
        category: "Unhealthy for Sensitive Groups",
        lastUpdated: "2025-04-21 10:20",
        trend: [95, 100, 105, 115, 120, 110]
      },
      {
        id: 4,
        location: "Borella",
        latitude: 6.9142,
        longitude: 79.8775,
        aqi: 165,
        category: "Unhealthy",
        lastUpdated: "2025-04-21 10:05",
        trend: [150, 155, 160, 170, 175, 165]
      },
      {
        id: 5,
        location: "Dematagoda",
        latitude: 6.9372,
        longitude: 79.8800,
        aqi: 210,
        category: "Very Unhealthy",
        lastUpdated: "2025-04-21 10:25",
        trend: [190, 200, 220, 230, 215, 210]
      }
    ];
    
    // Function to determine marker color based on AQI
    function getMarkerColor(aqi) {
      if (aqi <= 50) return '#00e400'; // Good
      if (aqi <= 100) return '#ffff00'; // Moderate
      if (aqi <= 150) return '#ff7e00'; // Unhealthy for Sensitive Groups
      if (aqi <= 200) return '#ff0000'; // Unhealthy
      if (aqi <= 300) return '#99004c'; // Very Unhealthy
      return '#7e0023'; // Hazardous
    }
    
    // Add markers for each sensor
    sensorData.forEach(sensor => {
      const markerColor = getMarkerColor(sensor.aqi);
      
      // Create custom icon with the AQI color
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: ${markerColor}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; color: ${sensor.aqi > 150 ? 'white' : 'black'}; font-weight: bold; font-size: 10px;">${sensor.aqi}</div>`,
        iconSize: [25, 25],
        iconAnchor: [12, 12],
        popupAnchor: [0, -10]
      });
      
      // Create marker with custom icon
      const marker = L.marker([sensor.latitude, sensor.longitude], { icon: customIcon }).addTo(map);
      
      // Add click event to display sensor details
      marker.on('click', function() {
        displaySensorDetails(sensor);
      });
      
      // Add a simple popup with basic info
      marker.bindPopup(`<b>${sensor.location}</b><br>AQI: ${sensor.aqi} (${sensor.category})`);
    });
    
    // Display sensor details and trend chart
    function displaySensorDetails(sensor) {
      // Update the sensor info panel
      document.getElementById('sensor-location').textContent = `Location: ${sensor.location}`;
      document.getElementById('sensor-aqi').textContent = `Current AQI: ${sensor.aqi}`;
      document.getElementById('sensor-category').textContent = `Category: ${sensor.category}`;
      document.getElementById('sensor-updated').textContent = `Last Updated: ${sensor.lastUpdated}`;
      
      // Show the sensor info panel if it's hidden
      document.getElementById('sensor-info').classList.remove('hidden');
      
      // Create/update the trend chart
      const ctx = document.getElementById('aqi-trend-chart');
      
      // Clear previous chart if exists
      if (window.aqiChart) {
        window.aqiChart.destroy();
      }
      
      // Calculate 6 hours back based on the current time
      const labels = [];
      for (let i = 5; i >= 0; i--) {
        labels.push(`${i} hr ago`);
      }
      labels[5] = 'Now';
      
      // Create the chart
      window.aqiChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'AQI Trend (Last 6 Hours)',
            data: sensor.trend,
            fill: false,
            borderColor: getMarkerColor(sensor.aqi),
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: false,
              suggestedMin: Math.min(...sensor.trend) - 10,
              suggestedMax: Math.max(...sensor.trend) + 10
            }
          }
        }
      });
    }
    
    // Simulate real-time updates (for demonstration purposes)
    setInterval(function() {
      sensorData.forEach(sensor => {
        // Simulate a small random change in AQI
        const change = Math.floor(Math.random() * 7) - 3; // -3 to +3
        sensor.aqi = Math.max(1, sensor.aqi + change);
        
        // Update the category based on new AQI
        if (sensor.aqi <= 50) sensor.category = "Good";
        else if (sensor.aqi <= 100) sensor.category = "Moderate";
        else if (sensor.aqi <= 150) sensor.category = "Unhealthy for Sensitive Groups";
        else if (sensor.aqi <= 200) sensor.category = "Unhealthy";
        else if (sensor.aqi <= 300) sensor.category = "Very Unhealthy";
        else sensor.category = "Hazardous";
        
        // Update the timestamp
        const now = new Date();
        sensor.lastUpdated = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        
        // Shift the trend array and add the new value
        sensor.trend.shift();
        sensor.trend.push(sensor.aqi);
      });
      
      // Update the map (clearing and re-adding markers)
      map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });
      
      // Re-add markers with updated data
      sensorData.forEach(sensor => {
        const markerColor = getMarkerColor(sensor.aqi);
        
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="background-color: ${markerColor}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; color: ${sensor.aqi > 150 ? 'white' : 'black'}; font-weight: bold; font-size: 10px;">${sensor.aqi}</div>`,
          iconSize: [25, 25],
          iconAnchor: [12, 12],
          popupAnchor: [0, -10]
        });
        
        const marker = L.marker([sensor.latitude, sensor.longitude], { icon: customIcon }).addTo(map);
        
        marker.on('click', function() {
          displaySensorDetails(sensor);
        });
        
        marker.bindPopup(`<b>${sensor.location}</b><br>AQI: ${sensor.aqi} (${sensor.category})`);
      });
      
      // Update the details panel if it's currently displayed
      const sensorInfo = document.getElementById('sensor-info');
      if (!sensorInfo.classList.contains('hidden')) {
        const locationText = document.getElementById('sensor-location').textContent;
        const locationName = locationText.replace('Location: ', '');
        const selectedSensor = sensorData.find(s => s.location === locationName);
        
        if (selectedSensor) {
          displaySensorDetails(selectedSensor);
        }
      }
    }, 60000); // Update every minute
  });

/* Simple JavaScript to toggle the menu */

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');
  const body = document.body;
  
  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  body.appendChild(overlay);
  
  // Add click event to menu toggle
  menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('menu-open');
  });
  
  // Close menu when clicking overlay
  overlay.addEventListener('click', function() {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('menu-open');
  });
  
  // Add animation delay to nav items
  const navItems = document.querySelectorAll('nav ul li');
  navItems.forEach((item, index) => {
    item.style.setProperty('--i', index);
  });
});


/* CSS for the menu overlay */
body.classList.toggle('menu-open');


document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');
  const body = document.body;

  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  body.appendChild(overlay);

  // Add click event to menu toggle
  menuToggle.addEventListener('click', function () {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('menu-open');
  });

  // Close menu when clicking overlay
  overlay.addEventListener('click', function () {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('menu-open');
  });
});
