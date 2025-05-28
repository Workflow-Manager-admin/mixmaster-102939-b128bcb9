import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useCocktailContext } from '../context/CocktailContext';
import CocktailCard from '../components/CocktailCard';

const LiquorExplorer = () => {
  const { liquorTypes, cocktails } = useCocktailContext();
  const [selectedLiquor, setSelectedLiquor] = useState(null);
  
  // Filter cocktails by selected liquor
  const filteredCocktails = selectedLiquor
    ? cocktails.filter(cocktail => cocktail.liquorType === selectedLiquor.id)
    : [];
  
  return (
    <ExplorerContainer>
      <h1>Explore Liquors</h1>
      
      <div className="explorer-grid">
        <LiquorList>
          {liquorTypes.map(liquor => (
            <LiquorItem 
              key={liquor.id} 
              className={selectedLiquor && selectedLiquor.id === liquor.id ? 'active' : ''}
              onClick={() => setSelectedLiquor(liquor)}
            >
              <div className="liquor-icon">{liquor.icon || '🍸'}</div>
              <h3>{liquor.name}</h3>
            </LiquorItem>
          ))}
        </LiquorList>
        
        <LiquorDetail>
          {selectedLiquor ? (
            <>
              <LiquorHeader>
                <div className="liquor-icon-large">{selectedLiquor.icon || '🍸'}</div>
                <div>
                  <h2>{selectedLiquor.name}</h2>
                  <p className="liquor-tagline">{selectedLiquor.tagline}</p>
                </div>
              </LiquorHeader>
              
              <LiquorDescription>
                <p>{selectedLiquor.description}</p>
              </LiquorDescription>
              
              <RecommendedSection>
                <h3>Recommended Mixers</h3>
                <ul className="mixers-list">
                  {selectedLiquor.recommendedMixers?.map((mixer, index) => (
                    <li key={index}>{mixer}</li>
                  ))}
                </ul>
              </RecommendedSection>
              
              <RecommendedSection>
                <h3>Popular Cocktails with {selectedLiquor.name}</h3>
                <div className="cocktails-grid">
                  {filteredCocktails.slice(0, 4).map(cocktail => (
                    <CocktailCard key={cocktail.id} cocktail={cocktail} />
                  ))}
                </div>
                {filteredCocktails.length > 4 && (
                  <ViewMoreLink to={`/cocktails?liquor=${selectedLiquor.id}`}>
                    View all {filteredCocktails.length} cocktails
                  </ViewMoreLink>
                )}
              </RecommendedSection>
              
              <RecommendedSection>
                <h3>Food Pairings</h3>
                <ul className="food-pairings">
                  {selectedLiquor.foodPairings?.map((pairing, index) => (
                    <li key={index}>{pairing}</li>
                  ))}
                </ul>
              </RecommendedSection>
            </>
          ) : (
            <LiquorPlaceholder>
              <div className="placeholder-icon">🥃</div>
              <h3>Select a liquor to view details</h3>
              <p>Explore different types of liquors, their characteristics, and recommended cocktails</p>
            </LiquorPlaceholder>
          )}
        </LiquorDetail>
      </div>
    </ExplorerContainer>
  );
};

// Styled Components
const ExplorerContainer = styled.div`
  padding: 20px;
  
  h1 {
    margin-bottom: 32px;
    color: var(--kavia-orange);
  }
  
  .explorer-grid {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 30px;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
`;

const LiquorList = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 16px;
`;

const LiquorItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 8px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &.active {
    background-color: var(--kavia-orange);
    color: white;
  }
  
  .liquor-icon {
    font-size: 1.5rem;
    margin-right: 12px;
  }
  
  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
  }
`;

const LiquorDetail = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 24px;
`;

const LiquorHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  
  .liquor-icon-large {
    font-size: 3rem;
    margin-right: 20px;
  }
  
  h2 {
    margin: 0 0 8px 0;
    font-size: 1.8rem;
    color: var(--kavia-orange);
  }
  
  .liquor-tagline {
    margin: 0;
    color: var(--text-secondary);
  }
`;

const LiquorDescription = styled.div`
  margin-bottom: 32px;
  line-height: 1.6;
`;

const RecommendedSection = styled.section`
  margin-bottom: 32px;
  
  h3 {
    color: var(--text-color);
    margin-bottom: 16px;
    font-size: 1.2rem;
  }
  
  .mixers-list, .food-pairings {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    list-style-type: none;
    padding: 0;
    
    li {
      background-color: rgba(255, 255, 255, 0.1);
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 0.9rem;
    }
  }
  
  .cocktails-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
`;

const ViewMoreLink = styled(Link)`
  display: inline-block;
  margin-top: 16px;
  color: var(--kavia-orange);
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LiquorPlaceholder = styled.div`
  text-align: center;
  padding: 40px 20px;
  
  .placeholder-icon {
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

export default LiquorExplorer;
