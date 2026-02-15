// Contact Form JavaScript
// Form Validation and Submission

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Form submission handler
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateForm()) {
                // Show success message
                showSuccessMessage();
                
                // Reset form after a delay
                setTimeout(() => {
                    contactForm.reset();
                    removeValidationClasses();
                }, 2000);
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }
    
    // Validation functions
    function validateForm() {
        let isValid = true;
        
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        const interest = document.getElementById('interest');
        const message = document.getElementById('message');
        
        if (!validateField(firstName)) isValid = false;
        if (!validateField(lastName)) isValid = false;
        if (!validateField(email)) isValid = false;
        if (!validateField(interest)) isValid = false;
        if (!validateField(message)) isValid = false;
        
        return isValid;
    }
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Remove previous error message
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Required field validation
        if (field.hasAttribute('required') && value === '') {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (field.type === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Name validation (no numbers)
        if ((field.id === 'firstName' || field.id === 'lastName') && value !== '') {
            const nameRegex = /^[a-zA-Z\s'-]+$/;
            if (!nameRegex.test(value)) {
                isValid = false;
                errorMessage = 'Name should only contain letters';
            }
        }
        
        // Phone validation (optional but format if provided)
        if (field.id === 'phone' && value !== '') {
            const phoneRegex = /^[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }
        
        // Message length validation
        if (field.id === 'message' && value !== '') {
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message should be at least 10 characters';
            }
        }
        
        // Apply validation classes
        if (isValid) {
            field.classList.remove('error');
            field.classList.add('success');
        } else {
            field.classList.remove('success');
            field.classList.add('error');
            
            // Add error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errorMessage;
            field.parentElement.appendChild(errorDiv);
        }
        
        return isValid;
    }
    
    function removeValidationClasses() {
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.classList.remove('error', 'success');
        });
        
        const errorMessages = contactForm.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
    }
    
    function showSuccessMessage() {
        // Check if success message already exists
        let successMsg = document.querySelector('.success-message');
        
        if (!successMsg) {
            successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.innerHTML = `
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. We'll get back to you within 24 hours.</p>
            `;
            
            const formContainer = document.querySelector('.contact-form-container');
            formContainer.insertBefore(successMsg, contactForm);
        }
        
        successMsg.classList.add('show');
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMsg.classList.remove('show');
        }, 5000);
        
        // Scroll to success message
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `(${value}`;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }
            e.target.value = value;
        });
    }
});
