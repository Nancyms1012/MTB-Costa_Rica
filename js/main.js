/* ============================================
   ANCM - SPA Navigation, Slideshow, Countdown, Particles
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============ PORTADA ============
    const portada = document.getElementById('portada');
    const sitioPrincipal = document.getElementById('sitio-principal');
    const enterCopa = document.getElementById('enter-copa');
    const enterKids = document.getElementById('enter-kids');

    if (enterCopa) {
        enterCopa.addEventListener('click', (e) => {
            e.preventDefault();
            portada.style.display = 'none';
            sitioPrincipal.style.display = 'block';
            navigateTo('inicio');
        });
    }
    if (enterKids) {
        enterKids.addEventListener('click', (e) => {
            e.preventDefault();
            portada.style.display = 'none';
            sitioPrincipal.style.display = 'block';
            navigateTo('copa-kids');
        });
    }

    // Volver a portada desde el logo
    const btnVolverPortada = document.getElementById('btn-volver-portada');
    if (btnVolverPortada) {
        btnVolverPortada.addEventListener('click', (e) => {
            e.preventDefault();
            sitioPrincipal.style.display = 'none';
            portada.style.display = 'block';
            window.scrollTo({ top: 0 });
        });
    }

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
    const eventDate = new Date('2026-10-31T08:00:00');

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


    // ============ RESULTADOS (desde JSON, top 3 M/F a la par + PDF) ============
    let RESULTADOS = null;   // data/resultados.json
    let GENERAL = null;      // data/general.json

    // Orden de presentación de categorías
    const ORDEN_CAT = [
        'ELITE', 'SUB23', 'OPEN', 'JUVENIL', 'PREJUVENIL', 'INFANTIL', 'PREINFANTIL',
        'MASTER A', 'MASTER B', 'MASTER C', 'MASTER D', 'MASTER E',
        'E-BIKE', 'PESO PLUMA', 'CYCLO CROSS'
    ];
    function ordenarCategorias(cats) {
        return Object.keys(cats).sort((a, b) => {
            let ia = ORDEN_CAT.indexOf(a); let ib = ORDEN_CAT.indexOf(b);
            if (ia === -1) ia = 999;
            if (ib === -1) ib = 999;
            return ia - ib;
        });
    }

    // Nombres bonitos de fecha en la lista
    function renderFechaList() {
        const cont = document.getElementById('results-event-list');
        if (!cont || !RESULTADOS) return;
        cont.innerHTML = '';
        Object.keys(RESULTADOS).forEach(num => {
            const f = RESULTADOS[num];
            const partes = (f.label || '').split('·');
            const titulo = (partes[0] || f.label || '').trim();
            const lugar = (partes[1] || '').trim();
            const row = document.createElement('div');
            row.className = 'result-event-row';
            row.innerHTML = `
                <div class="result-event-date">${f.fecha || ''}</div>
                <div class="result-event-place">
                    <i class="fas fa-map-marker-alt"></i>
                    <span><strong>${titulo}</strong><br>${lugar}</span>
                </div>
                <div class="result-event-mods">
                    <span class="mod-badge">Cross-Country <span class="mod-dot dot-xco"></span></span>
                    <span class="mod-badge">Short Track <span class="mod-dot dot-xcc"></span></span>
                </div>
                <a href="#" class="btn-see-results">Ver Resultados</a>`;
            row.querySelector('.btn-see-results').addEventListener('click', (e) => {
                e.preventDefault();
                abrirDetalleFecha(num);
            });
            cont.appendChild(row);
        });
    }

    // Etiquetas legibles
    const MOD_LABEL = { 'XCO': 'Cross-Country Olímpico', 'XCC': 'Short Track' };
    const MOD_DOT = { 'XCO': 'dot-xco', 'XCC': 'dot-xcc' };

    // Render de un podio (top 3) de un género dentro de una columna
    function podioColHTML(titulo, clase, rows, tipo) {
        let inner;
        if (!rows || rows.length === 0) {
            inner = `<div class="gender-empty">Sin participantes</div>`;
        } else {
            inner = '<table class="podium-table"><tbody>' + rows.map(r => {
                const meta = tipo === 'general' ? `${r.puntos != null ? r.puntos + ' pts' : ''}` : (r.time || '');
                return `<tr class="podium-${r.pos}">
                    <td class="podium-pos">${r.pos}</td>
                    <td><span class="podium-name">${r.name}</span><span class="podium-team">${r.team || ''}</span></td>
                    <td class="podium-meta">${meta}</td>
                </tr>`;
            }).join('') + '</tbody></table>';
        }
        return `<div class="gender-col"><div class="gender-head ${clase}">${titulo}</div>${inner}</div>`;
    }

    // Render de una categoría con Masculino y Femenino a la par
    function categoriaHTML(nombreCat, gen, tipo) {
        // gen puede tener M (masculino), F (femenino), X (mixto/open/general)
        const hayF = gen.F && gen.F.length;
        const hayM = gen.M && gen.M.length;
        const hayX = gen.X && gen.X.length;

        // Categoría puramente mixta (E-Bike, Peso Pluma, Cyclo Cross): una sola columna
        if (hayX && !hayF && !hayM) {
            const col = podioColHTML('GENERAL', 'mixto', gen.X, tipo);
            return `<div class="cat-block">
                <div class="cat-block-title">${nombreCat}</div>
                <div class="cat-genders" style="grid-template-columns:1fr; max-width:520px; margin:0 auto;">${col}</div>
            </div>`;
        }

        // Columna izquierda = Masculino (o el "Open/General" X si no hay M explícito)
        let colIzq;
        if (hayM) {
            colIzq = podioColHTML('MASCULINO', 'masc', gen.M, tipo);
        } else if (hayX) {
            // OPEN: la columna X es la general/masculina
            colIzq = podioColHTML(nombreCat === 'OPEN' ? 'OPEN' : 'GENERAL', 'masc', gen.X, tipo);
        } else {
            colIzq = podioColHTML('MASCULINO', 'masc', [], tipo);
        }
        // Columna derecha = Femenino
        const colDer = podioColHTML('FEMENINO', 'fem', gen.F || [], tipo);

        return `<div class="cat-block">
            <div class="cat-block-title">${nombreCat}</div>
            <div class="cat-genders">${colIzq}${colDer}</div>
        </div>`;
    }

    // Abrir detalle de una fecha
    let detalleFechaActual = null;
    let detalleModActual = 'XCO';
    function abrirDetalleFecha(num) {
        detalleFechaActual = num;
        const f = RESULTADOS[num];
        if (!f) return;
        document.getElementById('detalle-fecha-label').textContent =
            (f.label ? f.label.replace('·', '—') : '') + (f.fecha ? ' | ' + f.fecha : '');
        // tabs de modalidad presentes
        const mods = Object.keys(f.modalidades || {});
        const tabsCont = document.getElementById('detalle-mod-tabs');
        tabsCont.innerHTML = '';
        detalleModActual = mods.includes('XCO') ? 'XCO' : mods[0];
        mods.forEach(m => {
            const b = document.createElement('button');
            b.className = 'modalidad-tab' + (m === detalleModActual ? ' active' : '');
            b.innerHTML = `<span class="mod-dot ${MOD_DOT[m] || 'dot-xco'}"></span> ${MOD_LABEL[m] || m}`;
            b.addEventListener('click', () => {
                detalleModActual = m;
                tabsCont.querySelectorAll('.modalidad-tab').forEach(t => t.classList.remove('active'));
                b.classList.add('active');
                renderDetalleContenido();
            });
            tabsCont.appendChild(b);
        });
        renderDetalleContenido();
        navigateTo('resultado-detalle');
    }

    function renderDetalleContenido() {
        const cont = document.getElementById('detalle-content');
        const f = RESULTADOS[detalleFechaActual];
        const mod = f.modalidades[detalleModActual];
        if (!mod) { cont.innerHTML = '<p class="results-pending">Sin datos.</p>'; return; }
        let html = '';
        // botones PDF
        if (mod.pdfs && mod.pdfs.length) {
            html += '<div class="pdf-links">';
            mod.pdfs.forEach((p, i) => {
                let etiqueta = 'Ver resultados completos (PDF)';
                if (mod.pdfs.length > 1) {
                    etiqueta = /sabado/i.test(p) ? 'Resultados completos · Sábado (PDF)'
                             : /domingo/i.test(p) ? 'Resultados completos · Domingo (PDF)'
                             : `Resultados completos ${i + 1} (PDF)`;
                }
                html += `<a class="btn-pdf" href="${p}" target="_blank" rel="noopener"><i class="fas fa-file-pdf"></i> ${etiqueta}</a>`;
            });
            html += '</div>';
        }
        // categorías
        const cats = mod.categorias || {};
        ordenarCategorias(cats).forEach(cat => {
            html += categoriaHTML(cat, cats[cat], 'fecha');
        });
        cont.innerHTML = html;
    }

    // Abrir Clasificación General
    function abrirGeneral() {
        if (!GENERAL) return;
        document.getElementById('general-sub').textContent = GENERAL.sub || '';
        const cont = document.getElementById('general-content');
        let html = '';
        if (GENERAL.xlsx) {
            html += `<div class="pdf-links"><a class="btn-pdf" href="${GENERAL.xlsx}" target="_blank" rel="noopener"><i class="fas fa-file-excel"></i> Descargar tabla completa (Excel)</a></div>`;
        }
        const cats = GENERAL.categorias || {};
        ordenarCategorias(cats).forEach(cat => {
            html += categoriaHTML(cat, cats[cat], 'general');
        });
        cont.innerHTML = html;
        navigateTo('general-detalle');
    }

    // Cargar los JSON y enganchar la lista + botón general
    Promise.all([
        fetch('data/resultados.json').then(r => r.json()).catch(() => null),
        fetch('data/general.json').then(r => r.json()).catch(() => null)
    ]).then(([res, gen]) => {
        RESULTADOS = res; GENERAL = gen;
        renderFechaList();
        const btnGen = document.getElementById('btn-general');
        if (btnGen) btnGen.addEventListener('click', abrirGeneral);
    });

    // (Los filtros antiguos por botón fueron reemplazados por el render JSON de arriba.)


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

    // ============ CAMPEONES DESDE JSON ============
    fetch('data/campeones.json')
        .then(res => res.json())
        .then(campeones => {
            renderCampeones(campeones, 'XCC', document.querySelector('#page-format-xcc .champions-grid'));
            renderCampeones(campeones, 'XCO', document.querySelector('#page-format-xco .champions-grid'));
        })
        .catch(err => console.log('Error cargando campeones:', err));

    function renderCampeones(data, modalidad, container) {
        if (!container) return;
        const mujeres = data.filter(c => c.modalidad === modalidad && c.genero === 'F');
        const hombres = data.filter(c => c.modalidad === modalidad && c.genero === 'M');

        container.innerHTML = `
            <div class="champions-col">
                <h3 class="champions-gender">MUJERES</h3>
                ${mujeres.map(c => `
                    <div class="champion-card">
                        <span class="champion-category">${c.categoria}</span>
                        <span class="champion-name">${c.nombre} <strong>${c.apellido}</strong></span>
                        <span class="champion-team">${c.equipo}</span>
                    </div>
                `).join('')}
            </div>
            <div class="champions-col">
                <h3 class="champions-gender">HOMBRES</h3>
                ${hombres.map(c => `
                    <div class="champion-card">
                        <span class="champion-category">${c.categoria}</span>
                        <span class="champion-name">${c.nombre} <strong>${c.apellido}</strong></span>
                        <span class="champion-team">${c.equipo}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Trigger initial scroll check
    animateOnScroll();

    // ============ FORMAT TABS (Eventos) ============
    document.querySelectorAll('.format-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            // If tab has data-page, navigate to separate page
            const page = tab.getAttribute('data-page');
            if (page) {
                navigateTo(page);
                return;
            }
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
