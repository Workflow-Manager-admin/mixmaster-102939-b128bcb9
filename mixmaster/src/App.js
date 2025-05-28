import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Sidebar from './components/Sidebar';
import './components/Sidebar.css';

// Feature pages
import Explorer from './features/Explorer';
import CocktailGenerator from './features/CocktailGenerator';
import Search from './features/Search';
import Favorites from './features/Favorites';
import Trending from './features/Trending';
import Pairings from './features/Pairings';
import ShoppingList from './features/ShoppingList';
import AIBartender from './features/AIBartender';

function App() {
  // Sidebar navigation is handled by <NavLink> in Sidebar now.
  // MainLayout includes navbar, sidebar, and renders content.

  // Render main routes inside MainLayout. Sidebar itself can be rendered inside MainLayout or App for proper layout (app-has-sidebar).

  return (
    <Router>
      <div className="app app-has-sidebar">
        {/* Sidebar navigation uses NavLink-based buttons for route navigation */}
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/explorer" replace />}
            />
            <Route
              path="/explorer"
              element={
                <MainLayout title="Liquor & Mixer Explorer">
                  <Explorer />
                </MainLayout>
              }
            />
            <Route
              path="/generator"
              element={
                <MainLayout title="Cocktail Generator">
                  <CocktailGenerator />
                </MainLayout>
              }
            />
            <Route
              path="/search"
              element={
                <MainLayout title="Smart Search">
                  <Search />
                </MainLayout>
              }
            />
            <Route
              path="/favorites"
              element={
                <MainLayout title="Favorites & Shopping List">
                  <Favorites />
                </MainLayout>
              }
            />
            <Route
              path="/trending"
              element={
                <MainLayout title="Trending & Seasonal Mixes">
                  <Trending />
                </MainLayout>
              }
            />
            <Route
              path="/pairings"
              element={
                <MainLayout title="Liquor Pairings">
                  <Pairings />
                </MainLayout>
              }
            />
            <Route
              path="/shopping-list"
              element={
                <MainLayout title="Shopping List">
                  <ShoppingList />
                </MainLayout>
              }
            />
            <Route
              path="/ai-bartender"
              element={
                <MainLayout title="AI Bartender">
                  <AIBartender />
                </MainLayout>
              }
            />
            {/* Unknown routes redir to main */}
            <Route path="*" element={<Navigate to="/explorer" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;