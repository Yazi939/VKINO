import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fadeIn, pulse } from '../styles/animations';

const Card = styled.div`
  background-color: #16213e;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.5s ease-out;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  aspect-ratio: 2/3;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
  }
`;

const PosterContainer = styled.div`
  position: relative;
  padding-top: 150%;
  overflow: hidden;
`;

const Poster = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Content = styled.div`
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem;
  color: white;
  font-size: 1.1rem;
  line-height: 1.4;
`;

const Genre = styled.p`
  color: #ff4c29;
  margin: 0 0 0.5rem;
  font-size: 0.85rem;
`;

const Duration = styled.p`
  color: #ccc;
  margin: 0;
  font-size: 0.85rem;
`;

const Button = styled(Link)`
  display: block;
  background-color: #ff4c29;
  color: white;
  text-align: center;
  padding: 0.5rem;
  margin-top: 0.75rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: bold;
  
  &:hover {
    background-color: #e63e00;
  }
`;

const Rating = styled.div`
  svg {
    animation: ${pulse} 2s infinite;
  }
`;

const MovieCard = ({ movie }) => {
  return (
    <Card>
      <PosterContainer>
        <Poster src={movie.poster || 'https://via.placeholder.com/300x450?text=Нет+постера'} alt={movie.title} />
      </PosterContainer>
      <Content>
        <Title>{movie.title}</Title>
        <Genre>{movie.genre.join(', ')}</Genre>
        <Duration>{movie.duration} мин.</Duration>
        <Button to={`/movies/${movie._id}`}>Подробнее</Button>
      </Content>
    </Card>
  );
};

export default MovieCard; 