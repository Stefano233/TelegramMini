# TelegramMini

Client di messaggistica in tempo reale ispirato a Telegram, sviluppato come progetto per l'esame di Sviluppo del Software (Università degli Studi di Bari).

## Funzionalità

- Registrazione e login degli utenti
- Chat uno-a-uno con messaggi in tempo reale
- Stato online / offline dei contatti
- Barra laterale con lista contatti e avatar

## Stack tecnologico

- **Frontend:** React 19, Vite, Bootstrap 5, react-icons
- **Realtime e autenticazione:** Firebase
- **Backend:** Node.js, Express 5, MongoDB con Mongoose

## Avvio in locale

Servono Node.js 18+ e un'istanza MongoDB raggiungibile.

Frontend:

    npm install
    npm run dev

Backend:

    cd backend
    npm install
    npm start

## Variabili d'ambiente

Il backend legge la configurazione da `backend/.env`. Copiare `backend/.env.example` e valorizzare le variabili con le proprie credenziali. Il file `.env` non va mai committato.

## Stato del progetto

Progetto universitario. Le funzionalità di base sono implementate; non è pensato per un uso in produzione.
