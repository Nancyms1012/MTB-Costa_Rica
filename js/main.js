/* ============================================
   ANCM - SPA Navigation, Slideshow, Countdown, Particles
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============ SPA NAVIGATION ============
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    const allPageLinks = document.querySelectorAll('[data-page]');

    function navigateTo(pageName) {
        pages.forEach(p => p.classList.remove('active'));
        const target = document.getElementById('page-' + pageName);
        if (target) {
            target.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        navLinks.forEach(l => l.classList.remove('active'));
        const activeNav = document.querySelector(`.nav-link[data-page="${pageName}"]`);
        if (activeNav) activeNav.classList.add('active');
    }

    allPageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            if (page) navigateTo(page);
            // Close mobile menu
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ============ NAVBAR ============
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        animateOnScroll();
    });

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });


    // ============ HERO SLIDESHOW ============
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    const indicatorsContainer = document.getElementById('slide-indicators');
    let currentSlide = 0;
    let slideInterval;

    // Create indicators
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('indicator');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(dot);
    });

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        indicatorsContainer.children[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        indicatorsContainer.children[currentSlide].classList.add('active');
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    startSlideshow();

    // ============ PARTICLES ============
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }


    // ============ COUNTDOWN ============
    const eventDate = new Date('2026-09-13T08:00:00');

    function updateCountdown() {
        const now = new Date();
        const diff = eventDate - now;
        if (diff <= 0) return;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
        document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

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
                    stat.textContent = target + (target >= 10 ? '+' : '');
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
    }

    // ============ SCROLL ANIMATIONS ============
    function animateOnScroll() {
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
        document.querySelectorAll('.about-card, .modality-card, .event-card, .feature-card, .contact-card').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }

    document.querySelectorAll('.about-card, .modality-card, .event-card, .feature-card, .contact-card').forEach(el => {
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
            { pos: 1, name: 'Master Atleta 1', team: 'Team Master', scores: [100, 95, 100, 100, '-', '-'], total: 395 },
            { pos: 2, name: 'Master Atleta 2', team: 'Veteranos MTB', scores: [90, 100, 95, 90, '-', '-'], total: 375 },
            { pos: 3, name: 'Master Atleta 3', team: 'Legends', scores: [85, 90, 85, 85, '-', '-'], total: 345 },
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
    renderResults('elite-m');


    // ============ INSCRIPTION FORM ============
    const form = document.getElementById('inscription-form');
    const modal = document.getElementById('success-modal');
    const modalClose = document.getElementById('modal-close');
    const modalOk = document.getElementById('modal-ok');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
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
                modal.classList.add('active');
                form.reset();
            }
        });

        form.querySelectorAll('input, select').forEach(field => {
            field.addEventListener('input', () => {
                if (field.value.trim()) field.style.borderColor = 'var(--accent)';
            });
            field.addEventListener('blur', () => {
                if (!field.value.trim() && field.hasAttribute('required')) {
                    field.style.borderColor = 'var(--secondary)';
                } else {
                    field.style.borderColor = 'var(--gray-200)';
                }
            });
        });
    }

    // Close modal
    function closeModal() { modal.classList.remove('active'); }
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOk) modalOk.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    // Trigger initial scroll check
    animateOnScroll();
});
