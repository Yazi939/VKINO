import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { FaStar, FaClock, FaCalendarAlt, FaTicketAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const MovieDetailsContainer = styled.div`
  background-color: #0f0f1e;
  min-height: calc(100vh - 200px);
  color: white;
`;

const MovieHero = styled.div`
  position: relative;
  height: 500px;
  background-image: ${props => props.backdrop ? `url(${props.backdrop})` : 'none'};
  background-size: cover;
  background-position: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(15, 15, 30, 0.5), #0f0f1e);
  }
`;

const MovieContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  margin-top: -200px;
`;

const MovieHeader = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PosterContainer = styled.div`
  flex-shrink: 0;
  width: 300px;
  height: 450px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    width: 200px;
    height: 300px;
    margin: 0 auto;
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MovieInfo = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Metadata = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ccc;
  
  svg {
    color: #ff4c29;
  }
`;

const GenreList = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const Genre = styled.span`
  background-color: #ff4c29;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const Description = styled.p`
  line-height: 1.8;
  margin-bottom: 2rem;
  color: #ccc;
`;

const TrailerButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #ff4c29;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #e63e00;
  }
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #ff4c29;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.5rem;
    width: 50px;
    height: 2px;
    background-color: #ff4c29;
  }
`;

const CastList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.5rem;
`;

const CastMember = styled.div`
  background-color: #16213e;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CastImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CastInfo = styled.div`
  padding: 1rem;
`;

const CastName = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.3rem;
`;

const CastRole = styled.p`
  font-size: 0.9rem;
  color: #ccc;
`;

const ScreeningsSection = styled.section`
  margin-bottom: 3rem;
`;

const DateSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #16213e;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ff4c29;
    border-radius: 10px;
  }
`;

const DateButton = styled.button`
  background-color: ${props => props.active ? '#ff4c29' : '#16213e'};
  color: white;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  white-space: nowrap;
  
  &:hover {
    background-color: ${props => props.active ? '#e63e00' : '#1f2b4d'};
  }
`;

const CinemaList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Cinema = styled.div`
  background-color: #16213e;
  border-radius: 8px;
  padding: 1.5rem;
`;

const CinemaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const CinemaName = styled.h3`
  font-size: 1.3rem;
`;

const CinemaAddress = styled.p`
  color: #ccc;
  font-size: 0.9rem;
`;

const ScreeningsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
`;

const ScreeningCard = styled(Link)`
  background-color: #1a1a2e;
  border: 1px solid #333;
  border-radius: 4px;
  padding: 1rem;
  text-align: center;
  text-decoration: none;
  color: white;
  transition: all 0.3s;
  
  &:hover {
    background-color: #ff4c29;
    border-color: #ff4c29;
    transform: translateY(-3px);
  }
`;

const ScreeningTime = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const ScreeningPrice = styled.div`
  font-size: 0.9rem;
  color: #ccc;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  font-size: 1.5rem;
  color: #ccc;
`;

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('ru-RU', options);
};

const formatTime = (dateString) => {
  const options = { hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleTimeString('ru-RU', options);
};

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [screenings, setScreenings] = useState([]);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`/api/movies/${id}`);
        setMovie(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Ошибка при загрузке фильма:', err);
        toast.error('Не удалось загрузить информацию о фильме');
        setLoading(false);
      }
    };
    
    fetchMovie();
  }, [id]);
  
  useEffect(() => {
    const fetchScreenings = async () => {
      try {
        const res = await axios.get(`/api/screenings/movie/${id}`);
        setScreenings(res.data);
        
        // Получение уникальных дат сеансов
        const uniqueDates = [...new Set(res.data.map(screening => 
          new Date(screening.startTime).toISOString().split('T')[0]
        ))].sort();
        
        setDates(uniqueDates);
        
        // Установка текущей даты как выбранной, если она есть в списке дат
        const today = new Date().toISOString().split('T')[0];
        if (uniqueDates.includes(today)) {
          setSelectedDate(today);
        } else if (uniqueDates.length > 0) {
          setSelectedDate(uniqueDates[0]);
        }
      } catch (err) {
        console.error('Ошибка при загрузке сеансов:', err);
        toast.error('Не удалось загрузить информацию о сеансах');
      }
    };
    
    if (movie) {
      fetchScreenings();
    }
  }, [id, movie]);
  
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  
  // Фильтрация сеансов по выбранной дате и группировка по кинотеатрам
  const filteredScreenings = screenings.filter(screening => 
    new Date(screening.startTime).toISOString().split('T')[0] === selectedDate
  );
  
  const screeningsByCinema = filteredScreenings.reduce((acc, screening) => {
    if (!acc[screening.cinema._id]) {
      acc[screening.cinema._id] = {
        cinema: screening.cinema,
        screenings: []
      };
    }
    
    acc[screening.cinema._id].screenings.push(screening);
    return acc;
  }, {});
  
  if (loading) {
    return (
      <MovieDetailsContainer>
        <LoadingContainer>Загрузка...</LoadingContainer>
      </MovieDetailsContainer>
    );
  }
  
  if (!movie) {
    return (
      <MovieDetailsContainer>
        <LoadingContainer>Фильм не найден</LoadingContainer>
      </MovieDetailsContainer>
    );
  }
  
  return (
    <MovieDetailsContainer>
      <MovieHero backdrop={movie.backdrop || movie.poster}>
        {/* Фоновое изображение */}
      </MovieHero>
      
      <MovieContent>
        <MovieHeader>
          <PosterContainer>
            <Poster src={movie.poster || 'https://via.placeholder.com/300x450?text=Нет+постера'} alt={movie.title} />
          </PosterContainer>
          
          <MovieInfo>
            <Title>{movie.title}</Title>
            
            <Metadata>
              <MetaItem>
                <FaStar />
                {movie.rating ? `${movie.rating.toFixed(1)}/10` : 'Нет рейтинга'}
              </MetaItem>
              
              <MetaItem>
                <FaClock />
                {movie.duration} мин.
              </MetaItem>
              
              <MetaItem>
                <FaCalendarAlt />
                {formatDate(movie.releaseDate)}
              </MetaItem>
            </Metadata>
            
            <GenreList>
              {movie.genre.map((genre, index) => (
                <Genre key={index}>{genre}</Genre>
              ))}
            </GenreList>
            
            <Description>{movie.description}</Description>
            
            {movie.trailer && (
              <TrailerButton href={movie.trailer} target="_blank" rel="noopener noreferrer">
                Смотреть трейлер
              </TrailerButton>
            )}
          </MovieInfo>
        </MovieHeader>
        
        <Section>
          <SectionTitle>О фильме</SectionTitle>
          
          <div>
            {movie.director && (
              <p><strong>Режиссер:</strong> {movie.director}</p>
            )}
            
            {movie.actors && movie.actors.length > 0 && (
              <p><strong>В ролях:</strong> {movie.actors.join(', ')}</p>
            )}
          </div>
        </Section>
        
        <ScreeningsSection>
          <SectionTitle>Расписание сеансов</SectionTitle>
          
          {dates.length > 0 ? (
            <>
              <DateSelector>
                {dates.map(date => (
                  <DateButton 
                    key={date} 
                    active={date === selectedDate}
                    onClick={() => handleDateSelect(date)}
                  >
                    {formatDate(date)}
                  </DateButton>
                ))}
              </DateSelector>
              
              <CinemaList>
                {Object.values(screeningsByCinema).map(({ cinema, screenings }) => (
                  <Cinema key={cinema._id}>
                    <CinemaHeader>
                      <CinemaName>{cinema.name}</CinemaName>
                      <CinemaAddress>{cinema.address}</CinemaAddress>
                    </CinemaHeader>
                    
                    <ScreeningsList>
                      {screenings
                        .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
                        .map(screening => (
                          <ScreeningCard key={screening._id} to={`/booking/${screening._id}`}>
                            <ScreeningTime>{formatTime(screening.startTime)}</ScreeningTime>
                            <ScreeningPrice>от {screening.price.standard} ₽</ScreeningPrice>
                          </ScreeningCard>
                        ))
                      }
                    </ScreeningsList>
                  </Cinema>
                ))}
              </CinemaList>
            </>
          ) : (
            <p>Нет доступных сеансов для этого фильма</p>
          )}
        </ScreeningsSection>
      </MovieContent>
    </MovieDetailsContainer>
  );
};

export default MovieDetails; 