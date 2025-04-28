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
const addUserBtn = document.getElementById('add-user-btn');
const userModal = document.getElementById('user-modal');
const modalClose = document.getElementById('modal-close');
const cancelBtn = document.getElementById('cancel-btn');
const saveUserBtn = document.getElementById('save-user-btn');
const userForm = document.getElementById('user-form');

// Open modal when Add New User button is clicked
addUserBtn.addEventListener('click', function() {
userModal.classList.add('active');
document.querySelector('.modal-header h3').textContent = 'Add New User';
userForm.reset(); // Clear form fields
});

// Close modal when X button is clicked
modalClose.addEventListener('click', function() {
userModal.classList.remove('active');
});

// Close modal when Cancel button is clicked
cancelBtn.addEventListener('click', function() {
userModal.classList.remove('active');
});

// Handle save user
saveUserBtn.addEventListener('click', function() {
// Basic form validation
if (userForm.checkValidity()) {
// Here you would normally send data to server
alert('User saved successfully!');
userModal.classList.remove('active');
} else {
// Trigger form validation UI
userForm.reportValidity();
}
});

// Edit user functionality
const editButtons = document.querySelectorAll('.edit-btn');
editButtons.forEach(button => {
button.addEventListener('click', function() {
// Get the row data (in a real app, you would get this from a data attribute or API)
const row = this.closest('tr');
const username = row.cells[0].textContent;
const email = row.cells[1].textContent;
const role = row.cells[2].querySelector('.role-badge').textContent.toLowerCase();
const status = row.cells[3].textContent.trim().toLowerCase();

// Fill the form with user data
document.getElementById('username').value = username;
document.getElementById('email').value = email;
document.getElementById('password').value = '********'; // Placeholder for password
document.getElementById('role').value = role;
document.getElementById('status').value = status;

// Change modal title
document.querySelector('.modal-header h3').textContent = 'Edit User';

// Open modal
userModal.classList.add('active');
});
});

// Delete user functionality
const deleteButtons = document.querySelectorAll('.delete-btn');
deleteButtons.forEach(button => {
button.addEventListener('click', function() {
const row = this.closest('tr');
const username = row.cells[0].textContent;

if (confirm(`Are you sure you want to delete user "${username}"?`)) {
    // In a real app, you would call an API to delete the user
    row.remove();
    alert('User deleted successfully');
}
});
});

// Search functionality
const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('input', function() {
const searchTerm = this.value.toLowerCase();
const tableRows = document.querySelectorAll('.users-table tbody tr');

tableRows.forEach(row => {
const username = row.cells[0].textContent.toLowerCase();
const email = row.cells[1].textContent.toLowerCase();
const role = row.cells[2].textContent.toLowerCase();

if (username.includes(searchTerm) || email.includes(searchTerm) || role.includes(searchTerm)) {
    row.style.display = '';
} else {
    row.style.display = 'none';
}
});
});

// Pagination functionality
const paginationButtons = document.querySelectorAll('.pagination-btn');
paginationButtons.forEach(button => {
button.addEventListener('click', function() {
// Remove active class from all buttons
paginationButtons.forEach(btn => btn.classList.remove('active'));

// Add active class to clicked button
this.classList.add('active');

// In a real app, you would fetch data for the selected page here
});
});

// Export user list functionality
const exportButton = document.querySelector('.btn-outline');
exportButton.addEventListener('click', function() {
alert('User list exported successfully!');
// In a real app, you would generate and download a CSV/Excel file
});