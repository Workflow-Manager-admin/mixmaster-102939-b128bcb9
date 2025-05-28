import React from 'react';
import styled from 'styled-components';
import { useCocktailContext } from '../context/CocktailContext';
import CocktailCard from '../components/CocktailCard';

const TrendingMixes = () => {
  const { cocktails } = useCocktailContext();
  
  // In a real app, these would be fetched from a backend
  // Here we're simulating trending categories with static data
  
  // Function to get a random subset of cocktails with a specific tag
  const getRandomCocktailsByTag = (tag, count = 4) => {
    const filtered = cocktails.filter(c => c.tags?.includes(tag) || c.category === tag);
    // Shuffle array
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    // Get subset of count items
    return shuffled.slice(0, count);
  };
  
  // Simulate trending cocktails with rating
  const getTrendingCocktails = () => {
    return [...cocktails]
      .sort(() => 0.5 - Math.random()) // Shuffle 
      .slice(0, 6)
      .map(c => ({
        ...c,
        trendScore: Math.floor(Math.random() * 100) + 1 // Random score 1-100
      }))
      .sort((a, b) => b.trendScore - a.trendScore); // Sort by score
  };
  
  // Create our trending collections
  const trendingCocktails = getTrendingCocktails();
  const summerCocktails = getRandomCocktailsByTag('Summer', 6);
  const winterCocktails = getRandomCocktailsByTag('Winter', 6);
  const classicCocktails = getRandomCocktailsByTag('Classic', 6);
  
  return (
    <TrendingContainer>
      <h1>Trending & Seasonal Mixes</h1>
      <p className="trending-intro">
        Discover popular cocktails and seasonal favorites
      </p>
      
      <TrendingSection>
        <h2>Trending Now</h2>
        <TrendingList>
          {trendingCocktails.map(cocktail => (
            <TrendingItem key={cocktail.id}>
              <div className="trend-rank">#{cocktail.trendScore}</div>
              <CocktailCard cocktail={cocktail} />
            </TrendingItem>
          ))}
        </TrendingList>
      </TrendingSection>
      
      <CollectionSection>
        <CollectionHeader>
          <h2>Summer Vibes</h2>
          <div className="collection-icon">☀️</div>
        </CollectionHeader>
        <CocktailGrid>
          {summerCocktails.map(cocktail => (
            <CocktailCard key={cocktail.id} cocktail={cocktail} />
          ))}
        </CocktailGrid>
      </CollectionSection>
      
      <CollectionSection>
        <CollectionHeader>
          <h2>Winter Warmers</h2>
          <div className="collection-icon">❄️</div>
        </CollectionHeader>
        <CocktailGrid>
          {winterCocktails.map(cocktail => (
            <CocktailCard key={cocktail.id} cocktail={cocktail} />
          ))}
        </CocktailGrid>
      </CollectionSection>
      
      <CollectionSection>
        <CollectionHeader>
          <h2>Classic Cocktails</h2>
          <div className="collection-icon">🍸</div>
        </CollectionHeader>
        <CocktailGrid>
          {classicCocktails.map(cocktail => (
            <CocktailCard key={cocktail.id} cocktail={cocktail} />
          ))}
        </CocktailGrid>
      </CollectionSection>
    </TrendingContainer>
  );
};

// Styled Components
const TrendingContainer = styled.div`
  padding: 20px;
  
  h1 {
    color: var(--kavia-orange);
    margin-bottom: 16px;
  }
  
  .trending-intro {
    color: var(--text-secondary);
    margin-bottom: 32px;
  }
`;

const TrendingSection = styled.section`
  margin-bottom: 48px;
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 24px;
    color: var(--text-color);
  }
`;

const TrendingList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const TrendingItem = styled.div`
  position: relative;
  
  .trend-rank {
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: var(--kavia-orange);
    color: white;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    z-index: 1;
  }
`;

const CollectionSection = styled.section`
  margin-bottom: 48px;
  padding: 24px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`;

const CollectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  
  h2 {
    font-size: 1.5rem;
    color: var(--text-color);
    margin: 0;
  }
  
  .collection-icon {
    font-size: 1.8rem;
  }
`;

const CocktailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
`;

export default TrendingMixes;
