# MixMaster (KAVIA Edition)

MixMaster is a modern, lightweight React application that helps users explore liquors, generate cocktail recipes, manage favorites and shopping lists, discover trending mixes, pair drinks with food, and try an interactive AI bartender chat for inspiration.

This documentation gives an overview of the component and folder structure, npm dependencies, and clear setup instructions to help new developers get started.

---

## Project Structure Overview

The main application code is located in `mixmaster/src/` and is organized into logical folders and modules:

```
src/
  App.js, App.css, index.js, index.css
  components/
    Card.js
    Feed.js
    MainLayout.js
    Sidebar.js, Sidebar.css
  features/
    AIBartender.js
    CocktailGenerator.js
    Explorer.js
    Favorites.js
    FavoritesProvider.js
    Pairings.js
    Search.js
    ShoppingList.js
    Trending.js
  setupTests.js
```

### Folders & Main Components

- **components/**
  - `Sidebar.js` – Sidebar navigation (responsive, emoji-based, branded)
  - `MainLayout.js` – Main layout wrapper: handles layout, navbar, sidebar, top-bar action buttons
  - `Card.js` – Reusable card component with branded dark backgrounds and accent borders
  - `Feed.js` – Mock real-time feed component for trending/seasonal features
  - `Sidebar.css` – Styles for the sidebar component

- **features/**
  - Each file is a main "page" or feature, shown via routes:
    - `Explorer.js` – Liquor & mixer exploration cards (mock data)
    - `CocktailGenerator.js` – Cocktail recipe generator with filters (mock data)
    - `Search.js` – Smart search; searches liquors/cocktails by name, ingredient, etc (mock data)
    - `Favorites.js`, `FavoritesProvider.js` – Favorite cocktail management and shopping list (all data stored in React state)
    - `ShoppingList.js` – Shopping list, ingredient management
    - `Trending.js` – Trending cocktails and activity feed (mock, static data)
    - `Pairings.js` – Liquor/food pairing cards
    - `AIBartender.js` – Simple chat-demo UI for cocktail suggestions

- **App.js** – Top-level component: handles React Router routes and wraps pages in layout/sidebar.
- **App.css / index.css** – Unified brand styles, fonts, card/grid/theming and base resets.

---

## NPM/Package Dependencies

Dependencies are managed in `package.json`. Key packages:

- **react** and **react-dom** – Core React
- **react-router-dom** – Client-side routing for pages/features
- **react-scripts** – Scripts/builder for create-react-app
- **cross-env** – DEV: For cross-platform environment variables in npm scripts (devDependency)
- **eslint** and **eslint-plugin-react** – Linting; see `eslint.config.mjs`

No UI frameworks (Material UI, Bootstrap, etc.) are used; all UI is custom/CSS.

#### Installed dependencies (see `mixmaster/package.json`):

```json
"dependencies": {
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^7.6.1",
  "react-scripts": "^5.0.1"
},
"devDependencies": {
  "cross-env": "^7.0.3"
}
```

- **react-router-dom** is used for navigation between all main app sections (sidebar and top-level routes).
- **CSS modules**: Not directly used, but CSS files (`App.css`, `Sidebar.css`, `index.css`) provide all styling.

---

## Setup & Local Development

To set up and develop the MixMaster frontend locally:

1. **Install dependencies** (in the `mixmaster/` directory):

   ```sh
   npm install
   ```

2. **Start the development server:**

   ```sh
   npm start
   ```

   - Open [http://localhost:3000](http://localhost:3000) to view the app.
   - Supports full hot-reload.

3. **Run tests:**

   ```sh
   npm test
   ```

   - Uses Jest and React Testing Library (`setupTests.js`).

4. **Build for production:**

   ```sh
   npm run build
   ```

   - Output is placed in `mixmaster/build/`.

> **Note:** The app is frontend-only; all data (liquor info, cocktails, favorites, shopping list) is defined in JavaScript constants and React state. There is no backend or API to configure.

---

## Notes on Application Structure & Styling

- **Routing**: All navigation (sidebar and header links) is handled via [react-router-dom](https://reactrouter.com/).
- **Components & Features**: Most features use demo/mock data for easy prototyping and UI demonstration.
- **State Management**: Favorites and shopping lists are managed with React context (`FavoritesProvider.js`).
- **Styling**: Unified, modern dark-branded theming, with all colors and layout variables in `App.css`. No third-party UI kits are used.
- **Responsiveness**: The layout uses CSS grid/flex, is mobile-friendly, and adapts the sidebar for narrow screens.
- **Extensibility**: New features can be added as new files in `features/`, imported and routed via `App.js`.

---

## Adding New Features

- Create a new file in `src/features/`, define your component.
- Add a `<Route>` in `src/App.js`, and an entry in `Sidebar.js` for navigation.
- Use the existing `Card` and layout patterns to match the brand/style.

---

## Mock Data

- All "backend" and business logic is handled in-place for demonstration—no API requests or persistent storage.
- Edit arrays/constants in the relevant feature files for demo data.

---

## Customization – Colors & Theming

Brand color variables are defined in `src/App.css`:

```css
:root {
  --brand-primary: #1A1A2E;
  --brand-secondary: #16213E;
  --brand-accent: #F67280;
  --kavia-orange: #E87A41;
  --kavia-dark: #1A1A1A;
  --text-color: #fff;
  --border-color: rgba(255, 255, 255, 0.08);
  ...
}
```

UI components and buttons use these variables for a consistent, unified look.

---

## Learn More

- KAVIA/MixMaster is built as a rapid-prototyping, frontend-only app.
- All features and styling conventions are discoverable in the components and CSS files.
- To learn more about React, see the [React documentation](https://reactjs.org/).

