import React, { useState } from 'react';
import styled from 'styled-components';
import { useCocktailContext } from '../context/CocktailContext';
import CocktailCard from '../components/CocktailCard';

const CocktailGenerator = () => {
  const { liquorTypes, cocktails } = useCocktailContext();
  const [selectedLiquor, setSelectedLiquor] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [generatedCocktails, setGeneratedCocktails] = useState([]);
  
  // Filter categories
  const filterCategories = ['Refreshing', 'Strong', 'Sweet', 'Classic', 'Tart', 'Creamy'];
  
  // Toggle filter selection
  const toggleFilter = (filter) => {
    setSelectedFilters(prevFilters => 
      prevFilters.includes(filter) 
        ? prevFilters.filter(f => f !== filter)
        : [...prevFilters, filter]
    );
  };
  
  // Generate cocktail recommendations
  const generateCocktails = () => {
    let filtered = [...cocktails];
    
    // Filter by selected liquor
    if (selectedLiquor) {
      filtered = filtered.filter(c => c.liquorType === selectedLiquor);
    }
    
    // Filter by selected categories
    if (selectedFilters.length > 0) {
      filtered = filtered.filter(c => 
        selectedFilters.includes(c.category) || 
        c.tags?.some(tag => selectedFilters.includes(tag))
      );
    }
    
    // If nothing matches, return a subset of all cocktails
    if (filtered.length === 0) {
      filtered = cocktails.slice(0, 4);
    }
    
    // Shuffle array to get random selection
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    // Get subset of first 6 items
    setGeneratedCocktails(shuffled.slice(0, 6));
  };
  
  return (
    <GeneratorContainer>
      <h1>Cocktail Generator</h1>
      <p className="generator-intro">
        Select your preferred liquor and flavor profiles to generate cocktail recommendations
      </p>
      
      <GeneratorPanel>
        <section className="selection-section">
          <h2>Select a Liquor</h2>
          <LiquorOptions>
            <LiquorOption 
              className={selectedLiquor === '' ? 'active' : ''} 
              onClick={() => setSelectedLiquor('')}
            >
              Any
            </LiquorOption>
            
            {liquorTypes.map(liquor => (
              <LiquorOption 
                key={liquor.id} 
                className={selectedLiquor === liquor.id ? 'active' : ''} 
                onClick={() => setSelectedLiquor(liquor.id)}
              >
                <span className="liquor-icon">{liquor.icon || '🍸'}</span>
                {liquor.name}
              </LiquorOption>
            ))}
          </LiquorOptions>
        </section>
        
        <section className="selection-section">
          <h2>Select Flavor Profiles</h2>
          <FilterOptions>
            {filterCategories.map(filter => (
              <FilterOption 
                key={filter} 
                className={selectedFilters.includes(filter) ? 'active' : ''}
                onClick={() => toggleFilter(filter)}
              >
                {filter}
              </FilterOption>
            ))}
          </FilterOptions>
        </section>
        
        <GenerateButton onClick={generateCocktails}>
          Generate Cocktails
        </GenerateButton>
      </GeneratorPanel>
      
      {generatedCocktails.length > 0 && (
        <ResultsSection>
          <h2>Your Cocktail Suggestions</h2>
          <ResultsGrid>
            {generatedCocktails.map(cocktail => (
              <CocktailCard key={cocktail.id} cocktail={cocktail} />
            ))}
          </ResultsGrid>
        </ResultsSection>
      )}
    </GeneratorContainer>
  );
};

// Styled Components
const GeneratorContainer = styled.div`
  padding: 20px;
  
  h1 {
    color: var(--kavia-orange);
    margin-bottom: 16px;
  }
  
  .generator-intro {
    color: var(--text-secondary);
    margin-bottom: 32px;
  }
`;

const GeneratorPanel = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 40px;
  
  .selection-section {
    margin-bottom: 24px;
    
    h2 {
      font-size: 1.2rem;
      margin-bottom: 16px;
      color: var(--text-color);
    }
  }
`;

const LiquorOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const LiquorOption = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 12px;
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
  
  &.active {
    background-color: var(--kavia-orange);
    color: white;
  }
  
  .liquor-icon {
    display: block;
    font-size: 1.5rem;
    margin-bottom: 8px;
  }
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const FilterOption = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
  
  &.active {
    background-color: var(--kavia-orange);
    color: white;
  }
`;

const GenerateButton = styled.button`
  background-color: var(--kavia-orange);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 14px 28px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 16px;
  
  &:hover {
    background-color: #FF8B4D;
  }
`;

const ResultsSection = styled.section`
  margin-top: 40px;
  
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

export default CocktailGenerator;
