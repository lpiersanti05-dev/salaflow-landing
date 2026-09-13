// ---------------------------------------------------------
// Anno corrente nel footer
// ---------------------------------------------------------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------------------------------------------------------
// Menu mobile
// ---------------------------------------------------------
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

navToggle.addEventListener('click', () => {
    const isOpen = navMobile.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
});

navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMobile.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// ---------------------------------------------------------
// Animazioni "reveal" all'ingresso in viewport — scaglionate:
// dentro una stessa griglia (es. le card funzionalità), ogni
// elemento parte con un piccolo ritardo in più rispetto al
// precedente, invece di comparire tutti insieme in blocco.
// ---------------------------------------------------------
const revealEls = document.querySelectorAll('.reveal');
revealEls.forEach((el, i) => {
    const siblingReveals = el.parentElement ? [...el.parentElement.children].filter(c => c.classList.contains('reveal')) : [el];
    const indexInGroup = siblingReveals.indexOf(el);
    el.style.transitionDelay = `${Math.min(indexInGroup, 5) * 90}ms`;
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ---------------------------------------------------------
// Barra di progresso scroll in cima alla pagina.
// ---------------------------------------------------------
const scrollProgressEl = document.getElementById('scrollProgress');
if (scrollProgressEl) {
    let scrollTicking = false;
    const updateScrollProgress = () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
        scrollProgressEl.style.width = `${Math.min(100, Math.max(0, pct))}%`;
        scrollTicking = false;
    };
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(updateScrollProgress);
            scrollTicking = true;
        }
    });
    updateScrollProgress();
}

// ---------------------------------------------------------
// Numeri che "contano" da 0 al valore reale quando entrano in
// vista, nella sezione di confronto carta/SalaFlow.
// ---------------------------------------------------------
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const countEls = document.querySelectorAll('.count-num');
if (countEls.length) {
    const animateCount = (el) => {
        const target = parseInt(el.dataset.countTo, 10) || 0;
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        if (prefersReducedMotion) {
            el.textContent = `${prefix}${target}${suffix}`;
            return;
        }
        const duration = 900;
        const start = performance.now();
        const step = (now) => {
            const progress = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    countEls.forEach(el => countObserver.observe(el));
}

// ---------------------------------------------------------
// Mockup della piantina nell'hero: fa cambiare a rotazione lo
// stato di un tavolo, per dare l'idea di "sincronizzazione in
// tempo reale" a colpo d'occhio, senza dover leggere nulla.
// ---------------------------------------------------------
const mockTables = document.querySelectorAll('.mock-table');
if (mockTables.length) {
    const states = ['free', 'occ', 'res'];
    setInterval(() => {
        const table = mockTables[Math.floor(Math.random() * mockTables.length)];
        const current = states.find(s => table.classList.contains(s));
        const next = states[(states.indexOf(current) + 1) % states.length];
        table.classList.remove(current);
        table.classList.add(next);
        table.classList.add('mock-table-flip');
        setTimeout(() => table.classList.remove('mock-table-flip'), 350);
    }, 1800);
}

// ---------------------------------------------------------
// Form richiesta demo e newsletter.
//
// Questi form NON hanno ancora un backend collegato: al submit
// mostrano solo una conferma visiva. Per raccogliere davvero le
// richieste, collega un servizio come Formspree, Google Forms o
// un webhook personalizzato, e sostituisci la funzione
// handleFormSubmit qui sotto con una vera chiamata di rete
// (es. fetch('https://formspree.io/f/xxxxx', { method: 'POST', body: new FormData(form) })).
// ---------------------------------------------------------
function handleFormSubmit(form, feedbackEl, message) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        feedbackEl.textContent = message;
        feedbackEl.hidden = false;
        form.reset();
    });
}

handleFormSubmit(
    document.getElementById('demoForm'),
    document.getElementById('demoFeedback'),
    '✓ Richiesta ricevuta! Ti contattiamo a breve per organizzare la visita.'
);
