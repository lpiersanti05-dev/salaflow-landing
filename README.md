# SalaFlow — Landing Page

Sito vetrina statico (HTML/CSS/JS puro, nessun framework) per presentare SalaFlow.

## Struttura

```
index.html     tutto il contenuto e le sezioni della pagina
styles.css     stile grafico (palette ambra/oro coerente col prodotto)
script.js      menu mobile, animazioni allo scroll, gestione dei form
```

Nessuna build richiesta: è un sito statico, pronto così com'è.

## Pubblicare su Vercel

1. Crea un repository su GitHub e carica questi file:
   ```bash
   git init
   git add .
   git commit -m "Prima versione landing page SalaFlow"
   git branch -M main
   git remote add origin https://github.com/<tuo-utente>/<nome-repo>.git
   git push -u origin main
   ```
2. Vai su [vercel.com](https://vercel.com), collega il tuo account GitHub.
3. "Add New Project" → seleziona il repository appena creato.
4. Framework: **Other** (nessuna build da configurare). Lascia tutto com'è e premi **Deploy**.

Il sito sarà online in meno di un minuto, con un link tipo `nome-progetto.vercel.app`.
Da Vercel puoi poi collegare un dominio vero (es. `salaflow.app`) da Settings → Domains.

## Collegare i form a un servizio vero

I due form (richiesta demo e newsletter, in fondo alla pagina) al momento mostrano solo
un messaggio di conferma, ma **non salvano né inviano davvero i dati da nessuna parte**.

Per iniziare a ricevere sul serio le richieste, il modo più veloce senza scrivere un
backend è usare un servizio come [Formspree](https://formspree.io) (gratuito per iniziare):

1. Crea un account su Formspree e un nuovo form: ti darà un indirizzo tipo
   `https://formspree.io/f/xxxxxxxx`.
2. In `index.html`, aggiungi `action="https://formspree.io/f/xxxxxxxx" method="POST"`
   ai tag `<form id="demoForm">` e `<form id="newsletterForm">`.
3. In `script.js`, la funzione `handleFormSubmit` va aggiornata per inviare davvero i
   dati (con `fetch`) invece di limitarsi a mostrare il messaggio — c'è già un commento
   nel file che spiega dove intervenire.

In alternativa: Google Forms, Mailchimp, o un webhook personalizzato funzionano allo
stesso modo.
