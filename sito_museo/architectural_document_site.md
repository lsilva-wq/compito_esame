# Documento Architetturale del Sito: Musée du Louvre

Questo documento descrive l'architettura del sito web "Musée du Louvre", focalizzandosi sulla sua struttura, le principali sezioni e la navigazione.

## Alberatura delle Pagine (Site Map)

Il sito è composto dalle seguenti pagine HTML principali, organizzate in una struttura piatta ma con chiari collegamenti di navigazione:

*   **index.html** (Home Page)
*   **galleria.html** (Pagina della Galleria)
*   **eventi.html** (Pagina degli Eventi)
*   **informazioni.html** (Pagina delle Informazioni)

Non ci sono sottocartelle per le pagine HTML; tutte risiedono nella directory principale `sito_museo`. Le immagini sono gestite in una sottocartella `img/`.

## Descrizione delle Principali Sezioni

### Home Page (index.html)
*   **Hero Section**: Immagine di sfondo con titolo "Louvre" e sottotitolo "Musée du Louvre — Paris, France".
*   **Sezione "Il Museo più Visitato al Mondo"**: Breve descrizione introduttiva sul museo e la sua collezione.
*   **Footer**: Contiene informazioni di contatto, link di navigazione duplicati e orari di apertura.

### Galleria (galleria.html)
*   **Banner Immagine**: Immagine interna della galleria del Louvre.
*   **Sezione "Capolavori in Esposizione"**: Presenta una griglia di immagini e didascalie delle opere d'arte più famose.
*   **Footer**: Come la Home Page.

### Eventi (eventi.html)
*   **Sezione "Eventi al Louvre"**: Descrive diversi tipi di eventi (concerti, mostre temporanee, visite serali) con immagini e brevi descrizioni.
*   **Sezione "Prossimi Appuntamenti"**: Dettagli su eventi futuri come laboratori, conferenze e cene di gala.
*   **Footer**: Come la Home Page.

### Informazioni (informazioni.html)
*   **Sezione "Informazioni Utili"**: Box informativi su orari di apertura, tariffe, come arrivare (indirizzo, trasporti) e regole di visita.
*   **Sezione "Accessibilità"**: Dettagli sull'accessibilità del museo per persone con mobilità ridotta.
*   **Footer**: Come la Home Page, con l'aggiunta di link ai social media.

## Navigazione tra le Pagine

La navigazione principale del sito è gestita tramite una barra di navigazione (`navbar`) presente in tutte le pagine.

*   **Logo "Louvre"**: Cliccabile, porta alla Home Page (index.html).
*   **Link di Navigazione Principali**:
    *   Home (index.html)
    *   Galleria (galleria.html)
    *   Eventi (eventi.html)
    *   Informazioni (informazioni.html)
*   **Pulsante "Prenota Ora"**: Originariamente un pulsante senza funzionalità, è stato modificato per essere un link diretto all'applicazione di prenotazione (`http://localhost:3000`).

Il footer di ogni pagina include anche un set di link di navigazione duplicati per le sezioni principali del sito, garantendo un accesso facile da qualsiasi punto della pagina.
