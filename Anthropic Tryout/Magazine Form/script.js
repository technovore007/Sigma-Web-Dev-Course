document.addEventListener('DOMContentLoaded', function() {
    // Get all form sections
    const sections = document.querySelectorAll('.form-section');
    const progressBar = document.getElementById('progress-bar');
    const steps = document.querySelectorAll('.step');
    const form = document.getElementById('subscription-form');
    const successMessage = document.getElementById('success-message');
    
    // Current section index
    let currentSection = 0;
    
    // Update progress bar
    function updateProgress() {
      const percentage = (currentSection / (sections.length - 1)) * 100;
      progressBar.style.width = `${percentage}%`;
      
      // Update step indicators
      steps.forEach((step, index) => {
        if (index <= currentSection) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      });
    }
    
    // Validate section fields
    function validateSection(sectionIndex) {
      let isValid = true;
      
      if (sectionIndex === 0) {
        // Validate first section (personal info)
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const firstNameError = document.getElementById('firstName-error');
        const lastNameError = document.getElementById('lastName-error');
        
        if (!firstName.value.trim()) {
          firstNameError.style.display = 'block';
          isValid = false;
        } else {
          firstNameError.style.display = 'none';
        }
        
        if (!lastName.value.trim()) {
          lastNameError.style.display = 'block';
          isValid = false;
        } else {
          lastNameError.style.display = 'none';
        }
      } else if (sectionIndex === 1) {
        // Validate second section (address info)
        const address = document.getElementById('address');
        const city = document.getElementById('city');
        const state = document.getElementById('state');
        const zip = document.getElementById('zip');
        
        const addressError = document.getElementById('address-error');
        const cityError = document.getElementById('city-error');
        const stateError = document.getElementById('state-error');
        const zipError = document.getElementById('zip-error');
        
        if (!address.value.trim()) {
          addressError.style.display = 'block';
          isValid = false;
        } else {
          addressError.style.display = 'none';
        }
        
        if (!city.value.trim()) {
          cityError.style.display = 'block';
          isValid = false;
        } else {
          cityError.style.display = 'none';
        }
        
        if (!state.value.trim()) {
          stateError.style.display = 'block';
          isValid = false;
        } else {
          stateError.style.display = 'none';
        }
        
        if (!zip.value.trim()) {
          zipError.style.display = 'block';
          isValid = false;
        } else {
          zipError.style.display = 'none';
        }
      } else if (sectionIndex === 2) {
        // Validate third section (subscription details)
        const magazine = document.getElementById('magazine');
        const magazineError = document.getElementById('magazine-error');
        
        if (!magazine.value) {
          magazineError.style.display = 'block';
          isValid = false;
        } else {
          magazineError.style.display = 'none';
        }
      }
      
      return isValid;
    }
    
    // Show a specific section
    function showSection(index) {
      sections.forEach((section, i) => {
        if (i === index) {
          section.style.display = 'block';
        } else {
          section.style.display = 'none';
        }
      });
      
      currentSection = index;
      updateProgress();
    }
    
    // Next button handlers
    document.getElementById('next-1').addEventListener('click', function() {
      if (validateSection(0)) {
        showSection(1);
      }
    });
    
    document.getElementById('next-2').addEventListener('click', function() {
      if (validateSection(1)) {
        showSection(2);
      }
    });
    
    // Previous button handlers
    document.getElementById('prev-2').addEventListener('click', function() {
      showSection(0);
    });
    
    document.getElementById('prev-3').addEventListener('click', function() {
      showSection(1);
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateSection(2)) {
        // Collect all form data
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        const zip = document.getElementById('zip').value;
        const magazine = document.getElementById('magazine').value;
        const subscription = document.querySelector('input[name="subscription"]:checked').value;
        const comments = document.getElementById('comments').value;
        
        // Get current theme
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const summaryBgColor = currentTheme === 'dark' ? '#2c2c2c' : '#f8f9fa';
        
        // Display order summary
        const orderSummary = document.getElementById('order-summary');
        orderSummary.innerHTML = `
          <div style="margin-top: 20px; text-align: left; padding: 15px; background-color: ${summaryBgColor}; border-radius: 8px;">
            <h3>Order Details:</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Address:</strong> ${address}, ${city}, ${state} ${zip}</p>
            <p><strong>Magazine:</strong> ${magazine}</p>
            <p><strong>Subscription:</strong> ${subscription}</p>
            ${comments ? `<p><strong>Comments:</strong> ${comments}</p>` : ''}
          </div>
        `;
        
        // Hide form and show success message
        form.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Update progress to 100%
        progressBar.style.width = '100%';
        steps.forEach(step => step.classList.add('active'));
      }
    });
    
    // Dark mode toggle
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    
    // Function to switch theme
    function switchTheme(e) {
      if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    }
    
    // Event listener for theme switch
    toggleSwitch.addEventListener('change', switchTheme, false);
    
    // Check for saved user preference
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    if (currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme);
      
      if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
      }
    }
    
    // Initialize the form
    showSection(0);
  });