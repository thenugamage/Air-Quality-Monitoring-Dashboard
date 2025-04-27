// Form validation function
function validateForm() {
    var email = document.getElementById('email').value;
    var errorMessage = document.getElementById('error-message');
    var successMessage = document.getElementById('success-message');

    // Check if email field is empty
    if (email === "") {
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        return false;
    }

    // Check if email is valid using simple regex
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        return false;
    }

    // If everything is valid, show success message
    errorMessage.style.display = 'none';
    successMessage.style.display = 'block';

    // In a real application, you would submit the form here
    // For demo purposes, prevent form submission
    return false;
}