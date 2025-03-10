import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaFilm } from 'react-icons/fa';

const NotFoundContainer = styled.div`
  background-color: #0f0f1e;
  min-height: calc(100vh - 200px);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const NotFoundContent = styled.div`
  text-align: center;
  max-width: 600px;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  margin: 0;
  color: #ff4c29;
  line-height: 1;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 2rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${props => props.secondary ? '#1f2b4d' : '#ff4c29'};
  color: white;
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${props => props.secondary ? '#2a3a68' : '#e63e00'};
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundContent>
        <ErrorCode>404</ErrorCode>
        <Title>Страница не найдена</Title>
        <Description>
          Извините, запрашиваемая страница не существует или была перемещена.
        </Description>
        <ButtonsContainer>
          <Button to="/">
            <FaHome />
            На главную
          </Button>
          <Button to="/movies" secondary>
            <FaFilm />
            К фильмам
          </Button>
        </ButtonsContainer>
      </NotFoundContent>
    </NotFoundContainer>
  );
};

export default NotFound; 