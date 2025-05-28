import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useCocktailContext } from '../context/CocktailContext';
import CocktailCard from '../components/CocktailCard';

const Home = () => {
  const { cocktails, loading, error } = useCocktailContext();
  
  // Get a few featured cocktails
  const featuredCocktails = cocktails.slice(0, 4);
  
  // Get seasonal cocktails (these would be filtered in a real app)
  const summerCocktails = cocktails
    .filter(cocktail => cocktail.category === 'Refreshing' || cocktail.category === 'Summer')
    .slice(0, 4);
  
  const winterCocktails = cocktails
    .filter(cocktail => cocktail.category === 'Classic' || cocktail.category === 'Winter')
    .slice(0, 4);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <HomeContainer>
      <HeroSection>
        <h1>MixMaster</h1>
        <p>Your smart cocktail and liquor companion</p>
        <div className="cta-buttons">
          <Link to="/cocktails" className="primary-btn">Discover Cocktails</Link>
          <Link to="/liquors" className="secondary-btn">Explore Liquors</Link>
        </div>
      </HeroSection>
      
      <Section>
        <SectionHeader>
          <h2>Featured Cocktails</h2>
          <Link to="/cocktails" className="view-all">View All</Link>
        </SectionHeader>
        <CardGrid>
          {featuredCocktails.map(cocktail => (
            <CocktailCard key={cocktail.id} cocktail={cocktail} />
          ))}
        </CardGrid>
      </Section>
      
      <Section>
        <SectionHeader>
          <h2>Summer Vibes</h2>
          <Link to="/trending" className="view-all">View All</Link>
        </SectionHeader>
        <CardGrid>
          {summerCocktails.map(cocktail => (
            <CocktailCard key={cocktail.id} cocktail={cocktail} />
          ))}
        </CardGrid>
      </Section>
      
      <Section>
        <SectionHeader>
          <h2>Winter Warmers</h2>
          <Link to="/trending" className="view-all">View All</Link>
        </SectionHeader>
        <CardGrid>
          {winterCocktails.map(cocktail => (
            <CocktailCard key={cocktail.id} cocktail={cocktail} />
          ))}
        </CardGrid>
      </Section>
      
      <FeatureSection>
        <div className="feature-text">
          <h2>AI Bartender</h2>
          <p>Ask what cocktails you can make with available ingredients</p>
          <Link to="/ai-bartender" className="primary-btn">Try AI Bartender</Link>
        </div>
        <div className="feature-image">
          {/* Placeholder for an image */}
          <div className="ai-image-placeholder"></div>
        </div>
      </FeatureSection>
    </HomeContainer>
  );
};

// Styled Components
const HomeContainer = styled.div`
  padding: 20px;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 60px 20px;
  background-color: var(--kavia-dark);
  color: var(--text-color);
  margin-bottom: 40px;
  
  h1 {
    font-size: 3rem;
    margin-bottom: 16px;
    color: var(--kavia-orange);
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 32px;
    color: var(--text-secondary);
  }
  
  .cta-buttons {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }
  
  .primary-btn, .secondary-btn {
    display: inline-block;
    padding: 12px 24px;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
  }
  
  .primary-btn {
    background-color: var(--kavia-orange);
    color: white;
    
    &:hover {
      background-color: #FF8B4D;
    }
  }
  
  .secondary-btn {
    background-color: transparent;
    color: var(--text-color);
    border: 1px solid var(--border-color);
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  
  h2 {
    font-size: 1.5rem;
    color: var(--text-color);
    margin: 0;
  }
  
  .view-all {
    color: var(--kavia-orange);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
`;

const FeatureSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  margin: 60px 0;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  
  .feature-text {
    h2 {
      font-size: 2rem;
      margin-bottom: 16px;
      color: var(--kavia-orange);
    }
    
    p {
      margin-bottom: 24px;
      font-size: 1.1rem;
      color: var(--text-secondary);
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
  }
  
  .ai-image-placeholder {
    width: 100%;
    height: 300px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
  }
`;

export default Home;
