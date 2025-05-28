import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useFavoritesContext } from '../context/FavoritesContext';
import CocktailCard from '../components/CocktailCard';

const Favorites = () => {
  const { favorites } = useFavoritesContext();
  
  return (
    <FavoritesContainer>
      <h1>Your Favorites</h1>
      
      {favorites.length > 0 ? (
        <>
          <p className="favorites-count">
            You have {favorites.length} favorite cocktail{favorites.length !== 1 ? 's' : ''}
          </p>
          
          <FavoritesGrid>
            {favorites.map(cocktail => (
              <CocktailCard key={cocktail.id} cocktail={cocktail} showRemoveButton={true} />
            ))}
          </FavoritesGrid>
        </>
      ) : (
        <EmptyState>
          <div className="empty-icon">❤️</div>
          <h3>No favorites yet</h3>
          <p>
            Save your favorite cocktails for quick access.
            <br />
            Explore cocktails and click the heart icon to add them to favorites.
          </p>
          <Link to="/cocktails" className="primary-btn">
            Explore Cocktails
          </Link>
        </EmptyState>
      )}
    </FavoritesContainer>
  );
};

// Styled Components
const FavoritesContainer = styled.div`
  padding: 20px;
  
  h1 {
    color: var(--kavia-orange);
    margin-bottom: 16px;
  }
  
  .favorites-count {
    color: var(--text-secondary);
    margin-bottom: 32px;
  }
`;

const FavoritesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  
  .empty-icon {
    font-size: 3rem;
    margin-bottom: 20px;
  }
  
  h3 {
    margin-bottom: 12px;
    color: var(--text-color);
  }
  
  p {
    color: var(--text-secondary);
    max-width: 400px;
    margin: 0 auto 32px;
  }
  
  .primary-btn {
    display: inline-block;
    background-color: var(--kavia-orange);
    color: white;
    padding: 12px 24px;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
    transition: background-color 0.3s ease;
    
    &:hover {
      background-color: #FF8B4D;
    }
  }
`;

export default Favorites;
