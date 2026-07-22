/* ============================================
   ANCM - SPA Navigation
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============ SPA NAVIGATION ============
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    function navigateTo(pageId) {
        // Hide all pages
        pages.forEach(page => page.classList.remove('active'));
        // Show target page
        const target = document.getElementById('page-' + pageId);
        if (target) {
            target.classList.add('active');
        }
        // Update nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });
        // Scroll to top
        window.scrollTo(0, 0);
        // Close mobile menu
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }

    // Handle all clicks with data-page attribute
    document.addEventListener('click', (e) => {
        const link = e.target.closest('[data-page]');
        if (link) {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            navigateTo(pageId);
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
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

    function closeModal() { modal.classList.remove('active'); }
    modalClose.addEventListener('click', closeModal);
    modalOk.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

});
