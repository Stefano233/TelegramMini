# TelegramMini

Client di messaggistica in tempo reale ispirato a Telegram, sviluppato come progetto per l'esame di Sviluppo del Software (Universita degli Studi di Bari).

## Funzionalita

- Registrazione e login degli utenti
- Chat uno-a-uno con messaggi in tempo reale
- Stato online / offline dei contatti
- Barra laterale con lista contatti e avatar

## Stack tecnologico

**Frontend** - React 19, Vite, Bootstrap 5, react-icons
**Realtime e autenticazione** - Firebase
**Backend** - Node.js, Express 5, MongoDB con Mongoose

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

Progetto universitario. Le funzionalita di base sono implementate; non e pensato per un uso in produzione.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
