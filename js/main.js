/* ============================================
   ANCM - Asociación Nacional de Ciclismo de Montaña
   JavaScript Principal
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ============ NAVBAR ============
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateBackToTop();
        animateOnScroll();
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    });


    // ============ BACK TO TOP ============
    const backToTop = document.getElementById('back-to-top');
    
    function updateBackToTop() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============ STATS COUNTER ============
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
    }

    // ============ SCROLL ANIMATIONS ============
    function animateOnScroll() {
        // Stats counter
        if (!statsAnimated) {
            const statsSection = document.querySelector('.stats-row');
            if (statsSection) {
                const rect = statsSection.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8) {
                    statsAnimated = true;
                    animateCounters();
                }
            }
        }

        // Reveal elements
        const revealElements = document.querySelectorAll('.about-card, .modality-card, .event-card');
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }

    // Initial styles for animation
    document.querySelectorAll('.about-card, .modality-card, .event-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });


    // ============ RESULTS TABLE ============
    const resultsData = {
        'elite-m': [
            { pos: 1, name: 'Atleta Ejemplo 1', team: 'Team A', scores: [100, 95, 100, 90, '-', '-'], total: 385 },
            { pos: 2, name: 'Atleta Ejemplo 2', team: 'Team B', scores: [90, 100, 85, 95, '-', '-'], total: 370 },
            { pos: 3, name: 'Atleta Ejemplo 3', team: 'Team C', scores: [85, 85, 90, 100, '-', '-'], total: 360 },
            { pos: 4, name: 'Atleta Ejemplo 4', team: 'Team A', scores: [80, 90, 80, 85, '-', '-'], total: 335 },
            { pos: 5, name: 'Atleta Ejemplo 5', team: 'Team D', scores: [75, 80, 75, 80, '-', '-'], total: 310 },
        ],
        'elite-f': [
            { pos: 1, name: 'Atleta Femenina 1', team: 'Team A', scores: [100, 100, 95, 100, '-', '-'], total: 395 },
            { pos: 2, name: 'Atleta Femenina 2', team: 'Team B', scores: [95, 90, 100, 90, '-', '-'], total: 375 },
            { pos: 3, name: 'Atleta Femenina 3', team: 'Team C', scores: [90, 85, 90, 85, '-', '-'], total: 350 },
        ],
        'sub23': [
            { pos: 1, name: 'Sub-23 Atleta 1', team: 'Team A', scores: [100, 95, 100, 95, '-', '-'], total: 390 },
            { pos: 2, name: 'Sub-23 Atleta 2', team: 'Team B', scores: [95, 100, 90, 90, '-', '-'], total: 375 },
            { pos: 3, name: 'Sub-23 Atleta 3', team: 'Team C', scores: [85, 90, 85, 85, '-', '-'], total: 345 },
        ],
        'juvenil': [
            { pos: 1, name: 'Juvenil Atleta 1', team: 'Escuela MTB', scores: [100, 100, 95, 100, '-', '-'], total: 395 },
            { pos: 2, name: 'Juvenil Atleta 2', team: 'Club Junior', scores: [90, 95, 100, 90, '-', '-'], total: 375 },
            { pos: 3, name: 'Juvenil Atleta 3', team: 'Team Kids', scores: [85, 85, 90, 95, '-', '-'], total: 355 },
        ],
        'master': [
            { pos: 1, name: 'Máster Atleta 1', team: 'Team Máster', scores: [100, 95, 100, 100, '-', '-'], total: 395 },
            { pos: 2, name: 'Máster Atleta 2', team: 'Veteranos MTB', scores: [90, 100, 95, 90, '-', '-'], total: 375 },
            { pos: 3, name: 'Máster Atleta 3', team: 'Legends', scores: [85, 90, 85, 85, '-', '-'], total: 345 },
        ],
        'kids': [
            { pos: 1, name: 'Kids Atleta 1', team: 'Escuela MTB', scores: [100, 100, 100, 95, '-', '-'], total: 395 },
            { pos: 2, name: 'Kids Atleta 2', team: 'Club Junior', scores: [95, 95, 90, 100, '-', '-'], total: 380 },
            { pos: 3, name: 'Kids Atleta 3', team: 'Team Peques', scores: [90, 85, 95, 90, '-', '-'], total: 360 },
        ],
    };

    const filterBtns = document.querySelectorAll('.filter-btn');
    const resultsBody = document.getElementById('results-body');

    function renderResults(category) {
        const data = resultsData[category] || [];
        resultsBody.innerHTML = '';
        
        data.forEach(row => {
            const podiumClass = row.pos <= 3 ? `podium-${row.pos}` : '';
            const tr = document.createElement('tr');
            tr.className = podiumClass;
            tr.innerHTML = `
                <td>${row.pos}</td>
                <td style="text-align:left; font-weight:600;">${row.name}</td>
                <td>${row.team}</td>
                ${row.scores.map(s => `<td>${s}</td>`).join('')}
                <td style="font-weight:700;">${row.total}</td>
            `;
            resultsBody.appendChild(tr);
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderResults(btn.getAttribute('data-filter'));
        });
    });

    // Initial render
    renderResults('elite-m');


    // ============ INSCRIPTION FORM ============
    const form = document.getElementById('inscription-form');
    const modal = document.getElementById('success-modal');
    const modalClose = document.getElementById('modal-close');
    const modalOk = document.getElementById('modal-ok');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic validation
        const requiredFields = form.querySelectorAll('[required]');
        let valid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim() && field.type !== 'checkbox') {
                field.style.borderColor = 'var(--secondary)';
                valid = false;
            } else if (field.type === 'checkbox' && !field.checked) {
                valid = false;
            } else {
                field.style.borderColor = 'var(--gray-200)';
            }
        });

        if (valid) {
            // Collect form data
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => { data[key] = value; });
            
            console.log('Inscripción enviada:', data);
            
            // Show success modal
            modal.classList.add('active');
            form.reset();
        }
    });

    // Form field validation on input
    form.querySelectorAll('input, select').forEach(field => {
        field.addEventListener('input', () => {
            if (field.value.trim()) {
                field.style.borderColor = 'var(--accent)';
            }
        });
        field.addEventListener('blur', () => {
            if (!field.value.trim() && field.hasAttribute('required')) {
                field.style.borderColor = 'var(--secondary)';
            } else {
                field.style.borderColor = 'var(--gray-200)';
            }
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
    }
    modalClose.addEventListener('click', closeModal);
    modalOk.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // ============ COUNTDOWN TO NEXT EVENT ============
    // Next event: July 18, 2026
    const nextEvent = new Date('2026-07-18T08:00:00');
    
    function updateCountdown() {
        const now = new Date();
        const diff = nextEvent - now;
        
        if (diff <= 0) return;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        const activeCard = document.querySelector('.event-card.active .event-badge.badge-active');
        if (activeCard && days > 0) {
            activeCard.textContent = `Faltan ${days} días`;
        } else if (activeCard && days === 0) {
            activeCard.textContent = `¡Hoy!`;
        }
    }

    updateCountdown();

    // Trigger initial scroll check
    animateOnScroll();
});
