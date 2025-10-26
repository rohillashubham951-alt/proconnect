document.addEventListener('DOMContentLoaded', function () {
    const profilePictureInput = document.getElementById('profilePicture');
    const profilePicturePreview = document.getElementById('profilePicturePreview');
    const sections = document.querySelectorAll('.dashboard-section');
    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');

    // Handle Profile Picture Preview
    profilePictureInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePicturePreview.src = e.target.result;
                profilePicturePreview.style.width = '124.8px'; 
                profilePicturePreview.style.height = '184.8px';
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle Form Submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            // Form-specific logic to add elements
            if (form.id === 'skillsForm') {
                addSkill();
            } else if (form.id === 'servicesForm') {
                addService();
            } else if (form.id === 'portfolioForm') {
                addProject();
            } else if (form.id === 'additionalProofsForm') {
                addProof();
            }
        });
    });

    // Add Skill
    function addSkill() {
        const skillName = document.getElementById('skillName').value.trim();
        const skillProof = document.getElementById('skillProof').files[0];
        if (skillName !== '') {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            let proofText = '';
            if (skillProof) {
                proofText = ` - Proof: ${skillProof.name}`;
            }
            skillItem.innerHTML = `<p>${skillName}${proofText} <a href="#" class="remove-skill">Remove</a></p>`;
            document.querySelector('.skills-list').appendChild(skillItem);
            document.getElementById('skillName').value = '';
            document.getElementById('skillProof').value = '';
            addRemoveFunctionality(skillItem.querySelector('.remove-skill'));
        }
    }

    // Add Service
    function addService() {
        const serviceTitle = document.getElementById('serviceTitle').value.trim();
        const serviceDescription = document.getElementById('serviceDescription').value.trim();
        const servicePrice = document.getElementById('servicePrice').value.trim();
        const serviceDelivery = document.getElementById('serviceDelivery').value.trim();
        if (serviceTitle !== '' && serviceDescription !== '') {
            const serviceItem = document.createElement('div');
            serviceItem.className = 'service-item';
            serviceItem.innerHTML = `<h4>${serviceTitle}</h4><p>${serviceDescription} | Starting at $${servicePrice} | Delivery in ${serviceDelivery} days</p><a href="#" class="remove-service">Remove</a>`;
            document.querySelector('.services-list').appendChild(serviceItem);
            document.getElementById('serviceTitle').value = '';
            document.getElementById('serviceDescription').value = '';
            document.getElementById('servicePrice').value = '';
            document.getElementById('serviceDelivery').value = '';
            addRemoveFunctionality(serviceItem.querySelector('.remove-service'));
        }
    }

    // Add Project
    function addProject() {
        const projectTitle = document.getElementById('projectTitle').value.trim();
        const projectDescription = document.getElementById('projectDescription').value.trim();
        const projectLink = document.getElementById('projectLink').value.trim();
        const projectImage = document.getElementById('projectImage').files[0];
        if (projectTitle !== '' && projectDescription !== '') {
            const projectItem = document.createElement('div');
            projectItem.className = 'portfolio-item';
            let imageSrc = 'default_project_image.jpg'; // Default image if no image is uploaded
            if (projectImage) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    projectItem.querySelector('img').src = e.target.result;
                };
                reader.readAsDataURL(projectImage);
            }
            projectItem.innerHTML = `<img src="${imageSrc}" alt="Project Image"><h4>${projectTitle}</h4><p>${projectDescription}</p><a href="${projectLink}" target="_blank" class="view-project-button">View Project</a><a href="#" class="remove-project">Remove</a>`;
            document.querySelector('.portfolio-grid').appendChild(projectItem);
            document.getElementById('projectTitle').value = '';
            document.getElementById('projectDescription').value = '';
            document.getElementById('projectLink').value = '';
            document.getElementById('projectImage').value = '';
            addRemoveFunctionality(projectItem.querySelector('.remove-project'));
        }
    }

    // Add Proof
    function addProof() {
        const proofType = document.getElementById('proofType').value;
        const proofFile = document.getElementById('proofFile').files[0];
        if (proofFile) {
            const proofItem = document.createElement('div');
            proofItem.className = 'proof-item';
            proofItem.innerHTML = `<p>${proofType} - ${proofFile.name} <a href="#" class="remove-proof">Remove</a></p>`;
            document.querySelector('.proofs-list').appendChild(proofItem);
            document.getElementById('proofType').value = 'certification';
            document.getElementById('proofFile').value = '';
            addRemoveFunctionality(proofItem.querySelector('.remove-proof'));
        }
    }

    // Function to add remove functionality to dynamically added elements
    function addRemoveFunctionality(removeButton) {
        removeButton.addEventListener('click', function (event) {
            event.preventDefault();
            removeButton.closest('.skill-item, .service-item, .portfolio-item, .proof-item').remove();
        });
    }

    // Function to show the appropriate section
    function showSection(targetSection) {
        sections.forEach(section => {
            if (section.id === targetSection) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    // Event listeners for sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
        });
    });

    // Display the first section by default
    if (sections.length > 0) {
        showSection(sections[0].id);
    }
});
