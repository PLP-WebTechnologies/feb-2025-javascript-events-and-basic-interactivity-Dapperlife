// Event Handling Section
document.addEventListener('DOMContentLoaded', function() {
    // Click Event
    const clickBtn = document.getElementById('click-btn');
    clickBtn.addEventListener('click', function() {
        this.textContent = 'Clicked!';
        this.style.backgroundColor = '#2ecc71';
        
        // Reset after 1 second
        setTimeout(() => {
            this.textContent = 'Click Me!';
            this.style.backgroundColor = '#3498db';
        }, 1000);
    });

    // Hover Event
    const hoverArea = document.getElementById('hover-area');
    hoverArea.addEventListener('mouseenter', function() {
        this.textContent = 'Hovering!';
        this.style.backgroundColor = '#e67e22';
    });
    
    hoverArea.addEventListener('mouseleave', function() {
        this.textContent = 'Hover Over Me';
        this.style.backgroundColor = '#f1c40f';
    });

    // Keypress Event
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    
    keypressInput.addEventListener('keyup', function(e) {
        keypressOutput.textContent = `You typed: ${this.value}`;
        
        // Change color based on input length
        if (this.value.length > 10) {
            keypressOutput.style.backgroundColor = '#d5f5e3';
        } else {
            keypressOutput.style.backgroundColor = '#e8f4f8';
        }
    });

    // Secret Double-Click Event
    const secretArea = document.getElementById('secret-area');
    const secretModal = document.getElementById('secret-modal');
    const closeModal = document.querySelector('.close-modal');
    
    secretArea.addEventListener('dblclick', function() {
        secretModal.classList.add('active');
    });
    
    closeModal.addEventListener('click', function() {
        secretModal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    secretModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });

    // Interactive Elements Section
    // Color Changing Button
    const colorBtn = document.getElementById('color-btn');
    const colors = ['#9b59b6', '#3498db', '#2ecc71', '#e74c3c', '#f39c12'];
    let colorIndex = 0;
    
    colorBtn.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color ${colorIndex + 1}`;
    });

    // Image Gallery
    const galleryImages = document.querySelectorAll('.gallery-container img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
        currentImageIndex = index;
    }
    
    nextBtn.addEventListener('click', function() {
        let nextIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(nextIndex);
    });
    
    prevBtn.addEventListener('click', function() {
        let prevIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(prevIndex);
    });
    
    // Auto-advance gallery every 3 seconds
    setInterval(() => {
        let nextIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(nextIndex);
    }, 3000);

    // Accordion
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = content.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open current if it wasn't active
            if (!isActive) {
                content.classList.add('active');
            }
        });
    });

    // Form Validation Section
    const form = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('name-error');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('password-error');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            return false;
        } else {
            nameError.textContent = '';
            return true;
        }
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() === '') {
            emailError.textContent = '';
            return true;
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }
    
    function validatePassword() {
        const password = passwordInput.value;
        let strength = 0;
        
        if (password.length === 0) {
            passwordError.textContent = '';
            strengthBar.style.width = '0%';
            strengthBar.style.backgroundColor = '#e74c3c';
            strengthText.textContent = '';
            return false;
        }
        
        if (password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            strength = 1;
        } else {
            passwordError.textContent = '';
            
            // Check password strength
            if (/[a-z]/.test(password)) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^a-zA-Z0-9]/.test(password)) strength++;
        }
        
        // Update strength meter
        const width = (strength / 4) * 100;
        strengthBar.style.width = `${width}%`;
        
        let color, text;
        if (strength <= 1) {
            color = '#e74c3c';
            text = 'Weak';
        } else if (strength <= 2) {
            color = '#f39c12';
            text = 'Fair';
        } else if (strength <= 3) {
            color = '#3498db';
            text = 'Good';
        } else {
            color = '#2ecc71';
            text = 'Strong';
        }
        
        strengthBar.style.backgroundColor = color;
        strengthText.textContent = text;
        strengthText.style.color = color;
        
        return password.length >= 8;
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully!');
            form.reset();
            strengthBar.style.width = '0%';
            strengthText.textContent = '';
        } else {
            alert('Please fix the errors in the form');
        }
    });
});