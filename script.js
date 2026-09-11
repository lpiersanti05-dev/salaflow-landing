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
    '✓ Richiesta ricevuta! Ti contattiamo a breve per organizzare la demo.'
);

handleFormSubmit(
    document.getElementById('newsletterForm'),
    document.getElementById('newsletterFeedback'),
    '✓ Iscrizione confermata, a presto!'
);
