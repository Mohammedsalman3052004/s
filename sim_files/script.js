// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Mobile dropdown toggle
function toggleMobileDropdown(event) {
    if (window.innerWidth <= 768) {
        event.preventDefault();
        event.stopPropagation();
        
        const dropdown = document.getElementById('services-mobile-dropdown');
        const arrow = event.currentTarget.querySelector('.dropdown-arrow');
        
        if (dropdown) {
            dropdown.classList.toggle('active');
            
            // Rotate arrow
            if (dropdown.classList.contains('active')) {
                arrow.style.transform = 'rotate(180deg)';
            } else {
                arrow.style.transform = 'rotate(0deg)';
            }
        }
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function (event) {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Logo switching and dropdown functionality
const logoDark = document.querySelector('.logo-dark');
const logoLight = document.querySelector('.logo-light');

window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        if (logoDark && logoLight) {
            logoDark.style.display = 'none';
            logoLight.style.display = 'block';
        }
    } else {
        navbar.classList.remove('scrolled');
        if (logoDark && logoLight) {
            logoDark.style.display = 'block';
            logoLight.style.display = 'none';
        }
    }
});

// Professional Dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const servicesNavItem = document.querySelector('.nav-item:nth-child(2)'); // Our Services item
    const dropdown = document.querySelector('.dropdown');
    
    if (servicesNavItem && dropdown) {
        let dropdownTimeout;
        
        // Show dropdown
        function showDropdown() {
            clearTimeout(dropdownTimeout);
            dropdown.style.opacity = '1';
            dropdown.style.visibility = 'visible';
            dropdown.style.transform = 'translateY(0)';
            dropdown.style.pointerEvents = 'all';
        }
        
        // Hide dropdown with delay
        function hideDropdown() {
            dropdownTimeout = setTimeout(() => {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(-20px)';
                dropdown.style.pointerEvents = 'none';
            }, 150);
        }
        
        // Event listeners
        servicesNavItem.addEventListener('mouseenter', showDropdown);
        servicesNavItem.addEventListener('mouseleave', hideDropdown);
        dropdown.addEventListener('mouseenter', () => clearTimeout(dropdownTimeout));
        dropdown.addEventListener('mouseleave', hideDropdown);
    }
}); 