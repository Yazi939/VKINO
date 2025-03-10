import React from 'react';
import styled from 'styled-components';

const CinemaDetailsContainer = styled.div`
  background-color: #0f0f1e;
  min-height: calc(100vh - 200px);
  color: white;
  padding: 2rem;
`;

const CinemaDetails = () => {
  return (
    <CinemaDetailsContainer>
      <h1>Детали кинотеатра</h1>
      {/* Здесь будет контент */}
    </CinemaDetailsContainer>
  );
};

export default CinemaDetails; 