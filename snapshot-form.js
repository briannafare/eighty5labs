/* ============================================
   SNAPSHOT FORM - JAVASCRIPT
   Multi-step form with auto-save & GHL integration
   ============================================ */

// ============================================
// FORM STATE MANAGEMENT
// ============================================
class SnapshotForm {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 5;
        this.formData = {};
        this.autoSaveInterval = null;
        this.hasPartialData = false;

        // DOM Elements
        this.form = document.getElementById('snapshotForm');
        this.steps = document.querySelectorAll('.form-step');
        this.progressFill = document.getElementById('progressFill');
        this.progressSteps = document.querySelectorAll('.progress-step');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.submitBtn = document.getElementById('submitBtn');
        this.formError = document.getElementById('formError');
        this.formSuccess = document.getElementById('formSuccess');

        this.init();
    }

    init() {
        // Event listeners
        this.prevBtn.addEventListener('click', () => this.previousStep());
        this.nextBtn.addEventListener('click', () => this.nextStep());
        this.submitBtn.addEventListener('click', (e) => this.handleSubmit(e));
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Auto-save on field change
        this.form.addEventListener('input', () => this.handleFieldChange());

        // Progress step click navigation
        this.progressSteps.forEach((step, index) => {
            step.addEventListener('click', () => {
                const stepNumber = index + 1;
                if (stepNumber < this.currentStep) {
                    this.goToStep(stepNumber);
                }
            });
        });

        // Phone number formatting
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => this.formatPhoneNumber(e));
        }

        // Load saved data from localStorage
        this.loadSavedData();

        // Start auto-save (every 30 seconds)
        this.startAutoSave();

        // Show current step
        this.updateUI();
    }

    // ============================================
    // NAVIGATION METHODS
    // ============================================
    nextStep() {
        if (this.validateCurrentStep()) {
            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                this.updateUI();
                this.saveFormData();
                this.scrollToTop();
            }
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateUI();
            this.scrollToTop();
        }
    }

    goToStep(stepNumber) {
        if (stepNumber >= 1 && stepNumber <= this.totalSteps) {
            this.currentStep = stepNumber;
            this.updateUI();
            this.scrollToTop();
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // ============================================
    // UI UPDATE METHODS
    // ============================================
    updateUI() {
        // Update steps visibility
        this.steps.forEach((step, index) => {
            if (index + 1 === this.currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update progress bar
        const progressPercentage = (this.currentStep / this.totalSteps) * 100;
        this.progressFill.style.width = `${progressPercentage}%`;

        // Update progress steps
        this.progressSteps.forEach((step, index) => {
            const stepNumber = index + 1;
            if (stepNumber < this.currentStep) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (stepNumber === this.currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });

        // Update buttons
        if (this.currentStep === 1) {
            this.prevBtn.style.display = 'none';
        } else {
            this.prevBtn.style.display = 'inline-block';
        }

        if (this.currentStep === this.totalSteps) {
            this.nextBtn.style.display = 'none';
            this.submitBtn.style.display = 'inline-block';
        } else {
            this.nextBtn.style.display = 'inline-block';
            this.submitBtn.style.display = 'none';
        }
    }

    // ============================================
    // VALIDATION METHODS
    // ============================================
    validateCurrentStep() {
        const currentStepElement = this.steps[this.currentStep - 1];
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;

        // Remove previous error state
        field.classList.remove('error', 'valid');
        this.hideError();

        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            field.classList.add('error');
            this.showError('Please fill in all required fields.');
            return false;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                field.classList.add('error');
                this.showError('Please enter a valid email address.');
                return false;
            }
        }

        // Phone validation (basic)
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
                isValid = false;
                field.classList.add('error');
                this.showError('Please enter a valid phone number (at least 10 digits).');
                return false;
            }
        }

        // Mark as valid
        if (value && isValid) {
            field.classList.add('valid');
        }

        return isValid;
    }

    // ============================================
    // DATA MANAGEMENT
    // ============================================
    handleFieldChange() {
        this.collectFormData();
        this.hasPartialData = true;
    }

    collectFormData() {
        const formElements = this.form.elements;
        this.formData = {};

        for (let element of formElements) {
            if (element.name && element.value) {
                const fieldName = element.getAttribute('data-field') || element.name;

                // Handle checkboxes
                if (element.type === 'checkbox') {
                    if (!this.formData[fieldName]) {
                        this.formData[fieldName] = [];
                    }
                    if (element.checked) {
                        this.formData[fieldName].push(element.value);
                    }
                }
                // Handle radio buttons
                else if (element.type === 'radio') {
                    if (element.checked) {
                        this.formData[fieldName] = element.value;
                    }
                }
                // Handle text inputs
                else {
                    this.formData[fieldName] = element.value.trim();
                }
            }
        }

        return this.formData;
    }

    saveFormData() {
        this.collectFormData();
        localStorage.setItem('snapshotFormData', JSON.stringify(this.formData));
        localStorage.setItem('snapshotFormStep', this.currentStep);
        console.log('Form data saved:', this.formData);
    }

    loadSavedData() {
        const savedData = localStorage.getItem('snapshotFormData');
        const savedStep = localStorage.getItem('snapshotFormStep');

        if (savedData) {
            try {
                this.formData = JSON.parse(savedData);
                this.populateForm(this.formData);
                this.hasPartialData = true;

                if (savedStep) {
                    this.currentStep = parseInt(savedStep);
                }
            } catch (e) {
                console.error('Error loading saved data:', e);
            }
        }
    }

    populateForm(data) {
        Object.keys(data).forEach(fieldName => {
            const elements = this.form.querySelectorAll(`[data-field="${fieldName}"]`);

            elements.forEach(element => {
                if (element.type === 'checkbox') {
                    if (Array.isArray(data[fieldName]) && data[fieldName].includes(element.value)) {
                        element.checked = true;
                    }
                } else if (element.type === 'radio') {
                    if (element.value === data[fieldName]) {
                        element.checked = true;
                    }
                } else {
                    element.value = data[fieldName];
                }
            });
        });
    }

    clearSavedData() {
        localStorage.removeItem('snapshotFormData');
        localStorage.removeItem('snapshotFormStep');
    }

    // ============================================
    // AUTO-SAVE FUNCTIONALITY
    // ============================================
    startAutoSave() {
        // Auto-save every 30 seconds
        this.autoSaveInterval = setInterval(() => {
            if (this.hasPartialData) {
                this.saveFormData();
                this.sendPartialSubmission();
            }
        }, 30000); // 30 seconds
    }

    stopAutoSave() {
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
        }
    }

    // ============================================
    // PARTIAL SUBMISSION (for incomplete forms)
    // ============================================
    async sendPartialSubmission() {
        this.collectFormData();

        // Only send if we have at least name or email
        if (!this.formData.full_name && !this.formData.email) {
            return;
        }

        const partialData = {
            ...this.formData,
            form_status: 'partial',
            form_step: this.currentStep,
            total_steps: this.totalSteps,
            submission_type: 'auto_save',
            tags: ['snapshot-form', 'partial-submission', 'needs-follow-up']
        };

        console.log('Sending partial submission:', partialData);

        // TODO: Send to Go High Level
        // This will be replaced with actual GHL webhook URL
        try {
            // await this.sendToGHL(partialData);
            console.log('Partial data would be sent to GHL:', partialData);
        } catch (error) {
            console.error('Error sending partial submission:', error);
        }
    }

    // ============================================
    // FORM SUBMISSION
    // ============================================
    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateCurrentStep()) {
            return;
        }

        // Show loading state
        this.submitBtn.classList.add('loading');
        this.submitBtn.disabled = true;

        // Collect final data
        this.collectFormData();

        const finalData = {
            ...this.formData,
            form_status: 'complete',
            submission_type: 'full_submission',
            submitted_at: new Date().toISOString(),
            tags: ['snapshot-form', 'complete-submission']
        };

        console.log('Submitting form:', finalData);

        try {
            // Send to Go High Level
            await this.sendToGHL(finalData);

            // Clear saved data
            this.clearSavedData();
            this.stopAutoSave();

            // Show success message
            this.showSuccess('Thank you! Redirecting to confirmation page...');

            // Redirect to confirmation page after 2 seconds
            setTimeout(() => {
                window.location.href = 'snapshot-confirmation.html?submitted=true';
            }, 2000);

        } catch (error) {
            console.error('Submission error:', error);
            this.showError('There was an error submitting your form. Please try again.');
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    }

    // ============================================
    // GO HIGH LEVEL INTEGRATION
    // ============================================
    async sendToGHL(data) {
        // TODO: Replace with your actual Go High Level webhook URL
        const GHL_WEBHOOK_URL = 'YOUR_GHL_WEBHOOK_URL_HERE';

        // For demo/testing, we'll just log the data
        console.log('Data to be sent to GHL:', data);

        // Uncomment and configure when you have your GHL webhook URL:
        /*
        const response = await fetch(GHL_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to submit form to GHL');
        }

        return await response.json();
        */

        // Simulate API call for now
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 1000);
        });
    }

    // ============================================
    // UTILITY METHODS
    // ============================================
    formatPhoneNumber(e) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 10) {
            value = value.substring(0, 10);
        }

        if (value.length > 6) {
            value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
        } else if (value.length > 3) {
            value = `(${value.substring(0, 3)}) ${value.substring(3)}`;
        } else if (value.length > 0) {
            value = `(${value}`;
        }

        e.target.value = value;
    }

    showError(message) {
        this.formError.textContent = message;
        this.formError.style.display = 'block';
        this.formSuccess.style.display = 'none';

        setTimeout(() => {
            this.scrollToMessage();
        }, 100);
    }

    showSuccess(message) {
        this.formSuccess.textContent = message;
        this.formSuccess.style.display = 'block';
        this.formError.style.display = 'none';

        setTimeout(() => {
            this.scrollToMessage();
        }, 100);
    }

    hideError() {
        this.formError.style.display = 'none';
    }

    scrollToMessage() {
        const messageElement = this.formError.style.display !== 'none' ? this.formError : this.formSuccess;
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// ============================================
// INITIALIZE FORM
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    new SnapshotForm();
    console.log('Snapshot Form initialized');
});

// ============================================
// PAGE UNLOAD WARNING (if form has data)
// ============================================
window.addEventListener('beforeunload', (e) => {
    const savedData = localStorage.getItem('snapshotFormData');
    if (savedData) {
        const data = JSON.parse(savedData);
        // Only warn if user has entered meaningful data
        if (data.full_name || data.email) {
            e.preventDefault();
            e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
            return e.returnValue;
        }
    }
});
