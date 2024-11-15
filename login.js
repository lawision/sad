document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    // Predefined admin credentials
    const adminEmail = 'admin@example.com'; // Change this to your desired admin email
    const adminPassword = 'admin123'; // Change this to your desired admin password

    // Clear error message when user starts typing
    const clearErrorMessage = () => {
        errorMessage.textContent = '';
    };

    // Event listener for form submission
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        clearErrorMessage(); // Clear previous error message

        const email = document.getElementById('username').value.trim(); // Use email instead of username
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            errorMessage.textContent = 'Please enter both email and password.';
            return;
        }

        // Check if the entered credentials match the admin credentials
        if (email === adminEmail && password === adminPassword) {
            // If admin login is successful, redirect to the admin page
            localStorage.setItem('loggedInUserEmail', adminEmail); // Store admin email in localStorage
            window.location = 'admin.html';
            return;
        }

        // Get registered users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the email and password match any registered user
        const user = users.find(user => user.emailAddress === email && user.password === password);

        if (user) {
            // If login is successful, store the email in localStorage and redirect to the user page
            localStorage.setItem('loggedInUserEmail', user.emailAddress); // Store user email in localStorage
            window.location = 'index.html';
        } else {
            // Show error message if credentials don't match
            errorMessage.textContent = 'Invalid email or password. Please try again.';
        }
    });

    // Add input event listeners to clear error messages
    document.getElementById('username').addEventListener('input', clearErrorMessage);
    document.getElementById('password').addEventListener('input', clearErrorMessage);
});
