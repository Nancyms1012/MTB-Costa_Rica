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


    // ============ RESULTS TABLE - III Fecha XCO Adventure Park, Barva de Heredia ============
    const resultsData = {
        'master-a': [
            { pos: 1, name: 'MARTÍNEZ Andrés', team: 'NOSOTROS DOTA - PASION MX', time: '00:45:36' },
            { pos: 2, name: 'MORALES Allan', team: 'TEAM INNOVABIKES SKOLER UH', time: '00:47:22' },
            { pos: 3, name: 'ARTAVIA Enrique', team: 'BOBBYS CYCLING TEAM', time: '00:47:52' },
            { pos: 4, name: 'MORA Juan Manuel', team: 'N/A', time: '00:48:41' },
            { pos: 5, name: 'SANDOVAL Alberto', team: 'ALGO RITMO DEVELOMET', time: '00:49:06' },
            { pos: 6, name: 'CALDERÓN Edwin', team: 'CAPOS MOBI BIKE TEAM', time: '00:49:55' },
            { pos: 7, name: 'ALPIZAR Roberto', team: 'TEAM GOCHA', time: '00:51:15' },
            { pos: 8, name: 'CAMPOS Diego', team: 'GOCHA CYCLING TEAM', time: '00:53:57' },
            { pos: 9, name: 'ARIAS Kibeth', team: 'VEINTE24 CYCLING', time: '00:54:36' },
            { pos: 10, name: 'BENAVIDES Kenneth', team: 'BELÉN TEAM', time: '00:55:44' },
        ],
        'master-b': [
            { pos: 1, name: 'RAMÍREZ Federico', team: 'SEVEN CARD WILLIER', time: '00:47:28' },
            { pos: 2, name: 'HERRERA Elber', team: 'BOBBYS CYCLING TEAM', time: '00:49:33' },
            { pos: 3, name: 'SANABRIA Kenneth', team: 'TREK BIKE STORE', time: '00:50:04' },
            { pos: 4, name: 'MOLINA Hairo', team: 'CCDRESCAZU', time: '00:51:05' },
            { pos: 5, name: 'CORTES Jerry', team: 'BUF, DRASANVI, ECOTIENDA', time: '00:51:38' },
            { pos: 6, name: 'RODRÍGUEZ Julián', team: 'BELÉN TEAM', time: '00:53:05' },
            { pos: 7, name: 'BARRANTES Richard', team: 'VEINTE24', time: '00:55:00' },
            { pos: 8, name: 'GAMBOA Andrés', team: 'NUMU COACHING', time: '00:56:35' },
        ],
        'master-c': [
            { pos: 1, name: 'CHACÓN Gonzalo', team: 'TEAM GOCHA', time: '00:48:01' },
            { pos: 2, name: 'AZOFEIFA Marcos', team: 'BOBBYS CYCLING TEAM', time: '00:50:28' },
            { pos: 3, name: 'MÉNDEZ Diego', team: 'ULTIMATE TEAM', time: '00:52:29' },
            { pos: 4, name: 'LOPEZ Jose', team: 'TEAM GOCHA', time: '00:54:51' },
            { pos: 5, name: 'GARCIA Jorge', team: 'WATIOS CYCLING PERFORMANCE', time: '00:55:34' },
            { pos: 6, name: 'PEREZ Hector', team: 'GW ERCO SPORTFITNESS', time: '00:55:42' },
            { pos: 7, name: 'VILLALOBOS Steven', team: 'CALLE NIÑO SANO', time: '00:56:57' },
            { pos: 8, name: 'EL SEMAANI Jean Paul', team: 'HATOVIEJO - MOMIA TS', time: '00:57:37' },
        ],
        'master-d': [
            { pos: 1, name: 'GONZALEZ Victor', team: 'EPIC BIKE ATENAS', time: '00:52:42' },
            { pos: 2, name: 'CARVAJAL Jonathan', team: 'BOBBYS CYCLING TEAM', time: '00:52:47' },
            { pos: 3, name: 'GÓMEZ José Antonio', team: 'BPT', time: '00:53:27' },
            { pos: 4, name: 'BELTRAN Pablo', team: 'BELPOWER RUGATI', time: '00:58:47' },
            { pos: 5, name: 'ARAYA Ronald', team: 'X3ME XTREME', time: '00:59:01' },
            { pos: 6, name: 'BRENES Mario', team: 'BDRIFT-MOTORSPORTNUTRITION', time: '00:59:49' },
        ],
        'master-e': [
            { pos: 1, name: 'ROJAS Melvin', team: 'BOBBYS CYCLING TEAM', time: '00:53:46' },
            { pos: 2, name: 'MUÑOZ Germán', team: 'TREK', time: '00:54:38' },
            { pos: 3, name: 'RODRÍGUEZ Luis Angel', team: 'JONATHAN QUESADA TRAINING', time: '00:58:42' },
            { pos: 4, name: 'CAMPOS Marvin', team: 'BELEN TEAM', time: '01:00:04' },
            { pos: 5, name: 'RUBI Luis', team: 'DUROS COMO ROCA', time: '01:04:26' },
        ],
        'open': [
            { pos: 1, name: 'MENESES Jose', team: 'STYM', time: '00:51:45' },
            { pos: 2, name: 'ZAMORA Jose David', team: 'VEINTE24', time: '00:52:18' },
            { pos: 3, name: 'SANDI Kendall', team: 'POWERCYCLING', time: '00:52:55' },
            { pos: 4, name: 'MORENO Carlos', team: 'NUMUCOACHING', time: '00:56:42' },
            { pos: 5, name: 'RIVERA Jackdanny', team: 'VEINTE24 CYCLING', time: '00:57:51' },
            { pos: 6, name: 'ARAYA Bryan', team: 'BPT/ CYCLINGLAB', time: '00:58:03' },
        ],
        'open-f': [
            { pos: 1, name: 'TRETTI Caterina', team: 'VEINTE24', time: '00:45:56' },
        ],
        'master-f': [
            { pos: 1, name: 'ALVARADO Lisbeth', team: 'ROES CENTELA', time: '00:50:40' },
            { pos: 2, name: 'LORIA Dilcen', team: 'FISIONORTE / QUESADACYCLING', time: '00:52:59' },
        ],
        'infantil-m': [
            { pos: 1, name: 'RODRÍGUEZ Joaquín', team: 'CCDR SAN JOSÉ', time: '00:34:59' },
            { pos: 2, name: 'VALVERDE Liam', team: 'CCDR TURRIALBA', time: '00:35:53' },
            { pos: 3, name: 'CORDERO Iker Mattias', team: 'PZ CYCLING TEAM', time: '00:37:18' },
            { pos: 4, name: 'CARBALLO Abraham', team: 'BIKERS RACING TEAM', time: '00:37:39' },
            { pos: 5, name: 'ARCE Mathew', team: 'TEAM ARCE', time: '00:38:02' },
            { pos: 6, name: 'SANDI Derek Ivan', team: 'CCDR ESCAZÚ', time: '00:40:49' },
            { pos: 7, name: 'GARCÍA Danny Armando', team: 'ROES/COMITÉ CANTONAL ZARCERO', time: '00:40:53' },
            { pos: 8, name: 'MARÍN Isaac José', team: 'ACISA SARAPIQUI', time: '00:42:36' },
        ],
        'infantil-f': [
            { pos: 1, name: 'CALDERÓN Ariana', team: 'COLONO BIKE STATION KOLBI', time: '00:21:50' },
            { pos: 2, name: 'TORRES Camila Del Pilar', team: 'CCDRESCAZU', time: '00:24:37' },
            { pos: 3, name: 'CRUZ Monica', team: 'SCOTT SHIMANO CYCLING TEAM', time: '00:25:26' },
            { pos: 4, name: 'MARCHENA Shelly', team: 'CCDRESCAZU', time: '00:27:14' },
        ],
        'preinfantil-m': [
            { pos: 1, name: 'ARAYA Emiliano', team: 'CCDR SANTA CRUZ, TEAM COSTA FRUT', time: '00:23:06' },
            { pos: 2, name: 'CÉSPEDES Anthony Luan', team: 'SKALA MONTEVERDE/CCDR MONTEVERDE', time: '00:25:27' },
            { pos: 3, name: 'CERDAS Isaac', team: 'CODEA ALAJUELA', time: '00:28:55' },
            { pos: 4, name: 'HUNTER Ian', team: 'CODEA', time: '00:33:00' },
            { pos: 5, name: 'HERRERA Mathias', team: 'INDEPENDIENTE', time: '00:37:03' },
        ],
        'preinfantil-f': [
            { pos: 1, name: 'HERNÁNDEZ Maripaz', team: 'SANTA ANA / HDZ TEAM', time: '00:26:55' },
            { pos: 2, name: 'JIMÉNEZ Mia', team: 'CCDR SAN JOSÉ', time: '00:28:23' },
            { pos: 3, name: 'MONTEALEGRE María Paula', team: 'CCDR SANTA CRUZ', time: '00:33:41' },
            { pos: 4, name: 'MORA Valentina', team: 'CODEA ALAJUELA', time: '00:35:04' },
        ],
        'prejuvenil-m': [
            { pos: 1, name: 'PAREDES Miguel', team: 'ASTRANOVA BIKE HOUSE TREK', time: '00:45:44' },
            { pos: 2, name: 'GARCÍA Miguel', team: 'COLONO BIKE STATION KOLBI', time: '00:49:42' },
            { pos: 3, name: 'ARIAS Daniel', team: 'CICLISMO BELÉN', time: '00:50:29' },
            { pos: 4, name: 'ACUÑA Felipe', team: 'CCDR DE NARANJO', time: '00:51:40' },
            { pos: 5, name: 'HERNANDEZ Walter David', team: 'SCOTT SHIMANO CYCLING TEAM', time: '00:52:05' },
            { pos: 6, name: 'SABALLOS Joshua', team: 'CICLISMO BELÉN', time: '00:52:38' },
            { pos: 7, name: 'CARBALLO Bryan', team: 'BIKERS RACING TEAM', time: '00:53:20' },
            { pos: 8, name: 'AGUILAR Luciano', team: 'CODEA ALAJUELA', time: '00:55:29' },
        ],
        'prejuvenil-f': [
            { pos: 1, name: 'JIMENEZ Briana', team: 'BOBBYS CYCLING TEAM', time: '00:47:23' },
            { pos: 2, name: 'CÉSPEDES Isabella Jazlene', team: 'SKALA MONTEVERDE/CCDR MONTEVERDE', time: '00:55:02' },
            { pos: 3, name: 'SOLIS Nathalia', team: 'CODEA ALAJUELA', time: '00:57:16' },
        ],
    };

    const filterBtns = document.querySelectorAll('.filter-btn');
    const resultsBodyXco = document.getElementById('results-body-xco');

    function renderResults(category, targetBody) {
        const data = resultsData[category] || [];
        if (!targetBody) return;
        targetBody.innerHTML = '';
        if (data.length === 0) {
            targetBody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:20px; color:#6c757d;">Sin datos disponibles</td></tr>';
            return;
        }
        data.forEach(row => {
            const podiumClass = row.pos <= 3 ? `podium-${row.pos}` : '';
            const tr = document.createElement('tr');
            tr.className = podiumClass;
            tr.innerHTML = `
                <td>${row.pos}</td>
                <td style="text-align:left; font-weight:600;">${row.name}</td>
                <td>${row.team}</td>
                <td>${row.time}</td>
            `;
            targetBody.appendChild(tr);
        });
    }

    // XCO filters
    document.querySelectorAll('#filters-xco .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#filters-xco .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderResults(btn.getAttribute('data-filter'), resultsBodyXco);
        });
    });

    // Initial render XCO
    renderResults('master-a', resultsBodyXco);


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

    // ============ FORMAT TABS (Eventos) ============
    document.querySelectorAll('.format-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.format-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.format-calendar').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            const format = tab.getAttribute('data-format');
            document.getElementById('cal-' + format).classList.add('active');
        });
    });

    // Mega dropdown links - navigate to eventos and activate format tab
    document.querySelectorAll('.mega-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            const format = link.getAttribute('data-format');
            if (page) navigateTo(page);
            if (format) {
                setTimeout(() => {
                    document.querySelectorAll('.format-tab').forEach(t => t.classList.remove('active'));
                    document.querySelectorAll('.format-calendar').forEach(c => c.classList.remove('active'));
                    const tab = document.querySelector(`.format-tab[data-format="${format}"]`);
                    if (tab) tab.classList.add('active');
                    const cal = document.getElementById('cal-' + format);
                    if (cal) cal.classList.add('active');
                }, 100);
            }
            // Close mobile menu
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});
