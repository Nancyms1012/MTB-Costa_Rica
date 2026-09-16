/* ============================================
   ANCM - SPA Navigation, Slideshow, Countdown, Particles
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // (Portada eliminada: el sitio entra directo al Inicio)
    // El logo del navbar ahora lleva al Inicio
    const btnVolverPortada = document.getElementById('btn-volver-portada');
    if (btnVolverPortada) {
        btnVolverPortada.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('inicio');
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

    // Orden de presentación de categorías (según indicación de Nancy)
    const ORDEN_CAT = [
        'ELITE', 'SUB23', 'OPEN',
        'MASTER A', 'MASTER B', 'MASTER C', 'MASTER D', 'MASTER E',
        'JUVENIL', 'PREJUVENIL', 'INFANTIL', 'PREINFANTIL',
        'E-BIKE', 'PESO PLUMA',
        // No estaba en la lista pero existe en algunos datos; va al final:
        'CYCLO CROSS'
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
    // Nombre de modalidad para el encabezado estilo UCI
    const MOD_TITULO = { 'XCO': 'CROSS-COUNTRY OLÍMPICO', 'XCC': 'SHORT TRACK' };

    // ¿Alguna fila tiene puntos? (para decidir si mostrar la columna Points)
    function hayPuntos(rows) {
        return rows && rows.some(r => r.points != null);
    }

    // Render de una tabla-podio estilo UCI (# / Rider-Team / Time / Gap / Points)
    // tipo: 'fecha' (time+gap+points) | 'general' (solo points)
    function podioTablaHTML(tituloCat, subtitulo, claseColor, rows, tipo) {
        const esGeneral = tipo === 'general';
        const mostrarPuntos = esGeneral || hayPuntos(rows);

        if (!rows || rows.length === 0) {
            return `<div class="uci-block">
                <div class="uci-block-head"><span class="uci-cat">${tituloCat}</span><span class="uci-sub ${claseColor}">${subtitulo}</span></div>
                <div class="uci-empty">Sin participantes</div>
            </div>`;
        }

        // Encabezado de columnas
        let cols = '<th class="c-pos">#</th><th class="c-rider">Ciclista / Equipo</th>';
        if (!esGeneral) cols += '<th class="c-time">Tiempo</th><th class="c-gap">Dif.</th>';
        if (mostrarPuntos) cols += '<th class="c-pts">Puntos</th>';

        const filas = rows.map(r => {
            let celdas = `<td class="c-pos"><span class="uci-pos">${r.pos}</span></td>
                <td class="c-rider"><span class="uci-name">${r.name}</span><span class="uci-team">${r.team || ''}</span></td>`;
            if (!esGeneral) {
                celdas += `<td class="c-time">${r.time || ''}</td>`;
                celdas += `<td class="c-gap">${r.gap && r.gap !== '-' ? r.gap : (r.pos === 1 ? '–' : '')}</td>`;
            }
            if (mostrarPuntos) {
                const pts = r.points != null ? r.points : (esGeneral && r.puntos != null ? r.puntos : '');
                celdas += `<td class="c-pts">${pts}</td>`;
            }
            return `<tr class="uci-row uci-pos-${r.pos}">${celdas}</tr>`;
        }).join('');

        return `<div class="uci-block">
            <div class="uci-block-head"><span class="uci-cat">${tituloCat}</span><span class="uci-sub ${claseColor}">${subtitulo}</span></div>
            <table class="uci-table"><thead><tr>${cols}</tr></thead><tbody>${filas}</tbody></table>
        </div>`;
    }

    // Render de una categoría con Masculino y Femenino a la par (estilo UCI)
    // modalidad: 'XCO' | 'XCC' | null (para general)
    function categoriaHTML(nombreCat, gen, tipo, modalidad) {
        const hayF = gen.F && gen.F.length;
        const hayM = gen.M && gen.M.length;
        const hayX = gen.X && gen.X.length;
        const modTxt = modalidad ? MOD_TITULO[modalidad] || '' : '';
        const sufijoMod = modTxt ? ` <span class="uci-cat-mod">— ${modTxt}</span>` : '';

        // Categorías realmente mixtas (una sola columna centrada "GENERAL"): E-Bike, Peso Pluma, Cyclo Cross.
        // OPEN NO entra aquí: su "X" es en realidad masculino y debe alinearse con los demás masculinos.
        const CATS_MIXTAS = ['E-BIKE', 'PESO PLUMA', 'CYCLO CROSS'];
        if (hayX && !hayF && !hayM && CATS_MIXTAS.includes(nombreCat)) {
            const col = podioTablaHTML(nombreCat + sufijoMod, 'GENERAL', 'mixto', gen.X, tipo);
            return `<div class="cat-block">
                <div class="cat-genders" style="grid-template-columns:1fr; max-width:560px; margin:0 auto;">${col}</div>
            </div>`;
        }

        // Columna izquierda = Masculino (o la X del Open, que es masculino)
        let colIzq;
        if (hayM) {
            colIzq = podioTablaHTML(nombreCat + sufijoMod, 'MASCULINO', 'masc', gen.M, tipo);
        } else if (hayX) {
            colIzq = podioTablaHTML(nombreCat + sufijoMod, 'MASCULINO', 'masc', gen.X, tipo);
        } else {
            colIzq = podioTablaHTML(nombreCat + sufijoMod, 'MASCULINO', 'masc', [], tipo);
        }
        // Columna derecha = Femenino. Si no hay, columna EN BLANCO (sin recuadro)
        const colDer = hayF
            ? podioTablaHTML(nombreCat + sufijoMod, 'FEMENINO', 'fem', gen.F, tipo)
            : '<div class="gender-col-empty"></div>';

        return `<div class="cat-block">
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
        // Genera los botones "Ver resultados completos (PDF)" de esta modalidad
        function pdfLinksHTML() {
            if (!mod.pdfs || !mod.pdfs.length) return '';
            let h = '<div class="pdf-links">';
            mod.pdfs.forEach((p, i) => {
                let etiqueta = 'Ver resultados completos (PDF)';
                if (mod.pdfs.length > 1) {
                    etiqueta = /sabado/i.test(p) ? 'Resultados completos · Sábado (PDF)'
                             : /domingo/i.test(p) ? 'Resultados completos · Domingo (PDF)'
                             : `Resultados completos ${i + 1} (PDF)`;
                }
                h += `<a class="btn-pdf" href="${p}" target="_blank" rel="noopener"><i class="fas fa-file-pdf"></i> ${etiqueta}</a>`;
            });
            return h + '</div>';
        }

        let html = '';
        // botones PDF ARRIBA
        html += pdfLinksHTML();
        // categorías
        const cats = mod.categorias || {};
        ordenarCategorias(cats).forEach(cat => {
            html += categoriaHTML(cat, cats[cat], 'fecha', detalleModActual);
        });
        // botones PDF + volver ABAJO
        html += pdfLinksHTML();
        html += `<div class="volver-todos-wrap">
            <a href="#" class="btn-volver-todos" id="btn-volver-todos"><i class="fas fa-list"></i> Volver a todos los resultados</a>
        </div>`;
        cont.innerHTML = html;
        const btnVolver = document.getElementById('btn-volver-todos');
        if (btnVolver) btnVolver.addEventListener('click', (e) => { e.preventDefault(); navigateTo('resultados'); });
    }

    // Abrir Clasificación General
    function abrirGeneral() {
        if (!GENERAL) return;
        document.getElementById('general-sub').textContent = GENERAL.sub || '';
        const cont = document.getElementById('general-content');
        let html = '';
        // (Botón de descargar Excel quitado por ahora — el archivo es Excel)
        const cats = GENERAL.categorias || {};
        ordenarCategorias(cats).forEach(cat => {
            html += categoriaHTML(cat, cats[cat], 'general', null);
        });
        html += `<div class="volver-todos-wrap">
            <a href="#" class="btn-volver-todos" id="btn-volver-todos-gen"><i class="fas fa-list"></i> Volver a todos los resultados</a>
        </div>`;
        cont.innerHTML = html;
        const btnVolverG = document.getElementById('btn-volver-todos-gen');
        if (btnVolverG) btnVolverG.addEventListener('click', (e) => { e.preventDefault(); navigateTo('resultados'); });
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
        engancharBotonesVerFecha();
    });

    // Botones "Ver Resultados" en los calendarios de Eventos (data-fecha)
    function engancharBotonesVerFecha() {
        document.querySelectorAll('.btn-ver-fecha').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const num = btn.getAttribute('data-fecha');
                if (RESULTADOS && RESULTADOS[num]) {
                    abrirDetalleFecha(num);
                } else {
                    // Fecha sin resultados cargados aún -> ir al listado de Resultados
                    navigateTo('resultados');
                }
            });
        });
    }

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

    // Orden de campeones: menores primero (Preinfantil arriba)
    const ORDEN_CAMPEONES = [
        'PREINFANTIL', 'INFANTIL', 'PREJUVENIL', 'JUVENIL', 'SUB 23', 'SUB23', 'ELITE',
        'MASTER A', 'MASTER B', 'MASTER C', 'MASTER D', 'MASTER E',
        'OPEN', 'E-BIKE', 'PESO PLUMA', 'CYCLO CROSS'
    ];
    function ordenarCampeones(lista) {
        return lista.slice().sort((a, b) => {
            let ia = ORDEN_CAMPEONES.indexOf(a.categoria); let ib = ORDEN_CAMPEONES.indexOf(b.categoria);
            if (ia === -1) ia = 999;
            if (ib === -1) ib = 999;
            return ia - ib;
        });
    }

    function renderCampeones(data, modalidad, container) {
        if (!container) return;
        const mujeres = ordenarCampeones(data.filter(c => c.modalidad === modalidad && c.genero === 'F'));
        const hombres = ordenarCampeones(data.filter(c => c.modalidad === modalidad && c.genero === 'M'));

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


    // ============ CONTADOR DE VISITAS ============
    // Usa un contador de imagen gratuito y sin registro (Moe Counter).
    // Si la imagen no carga, muestra un respaldo local con localStorage.
    (function contadorVisitas() {
        const img = document.getElementById('contador-img');
        const fallback = document.getElementById('contador-fallback');
        const num = document.getElementById('contador-visitas');
        if (!img) return;

        img.addEventListener('error', () => {
            // El servicio de imagen no respondió: usar respaldo local
            img.style.display = 'none';
            if (fallback && num) {
                let n = parseInt(localStorage.getItem('visitasMTB') || '0', 10) + 1;
                localStorage.setItem('visitasMTB', String(n));
                try { num.textContent = Number(n).toLocaleString('es-CR'); }
                catch (e) { num.textContent = n; }
                fallback.style.display = 'inline';
            }
        });
    })();
});
