import React from 'react';
import styled from 'styled-components';

const CinemasContainer = styled.div`
  background-color: #0f0f1e;
  min-height: calc(100vh - 200px);
  color: white;
  padding: 2rem;
`;

const CinemasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Cinemas = () => {
  return (
    <CinemasContainer>
      <h1>Кинотеатры</h1>
      <CinemasGrid>
        {/* Здесь будет список кинотеатров */}
      </CinemasGrid>
    </CinemasContainer>
  );
};

export default Cinemas; 