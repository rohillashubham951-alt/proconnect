document.addEventListener("DOMContentLoaded", function() {
    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Dropdown menu functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseover', () => {
            dropdown.querySelector('.dropdown-content').style.display = 'block';
        });
        dropdown.addEventListener('mouseout', () => {
            dropdown.querySelector('.dropdown-content').style.display = 'none';
        });
    });

    // Filter Sidebar Toggle (Projects/Freelancers Page)
    const filterToggle = document.querySelector('.filter-sidebar h2');
    if (filterToggle) {
        filterToggle.addEventListener('click', () => {
            const filters = document.querySelector('.filter-sidebar form');
            filters.style.display = (filters.style.display === 'none' || filters.style.display === '') ? 'block' : 'none';
        });
    }

    // Testimonials Carousel (Index and Become a Freelancer Page)
    let testimonialIndex = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length > 0) {
        setInterval(() => {
            testimonials.forEach((testimonial, index) => {
                testimonial.style.display = (index === testimonialIndex) ? 'block' : 'none';
            });
            testimonialIndex = (testimonialIndex + 1) % testimonials.length;
        }, 3000);
    }

    // Basic form validation (Sign Up Page)
    const signupForm = document.querySelector('form#signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            const password = signupForm.querySelector('input[name="password"]').value;
            const confirmPassword = signupForm.querySelector('input[name="confirmPassword"]').value;
            if (password !== confirmPassword) {
                e.preventDefault();
                alert("Passwords do not match!");
            }
        });
    }

    // Service Slider (Index Page)
    const serviceSlider = document.querySelector('.service-slider');
    if (serviceSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        serviceSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            serviceSlider.classList.add('active');
            startX = e.pageX - serviceSlider.offsetLeft;
            scrollLeft = serviceSlider.scrollLeft;
        });
        serviceSlider.addEventListener('mouseleave', () => {
            isDown = false;
            serviceSlider.classList.remove('active');
        });
        serviceSlider.addEventListener('mouseup', () => {
            isDown = false;
            serviceSlider.classList.remove('active');
        });
        serviceSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - serviceSlider.offsetLeft;
            const walk = (x - startX) * 3; //scroll-fast
            serviceSlider.scrollLeft = scrollLeft - walk;
        });
    }

    // Toggle FAQs (Become a Freelancer Page)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.querySelector('p');
            answer.style.maxHeight = (answer.style.maxHeight) ? null : answer.scrollHeight + "px";
        });
    });

    // Handle 'View Profile' Button (Freelancers Page)
    const profileButtons = document.querySelectorAll('.freelancer-button');
    profileButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert("Profile view is not yet implemented.");
        });
    });

    // Handle 'View Project' Button (Projects Page)
    const projectButtons = document.querySelectorAll('.project-button');
    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert("Project view is not yet implemented.");
        });
    });
});
