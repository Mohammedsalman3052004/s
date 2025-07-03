 // COMPLETE WORKING NAVBAR JAVASCRIPT

 document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, initializing navbar...');

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Mobile hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        const isClickInsideNav = navMenu && navMenu.contains(event.target);
        const isClickOnHamburger = hamburger && hamburger.contains(event.target);

        if (navMenu && !isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Logo switching functionality
    const logoDark = document.querySelector('.logo-dark');
    const logoLight = document.querySelector('.logo-light');

    window.addEventListener('scroll', function () {
        const navbar = document.getElementById('navbar');

        if (navbar) {
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
        }
    });

    // Initialize dropdown functionality
    initializeDropdowns();
});

// Function to initialize all dropdown functionality
function initializeDropdowns() {
    console.log('Initializing dropdowns...');

    // Get all dropdown parents
    const dropdownParents = document.querySelectorAll('.dropdown-parent');
    console.log('Found dropdown parents:', dropdownParents.length);

    dropdownParents.forEach((parent, index) => {
        const dropdown = parent.querySelector('.dropdown');
        const dropdownItems = parent.querySelectorAll('.dropdown-item');

        if (!dropdown) {
            console.log(`No dropdown found for parent ${index + 1}`);
            return;
        }

        console.log(`Found ${dropdownItems.length} dropdown items for parent ${index + 1}`);

        let dropdownTimeout;

        // Add hover event listeners to each dropdown item
        dropdownItems.forEach((item, itemIndex) => {
            const contentId = item.getAttribute('data-content');
            console.log(`Item ${itemIndex + 1} has content ID: ${contentId}`);

            // Important: Use mouseenter instead of hover
            item.addEventListener('mouseenter', function () {
                console.log(`Hovering over item with content ID: ${contentId}`);

                if (contentId) {
                    showContent(contentId, dropdown);
                }
            });

            // Also add click handler for mobile
            item.addEventListener('click', function (e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    if (contentId) {
                        showContent(contentId, dropdown);
                    }
                }
            });
        });

        // Show dropdown on parent hover
        parent.addEventListener('mouseenter', function () {
            console.log('Mouse entered dropdown parent');
            clearTimeout(dropdownTimeout);
            showDropdown(dropdown, dropdownItems);
        });

        // Hide dropdown when leaving parent (with delay)
        parent.addEventListener('mouseleave', function () {
            console.log('Mouse left dropdown parent');
            dropdownTimeout = setTimeout(() => {
                hideDropdown(dropdown);
            }, 100);
        });

        // Keep dropdown open when hovering over it
        dropdown.addEventListener('mouseenter', function () {
            console.log('Mouse entered dropdown');
            clearTimeout(dropdownTimeout);
        });

        // Hide dropdown when leaving dropdown itself
        dropdown.addEventListener('mouseleave', function () {
            console.log('Mouse left dropdown');
            dropdownTimeout = setTimeout(() => {
                hideDropdown(dropdown);
            }, 100);
        });
    });
}

// Function to show specific content within a dropdown
function showContent(contentId, parentDropdown) {
    console.log(`Showing content for ID: ${contentId}`);

    // Hide all content items within this dropdown
    const contentItems = parentDropdown.querySelectorAll('.content-item');
    const dropdownItems = parentDropdown.querySelectorAll('.dropdown-item');

    console.log(`Found ${contentItems.length} content items`);

    // Remove active class from all items
    contentItems.forEach(item => {
        item.classList.remove('active');
    });

    dropdownItems.forEach(item => {
        item.classList.remove('active');
    });

    // Show selected content
    const targetContent = parentDropdown.querySelector(`#content-${contentId}`);
    const targetItem = parentDropdown.querySelector(`[data-content="${contentId}"]`);

    if (targetContent) {
        targetContent.classList.add('active');
        console.log(`✅ Activated content: content-${contentId}`);
    } else {
        console.log(`❌ Content not found: content-${contentId}`);
    }

    if (targetItem) {
        targetItem.classList.add('active');
        console.log(`✅ Activated item with data-content: ${contentId}`);
    }
}

// Function to show dropdown
function showDropdown(dropdown, dropdownItems) {
    console.log('Showing dropdown');

    dropdown.classList.add('show');

    // Show first item's content by default
    if (dropdownItems.length > 0) {
        const firstItem = dropdownItems[0];
        const firstContentId = firstItem.getAttribute('data-content');
        if (firstContentId) {
            showContent(firstContentId, dropdown);
        }
    }
}

// Function to hide dropdown
function hideDropdown(dropdown) {
    console.log('Hiding dropdown');
    dropdown.classList.remove('show');
}

// Mobile dropdown toggle function
function toggleMobileDropdown(event, dropdownId) {
    console.log(`Toggling mobile dropdown: ${dropdownId}`);

    if (window.innerWidth <= 768) {
        event.preventDefault();
        event.stopPropagation();

        const dropdown = document.getElementById(dropdownId);
        const arrow = event.currentTarget.querySelector('.dropdown-arrow');

        if (dropdown) {
            // Close other mobile dropdowns
            const allMobileDropdowns = document.querySelectorAll('.mobile-dropdown');
            allMobileDropdowns.forEach(d => {
                if (d.id !== dropdownId) {
                    d.classList.remove('active');
                }
            });

            // Reset all arrows
            const allArrows = document.querySelectorAll('.dropdown-arrow');
            allArrows.forEach(a => {
                if (a !== arrow) {
                    a.style.transform = 'rotate(0deg)';
                }
            });

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

// Make function globally available
window.toggleMobileDropdown = toggleMobileDropdown;