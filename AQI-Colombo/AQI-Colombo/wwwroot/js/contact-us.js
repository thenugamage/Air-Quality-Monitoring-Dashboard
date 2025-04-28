
        document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
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
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Initialize the office location map
    if (document.getElementById('contact-map')) {
        const map = L.map('contact-map').setView([6.9271, 79.8612], 15);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Add marker for office location
        const officeIcon = L.icon({
            iconUrl: '../images/office-marker.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });
        
        // Fallback to default marker if custom icon fails
        const marker = L.marker([6.9271, 79.8612], {
            icon: officeIcon
        }).addTo(map);
        
        marker.bindPopup("<b>AQI Colombo Office</b><br>123 Air Quality Avenue<br>Colombo 07, Sri Lanka").openPopup();
    }
    
    // Contact form submission handling
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission (in a real app, this would send data to a server)
            // Here we're just showing a success message after a short delay
            showFormMessage('Sending your message...', 'sending');
            
            setTimeout(() => {
                showFormMessage('Your message has been sent successfully! We will get back to you soon.', 'success');
                contactForm.reset();
            }, 1500);
        });
    }
    
    function showFormMessage(msg, type) {
        formMessage.textContent = msg;
        formMessage.className = 'form-message';
        
        if (type === 'success') {
            formMessage.classList.add('success');
        } else if (type === 'error') {
            formMessage.classList.add('error');
        } else {
            formMessage.style.color = '#3f51b5';
        }
        
        formMessage.style.display = 'block';
        
        // Scroll to the message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    function initializeMap() {
            // Check if the map container exists
            const mapContainer = document.getElementById('contact-map');
            if (!mapContainer) return;
            
            // Initialize the map with Colombo coordinates
            const map = L.map('contact-map').setView([6.9271, 79.8612], 15);
            
            // Add the tile layer (OpenStreetMap)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19
            }).addTo(map);
            
            // Create a default marker (without custom icon to avoid loading issues)
            const marker = L.marker([6.9271, 79.8612]).addTo(map);
            
            // Add popup to the marker
            marker.bindPopup("<b>AQI Colombo Office</b><br>123 Air Quality Avenue<br>Colombo 07, Sri Lanka").openPopup();
            
            // Force map to recalculate its size
            setTimeout(function() {
                map.invalidateSize();
            }, 100);
        }
});
