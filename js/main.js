/* ============================================
   ANCM - SPA + Visual Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============ SPA NAVIGATION ============
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    function navigateTo(pageId) {
        pages.forEach(page => page.classList.remove('active'));
        const target = document.getElementById('page-' + pageId);
        if (target) {
            target.classList.add('active');
            // Trigger entrance animations
            const animElements = target.querySelectorAll('.animate-in, .animate-in-delay-1, .animate-in-delay-2, .animate-in-delay-3');
            animElements.forEach(el => {
                el.style.animation = 'none';
                el.offsetHeight; // force reflow
                el.style.animation = '';
            });
        }
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });
        window.scrollTo(0, 0);
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }

    document.addEventListener('click', (e) => {
        const link = e.target.closest('[data-page]');
        if (link) {
            e.preventDefault();
            navigateTo(link.getAttribute('data-page'));
        }
    });

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });


    // ============ COUNTDOWN ============
    const nextEvent = new Date('2026-09-13T08:00:00');

    function updateCountdown() {
        const now = new Date();
        const diff = nextEvent - now;

        if (diff <= 0) {
            document.getElementById('cd-days').textContent = '00';
            document.getElementById('cd-hours').textContent = '00';
            document.getElementById('cd-minutes').textContent = '00';
            document.getElementById('cd-seconds').textContent = '00';
            return;
        }

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

    // ============ PARTICLES ============
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 60;

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
                this.size = Math.random() * 3 + 1;
                this.speedX = (Math.random() - 0.5) * 0.8;
                this.speedY = (Math.random() - 0.5) * 0.8;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            connectParticles();
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }


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

    renderResults('elite-m');


    // ============ INSCRIPTION FORM ============
    const form = document.getElementById('inscription-form');
    const modal = document.getElementById('success-modal');
    const modalClose = document.getElementById('modal-close');
    const modalOk = document.getElementById('modal-ok');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const requiredFields = form.querySelectorAll('[required]');
        let valid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim() && field.type !== 'checkbox') {
                field.style.borderColor = '#e63946';
                valid = false;
            } else if (field.type === 'checkbox' && !field.checked) {
                valid = false;
            } else {
                field.style.borderColor = '#e9ecef';
            }
        });

        if (valid) {
            modal.classList.add('active');
            form.reset();
        }
    });

    form.querySelectorAll('input, select').forEach(field => {
        field.addEventListener('input', () => {
            if (field.value.trim()) field.style.borderColor = '#2d8a4e';
        });
        field.addEventListener('blur', () => {
            if (!field.value.trim() && field.hasAttribute('required')) {
                field.style.borderColor = '#e63946';
            } else {
                field.style.borderColor = '#e9ecef';
            }
        });
    });

    function closeModal() { modal.classList.remove('active'); }
    modalClose.addEventListener('click', closeModal);
    modalOk.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

});
