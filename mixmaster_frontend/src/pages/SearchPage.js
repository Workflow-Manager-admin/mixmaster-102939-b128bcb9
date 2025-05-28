import React, { useState } from 'react';
import styled from 'styled-components';
import { useCocktailContext } from '../context/CocktailContext';
import SearchBar from '../components/SearchBar';
import CocktailCard from '../components/CocktailCard';

const SearchPage = () => {
  const { cocktails, liquorTypes } = useCocktailContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    setHasSearched(true);
    
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    // Search in cocktails
    const filteredCocktails = cocktails.filter(cocktail => {
      const nameMatch = cocktail.name.toLowerCase().includes(query.toLowerCase());
      const ingredientMatch = cocktail.ingredients?.some(
        ing => ing.name.toLowerCase().includes(query.toLowerCase())
      );
      const liquorMatch = liquorTypes.find(
        l => l.id === cocktail.liquorType && l.name.toLowerCase().includes(query.toLowerCase())
      );
      
      return nameMatch || ingredientMatch || liquorMatch;
    });
    
    setSearchResults(filteredCocktails);
  };
  
  return (
    <SearchPageContainer>
      <h1>Search</h1>
      <p className="search-intro">
        Search for cocktails by name, ingredients, or liquor type
      </p>
      
      <SearchBarWrapper>
        <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
      </SearchBarWrapper>
      
      <ResultsContainer>
        {hasSearched && searchResults.length === 0 ? (
          <NoResults>
            <div className="no-results-icon">🔍</div>
            <h3>No results found</h3>
            <p>
              We couldn't find any cocktails matching "{searchQuery}".
              <br />
              Try checking your spelling or using different keywords.
            </p>
          </NoResults>
        ) : (
          <>
            {searchResults.length > 0 && (
              <>
                <h2>Search Results ({searchResults.length})</h2>
                <ResultsGrid>
                  {searchResults.map(cocktail => (
                    <CocktailCard key={cocktail.id} cocktail={cocktail} />
                  ))}
                </ResultsGrid>
              </>
            )}
            
            {!hasSearched && (
              <SearchPrompt>
                <div className="prompt-icon">🔍</div>
                <h3>Search for your favorite cocktails</h3>
                <p>
                  Looking for something specific? Search by name, ingredient, or liquor type
                  to find the perfect cocktail for your taste.
                </p>
                <div className="popular-searches">
                  <span className="label">Popular searches:</span>
                  <div className="search-tags">
                    <button onClick={() => handleSearch('Margarita')}>Margarita</button>
                    <button onClick={() => handleSearch('Gin')}>Gin</button>
                    <button onClick={() => handleSearch('Lemon')}>Lemon</button>
                    <button onClick={() => handleSearch('Vodka')}>Vodka</button>
                  </div>
                </div>
              </SearchPrompt>
            )}
          </>
        )}
      </ResultsContainer>
    </SearchPageContainer>
  );
};

// Styled Components
const SearchPageContainer = styled.div`
  padding: 20px;
  
  h1 {
    color: var(--kavia-orange);
    margin-bottom: 16px;
  }
  
  .search-intro {
    color: var(--text-secondary);
    margin-bottom: 32px;
  }
`;

const SearchBarWrapper = styled.div`
  margin-bottom: 32px;
`;

const ResultsContainer = styled.div`
  min-height: 300px;
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 24px;
    color: var(--text-color);
  }
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 60px 20px;
  
  .no-results-icon {
    font-size: 3rem;
    margin-bottom: 20px;
    opacity: 0.7;
  }
  
  h3 {
    margin-bottom: 12px;
    color: var(--text-color);
  }
  
  p {
    color: var(--text-secondary);
    max-width: 400px;
    margin: 0 auto;
  }
`;

const SearchPrompt = styled.div`
  text-align: center;
  padding: 40px 20px;
  
  .prompt-icon {
    font-size: 2.5rem;
    margin-bottom: 20px;
    opacity: 0.7;
  }
  
  h3 {
    margin-bottom: 12px;
    color: var(--text-color);
  }
  
  p {
    color: var(--text-secondary);
    max-width: 500px;
    margin: 0 auto 24px;
  }
  
  .popular-searches {
    margin-top: 24px;
    
    .label {
      display: block;
      margin-bottom: 12px;
      color: var(--text-secondary);
    }
    
    .search-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
      
      button {
        background-color: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 20px;
        padding: 8px 16px;
        color: var(--text-color);
        cursor: pointer;
        transition: background-color 0.2s ease;
        
        &:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
      }
    }
  }
`;

export default SearchPage;
