// Apply page functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeApplicationForm();
});

function initializeApplicationForm() {
    const form = document.getElementById('practitionerApplication');
    const bioTextarea = document.getElementById('bio');
    const philosophyTextarea = document.getElementById('philosophy');
    const bioCharCount = document.getElementById('bioCharCount');
    const philosophyCharCount = document.getElementById('philosophyCharCount');
    const headshotInput = document.getElementById('headshot');

    // Character counters
    if (bioTextarea && bioCharCount) {
        bioTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            bioCharCount.textContent = currentLength;
            
            // Update color based on length
            if (currentLength > 900) {
                bioCharCount.style.color = '#e74c3c';
            } else if (currentLength > 800) {
                bioCharCount.style.color = '#f39c12';
            } else {
                bioCharCount.style.color = 'var(--text-secondary)';
            }
        });
    }

    if (philosophyTextarea && philosophyCharCount) {
        philosophyTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            philosophyCharCount.textContent = currentLength;
            
            // Update color based on length
            if (currentLength > 450) {
                philosophyCharCount.style.color = '#e74c3c';
            } else if (currentLength > 400) {
                philosophyCharCount.style.color = '#f39c12';
            } else {
                philosophyCharCount.style.color = 'var(--text-secondary)';
            }
        });
    }

    // File upload handling
    if (headshotInput) {
        headshotInput.addEventListener('change', function() {
            const file = this.files[0];
            const label = this.nextElementSibling;
            const uploadText = label.querySelector('.upload-text');
            
            if (file) {
                // Validate file type
                const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
                if (!allowedTypes.includes(file.type)) {
                    utils.showFieldError(this, 'Please select a JPEG or PNG file');
                    this.value = '';
                    return;
                } else {
                    utils.clearFieldError(this);
                }

                // Validate file size (2MB limit)
                const maxSize = 2 * 1024 * 1024; // 2MB in bytes
                if (file.size > maxSize) {
                    utils.showFieldError(this, 'File size must be less than 2MB');
                    this.value = '';
                    return;
                } else {
                    utils.clearFieldError(this);
                }

                // Update label text
                uploadText.textContent = `Selected: ${file.name}`;
                label.style.background = 'var(--secondary-color)';
                label.style.borderColor = 'var(--primary-color)';
            } else {
                uploadText.textContent = 'Choose file or drag here';
                label.style.background = 'var(--background-warm)';
                label.style.borderColor = 'var(--border-light)';
            }
        });
    }

    // Form validation
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
        
        // Real-time validation for required fields
        const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });

        // Email validation
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.addEventListener('blur', function() {
                if (this.value && !utils.validateEmail(this.value)) {
                    utils.showFieldError(this, 'Please enter a valid email address');
                } else {
                    utils.clearFieldError(this);
                }
            });
        }

        // Phone number formatting
        const phoneField = document.getElementById('phone');
        if (phoneField) {
            phoneField.addEventListener('input', function() {
                // Simple phone number formatting (US format)
                let value = this.value.replace(/\D/g, '');
                if (value.length >= 6) {
                    value = value.substring(0, 3) + '-' + value.substring(3, 6) + '-' + value.substring(6, 10);
                } else if (value.length >= 3) {
                    value = value.substring(0, 3) + '-' + value.substring(3);
                }
                this.value = value;
            });
        }

        // Modalities validation (at least one required)
        const modalityCheckboxes = form.querySelectorAll('input[name="modalities"]');
        modalityCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                validateModalities();
            });
        });

        // Session types validation (at least one required)
        const sessionTypeCheckboxes = form.querySelectorAll('input[name="sessionTypes"]');
        sessionTypeCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                validateSessionTypes();
            });
        });
    }

    function validateField(field) {
        utils.clearFieldError(field);
        
        if (field.hasAttribute('required') && !field.value.trim()) {
            utils.showFieldError(field, 'This field is required');
            return false;
        }
        
        // Specific validations
        if (field.type === 'email' && field.value && !utils.validateEmail(field.value)) {
            utils.showFieldError(field, 'Please enter a valid email address');
            return false;
        }
        
        if (field.type === 'url' && field.value && !isValidUrl(field.value)) {
            utils.showFieldError(field, 'Please enter a valid URL');
            return false;
        }
        
        return true;
    }

    function validateModalities() {
        const modalityCheckboxes = form.querySelectorAll('input[name="modalities"]');
        const checkedBoxes = Array.from(modalityCheckboxes).filter(cb => cb.checked);
        const modalitiesGroup = modalityCheckboxes[0].closest('.form-group');
        
        if (checkedBoxes.length === 0) {
            modalitiesGroup.classList.add('error');
            let errorElement = modalitiesGroup.querySelector('.error-message');
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                modalitiesGroup.appendChild(errorElement);
            }
            errorElement.textContent = 'Please select at least one modality';
            return false;
        } else {
            modalitiesGroup.classList.remove('error');
            const errorElement = modalitiesGroup.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
            return true;
        }
    }

    function validateSessionTypes() {
        const sessionTypeCheckboxes = form.querySelectorAll('input[name="sessionTypes"]');
        const checkedBoxes = Array.from(sessionTypeCheckboxes).filter(cb => cb.checked);
        const sessionTypesGroup = sessionTypeCheckboxes[0].closest('.form-group');
        
        if (checkedBoxes.length === 0) {
            sessionTypesGroup.classList.add('error');
            let errorElement = sessionTypesGroup.querySelector('.error-message');
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                sessionTypesGroup.appendChild(errorElement);
            }
            errorElement.textContent = 'Please select at least one session type';
            return false;
        } else {
            sessionTypesGroup.classList.remove('error');
            const errorElement = sessionTypesGroup.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
            return true;
        }
    }

    function handleFormSubmission(e) {
        e.preventDefault();
        
        // Clear previous errors
        const errorFields = form.querySelectorAll('.form-group.error');
        errorFields.forEach(field => {
            field.classList.remove('error');
            const errorMsg = field.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
        });

        let isValid = true;

        // Validate all required fields
        const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        // Validate checkboxes
        if (!validateModalities()) {
            isValid = false;
        }

        if (!validateSessionTypes()) {
            isValid = false;
        }

        // Validate agreement checkbox
        const agreementCheckbox = document.getElementById('agreement');
        if (agreementCheckbox && !agreementCheckbox.checked) {
            utils.showFieldError(agreementCheckbox, 'You must agree to the terms to continue');
            isValid = false;
        }

        if (!isValid) {
            // Scroll to first error
            const firstError = form.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Submit form
        submitApplication();
    }

    function submitApplication() {
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Submitting Application...';

        // Simulate form submission
        setTimeout(() => {
            // Success state
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Application Submitted!';
            submitBtn.style.background = 'var(--accent-color)';
            
            // Show success message
            showSuccessMessage();
            
            // Reset after delay
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                form.reset();
                
                // Reset character counters
                if (bioCharCount) bioCharCount.textContent = '0';
                if (philosophyCharCount) philosophyCharCount.textContent = '0';
                
                // Reset file upload label
                const uploadText = form.querySelector('.upload-text');
                if (uploadText) uploadText.textContent = 'Choose file or drag here';
                
            }, 3000);
        }, 2000);
    }

    function showSuccessMessage() {
        // Create success overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        `;

        const message = document.createElement('div');
        message.style.cssText = `
            background: white;
            padding: 3rem;
            border-radius: 12px;
            text-align: center;
            max-width: 500px;
            margin: 2rem;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        `;

        message.innerHTML = `
            <div style="font-size: 3rem; color: var(--accent-color); margin-bottom: 1rem;">✓</div>
            <h2 style="color: var(--text-primary); margin-bottom: 1rem;">Application Submitted!</h2>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                Thank you for applying to join our directory. We'll review your application within 5-7 business days and reach out with next steps.
            </p>
            <button onclick="this.closest('.overlay').remove()" style="
                background: var(--primary-color);
                color: white;
                border: none;
                padding: 0.75rem 2rem;
                border-radius: 6px;
                font-weight: 600;
                cursor: pointer;
            ">Close</button>
        `;

        overlay.className = 'overlay';
        overlay.appendChild(message);
        document.body.appendChild(overlay);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.remove();
            }
        }, 5000);
    }

    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }
}