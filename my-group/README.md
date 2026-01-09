# Project Title: MyGroup

## Description
A web application to manage tasks collaboratively within a team. Users can create, update, delete, and assign tasks to team members.

## Technologies & Tools Used
- Frontend: React, TailwindCSS
- Backend: Node.js, Express, TypeScript
- Database: MongoDB Atlas
- Deployment: Vercel (frontend), Render (backend)

## Setup & Run Instructions

### Backend
1. Clone the repo: `git clone <https://github.com/thenurisenethma/MyGroup-rad-project/tree/main/my-group-be>`
2. Install dependencies: `npm install`
3. Set environment variables in `.env`:
4. Start backend: `npm start`  
5. Backend URL: `https://my-backend.onrender.com`

### Frontend
1. Clone the repo: `git clone <https://github.com/thenurisenethma/MyGroup-rad-project/tree/main/my-group>`
2. Install dependencies: `npm install`
3. Update API URLs in `Dashboard.tsx` or `config.ts` to point to the deployed backend.
4. Start frontend: `npm start`  
5. Frontend URL: `https://mygroup-rad-project.vercel.app/`

## Features
- Add, edit, delete tasks
- Assign tasks to team members
- Dashboard overview
- Fully responsive UI

## Screenshots
![Screenshots](screenshots/)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
