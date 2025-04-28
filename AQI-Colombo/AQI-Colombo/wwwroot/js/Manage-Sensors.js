// Mobile menu toggle functionality
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const hamburgerMenu = document.querySelector('.hamburger-menu');

menuToggle.addEventListener('click', function() {
    sidebar.classList.toggle('active');
    hamburgerMenu.classList.toggle('open');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(event) {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnMenuToggle = menuToggle.contains(event.target);
    
    if (!isClickInsideSidebar && !isClickOnMenuToggle && window.innerWidth <= 768) {
        sidebar.classList.remove('active');
        hamburgerMenu.classList.remove('open');
    }
});

// Reset sidebar state on window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
        hamburgerMenu.classList.remove('open');
    }
});
// Modal functionality
const addSensorBtn = document.querySelector('.btn-primary'); // Button to add new sensor
const sensorModal = document.getElementById('sensor-modal');
const modalClose = document.getElementById('modal-close');
const cancelBtn = document.getElementById('cancel-btn');
const saveSensorBtn = document.getElementById('save-sensor-btn');
const sensorForm = document.getElementById('sensor-form');

// Function to open modal
function openModal() {
sensorModal.classList.add('active');
document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open

}

// Function to close modal
function closeModal() {
sensorModal.classList.remove('active');
document.body.style.overflow = ''; // Re-enable scrolling
sensorForm.reset(); // Reset form fields
}

// Event listeners for modal
addSensorBtn.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

// Close modal when clicking outside of it
sensorModal.addEventListener('click', function(event) {
if (event.target === sensorModal) {
closeModal();
}
});

// Form submission
saveSensorBtn.addEventListener('click', function(event) {
event.preventDefault();

// Form validation
if (sensorForm.checkValidity()) {
// Here you would normally process the form data
// For now, we'll just close the modal and show an alert
alert('Sensor saved successfully!');
closeModal();
} else {
// Trigger the browser's form validation
sensorForm.reportValidity();
}
});

// Edit sensor functionality
const editButtons = document.querySelectorAll('.edit-btn');
editButtons.forEach(button => {
button.addEventListener('click', function() {
// Get the sensor data from the row
const row = this.closest('tr');
const sensorId = row.cells[0].textContent;
const location = row.cells[1].textContent;
const status = row.cells[2].textContent.trim().includes('Active') ? 'active' : 
              row.cells[2].textContent.trim().includes('Inactive') ? 'inactive' : 'error';

// Populate the form with the data
document.getElementById('sensorId').value = sensorId;
document.getElementById('location').value = location;
document.getElementById('status').value = status;

// Change the modal title to indicate editing
document.querySelector('.modal-header h3').textContent = 'Edit Sensor';

// Open the modal
openModal();
});
});