# Game Sphere Core — Portale legale

Sito statico ufficiale dei documenti legali di **Game Sphere Core**, appartenente alla community Game Sphere e sviluppato e gestito da Game Sphere Development.

## Pubblicazione su GitHub Pages

Il sito non richiede build, dipendenze, backend o database. Pubblicare il contenuto di questa cartella nella radice del branch scelto per GitHub Pages e impostare, nelle impostazioni del repository, la pubblicazione da quel branch e dalla cartella `/ (root)`.

File di ingresso: `index.html`.

## Riferimenti inseriti

- Responsabile del progetto: **Nexario**
- Paese di riferimento: **Italia**
- Contatto ufficiale: **gamesphere.staff@gmail.com**
- Quadro normativo: normativa italiana applicabile e normativa dell'Unione europea, senza elezione di un foro esclusivo ulteriore rispetto alla legge.

Non sono presenti placeholder legali residui. Prima dell'adozione ufficiale resta consigliata una verifica della corretta qualifica giuridica del soggetto che determina finalità e mezzi del trattamento.

## Aggiornamento della data

La data visualizzata è centralizzata nella costante `LEGAL_LAST_UPDATED` in `site.js`. Aggiornare sia il valore ISO sia l'etichetta italiana. I valori già presenti nell'HTML restano come fallback accessibile nel caso in cui JavaScript sia disattivato; dopo una modifica, cercare `7 agosto 2026` nei tre file HTML e aggiornare anche quei fallback.

## Caratteristiche tecniche

- HTML5, CSS3 e JavaScript nativo;
- percorsi relativi compatibili con GitHub Pages;
- nessun framework, tracker, analytics o cookie;
- risorse grafiche e stili ospitati localmente;
- Content Security Policy dichiarata nelle pagine;
- layout responsive, navigazione da tastiera e supporto a `prefers-reduced-motion`;
- indice laterale attivo, barra di lettura e indice comprimibile sui dispositivi mobili;
- sistema grafico dark premium con asset locali e nessuna dipendenza esterna.

## Funzionalità versione 1.2

- animazioni di comparsa progressive e discrete durante lo scroll, con piccoli ritardi tra elementi vicini e disattivazione automatica tramite `prefers-reduced-motion`;
- sezione “Domande frequenti” nella homepage con accordion accessibile, pulsanti nativi e stato `aria-expanded`;
- sezione compatta “Staff & Developer Area” con una finestra informativa dedicata al futuro accesso tramite Discord OAuth2;
- micro-interazioni e profondità delle card leggermente migliorate, senza sostituire il design esistente.

La Staff & Developer Area apre il backend reale `https://game-sphere-core-auth.gamesphere-staff.workers.dev/login`. Il frontend non contiene password, token, segreti o controlli di autorizzazione: autenticazione, sessione e verifica Server Owner/Fondation restano interamente lato Cloudflare Worker.

Nella versione 1.2 le animazioni on-scroll sono state rallentate a 920 ms, con dissolvenza del blur a 840 ms e stagger di 135 ms fra elementi vicini. Il supporto a `prefers-reduced-motion` rimane attivo. Tutti i collegamenti Contatto utilizzano `mailto:gamesphere.staff@gmail.com`.

Il contenuto è stato redatto in base al comportamento osservabile nel codice sorgente analizzato il 7 agosto 2026. Prima dell'uso ufficiale è opportuna una revisione legale professionale e una verifica periodica dopo ogni modifica del bot.
