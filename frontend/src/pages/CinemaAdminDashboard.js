import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  background-color: #0f0f1e;
  min-height: calc(100vh - 200px);
  color: white;
  padding: 2rem;
`;

const CinemaAdminDashboard = () => {
  return (
    <DashboardContainer>
      <h1>Управление кинотеатром</h1>
      {/* Здесь будет контент */}
    </DashboardContainer>
  );
};

export default CinemaAdminDashboard; 