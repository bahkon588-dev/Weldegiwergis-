// Navigation functions
function goToForm() {
    document.getElementById('coverPage').style.display = 'none';
    document.getElementById('formPage').style.display = 'flex';
}

function backToCover() {
    document.getElementById('formPage').style.display = 'none';
    document.getElementById('coverPage').style.display = 'flex';
}

// Form submission handler
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.querySelector('input[name="name"]').value,
        gender: document.querySelector('select[name="gender"]').value,
        phone: document.querySelector('input[name="phone"]').value,
        nationality: document.querySelector('input[name="nationality"]').value,
        city: document.querySelector('input[name="city"]').value,
        bankAccount: document.querySelector('input[name="bankAccount"]').value,
        age: document.querySelector('input[name="age"]').value,
        amount: document.querySelector('input[name="amount"]').value
    };

    // Validate all fields are filled
    if (Object.values(formData).some(value => !value)) {
        showError('እባክዎ ሁሉንም ሜዳዎችን ይሙሉ');
        return;
    }

    // Validate age
    if (parseInt(formData.age) < 18) {
        showError('እድሜ ቢያንስ 18 ዓመት መሆን አለበት');
        return;
    }

    // Validate phone number
    if (!/^\+?[0-9\s\-()]{9,}$/.test(formData.phone)) {
        showError('ይህ ስልክ ቁጥር ትክክል አይደለም');
        return;
    }

    // Validate bank account (simple validation)
    if (formData.bankAccount.length < 8) {
        showError('የባንክ አካውንት ቁጥር ትክክል አይደለም');
        return;
    }

    // Log form data to console (for development)
    console.log('Form Data:', formData);

    // Save to localStorage
    saveFormData(formData);

    // Show success message
    showSuccess('ፍላጎትዎ በተሳካ ሁኔታ ገብቷል!');

    // Optional: Reset form after 2 seconds
    setTimeout(() => {
        document.getElementById('registrationForm').reset();
    }, 2000);
});

// Function to show success message
function showSuccess(message) {
    let successDiv = document.querySelector('.success-message');
    if (!successDiv) {
        successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        document.querySelector('form').prepend(successDiv);
    }
    successDiv.textContent = message;
    successDiv.classList.add('show');

    setTimeout(() => {
        successDiv.classList.remove('show');
    }, 3000);
}

// Function to show error message
function showError(message) {
    let errorDiv = document.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        document.querySelector('form').prepend(errorDiv);
    }
    errorDiv.textContent = message;
    errorDiv.classList.add('show');

    setTimeout(() => {
        errorDiv.classList.remove('show');
    }, 3000);
}

// Function to save form data to localStorage
function saveFormData(data) {
    // Get existing data from localStorage
    let allSubmissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    
    // Add timestamp
    data.submittedAt = new Date().toLocaleString('am-ET');
    
    // Add new submission
    allSubmissions.push(data);
    
    // Save back to localStorage
    localStorage.setItem('formSubmissions', JSON.stringify(allSubmissions));
    
    console.log('Form data saved to localStorage');
}

// Function to retrieve all saved form data (for admin/testing purposes)
function getAllFormData() {
    return JSON.parse(localStorage.getItem('formSubmissions')) || [];
}

// Function to clear all saved form data
function clearAllFormData() {
    localStorage.removeItem('formSubmissions');
    console.log('All form data cleared');
}

// Load any previously saved data on page load (optional auto-fill feature)
window.addEventListener('load', function() {
    // Uncomment below to enable auto-fill from previous submission
    // const lastSubmission = getAllFormData().pop();
    // if (lastSubmission) {
    //     document.querySelector('input[name="name"]').value = lastSubmission.name;
    //     // ... fill other fields
    // }
});