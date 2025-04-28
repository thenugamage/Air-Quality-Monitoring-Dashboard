// Contact Us Page JavaScript

        // Form validation function
        function validateForm() {
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;

            // Check if fields are empty
            if (username === "" || password === "") {
                document.getElementById('error-message').style.display = 'block';
                return false;
            }

            // If everything is valid, hide error message
            document.getElementById('error-message').style.display = 'none';
            return true;
        }
