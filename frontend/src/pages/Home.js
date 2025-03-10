import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MovieCard from '../components/MovieCard';
import { fadeIn, slideUp } from '../styles/animations';
import { PageContainer, Section, PageTitle, Grid } from '../styles/layout';

const HeroSection = styled(Section)`
  text-align: center;
  padding: 4rem 0;
  animation: ${fadeIn} 0.5s ease-out;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  color: white;
  margin-bottom: 1.5rem;
  
  span {
    color: #ff4c29;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  max-width: 600px;
  margin: 0 auto;
`;

const FeaturedMovies = styled(Section)`
  animation: ${slideUp} 0.5s ease-out;
`;

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [comingSoon, setComingSoon] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Получение фильмов, которые сейчас в прокате
        const nowPlayingRes = await axios.get('/api/movies/now-playing');
        setNowPlaying(nowPlayingRes.data);
        
        // Получение фильмов, которые скоро выйдут
        const comingSoonRes = await axios.get('/api/movies/coming-soon');
        setComingSoon(comingSoonRes.data);
        
        setLoading(false);
      } catch (err) {
        console.error('Ошибка при загрузке фильмов:', err);
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, []);
  
  if (loading) {
    return <div>Загрузка...</div>;
  }
  
  return (
    <PageContainer>
      <HeroSection>
        <HeroTitle>
          Добро пожаловать в <span>VKino</span>
        </HeroTitle>
        <HeroSubtitle>
          Лучшие фильмы и незабываемые впечатления ждут вас
        </HeroSubtitle>
      </HeroSection>

      <FeaturedMovies>
        <PageTitle>Сейчас в кино</PageTitle>
        <Grid>
          {nowPlaying.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </Grid>
      </FeaturedMovies>

      <section>
        <PageTitle>Скоро в кино</PageTitle>
        <Grid>
          {comingSoon.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </Grid>
      </section>
    </PageContainer>
  );
};

export default Home; 