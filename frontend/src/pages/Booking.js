import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { FaChair, FaTicketAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const BookingContainer = styled.div`
  background-color: #0f0f1e;
  min-height: calc(100vh - 200px);
  color: white;
  padding: 2rem;
`;

const BookingContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const BookingHeader = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const MovieInfo = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PosterContainer = styled.div`
  width: 180px;
  height: 270px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    width: 120px;
    height: 180px;
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoDetails = styled.div`
  flex: 1;
`;

const MovieTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #ccc;
  
  svg {
    color: #ff4c29;
  }
`;

const BookingGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const SeatsContainer = styled.div`
  background-color: #16213e;
  border-radius: 8px;
  padding: 2rem;
`;

const Screen = styled.div`
  height: 10px;
  background: linear-gradient(to bottom, #ff4c29, transparent);
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  margin-bottom: 3rem;
  position: relative;
  
  &::before {
    content: 'Экран';
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    color: #ccc;
    font-size: 0.9rem;
  }
`;

const SeatsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const RowNumber = styled.div`
  width: 30px;
  text-align: center;
  font-size: 0.9rem;
  color: #ccc;
`;

const Seat = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: ${props => props.type === 0 ? 'not-allowed' : 'pointer'};
  background-color: ${props => {
    if (props.selected) return '#ff4c29';
    if (props.type === 0) return '#333';
    if (props.type === 2) return '#1f2b4d';
    return '#16213e';
  }};
  border: 1px solid ${props => {
    if (props.selected) return '#ff4c29';
    if (props.type === 0) return '#333';
    if (props.type === 2) return '#3a4d8c';
    return '#1a1a2e';
  }};
  color: ${props => props.selected ? 'white' : '#ccc'};
  transition: all 0.2s;
  
  &:hover {
    transform: ${props => props.type === 0 ? 'none' : 'scale(1.1)'};
  }
`;

const Legend = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #ccc;
`;

const LegendBox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: ${props => props.color};
  border: 1px solid ${props => props.border || props.color};
`;

const OrderSummary = styled.div`
  background-color: #16213e;
  border-radius: 8px;
  padding: 1.5rem;
  position: sticky;
  top: 2rem;
`;

const SummaryTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #333;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  &:last-of-type {
    margin-bottom: 2rem;
  }
`;

const SummaryLabel = styled.span`
  color: #ccc;
`;

const SummaryValue = styled.span`
  font-weight: bold;
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-top: 1px solid #333;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  
  span:last-child {
    color: #ff4c29;
    font-weight: bold;
  }
`;

const BookButton = styled.button`
  width: 100%;
  background-color: #ff4c29;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #e63e00;
  }
  
  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
`;

const SelectedSeatsList = styled.div`
  margin-bottom: 1.5rem;
`;

const SelectedSeat = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  
  span:first-child {
    color: #ccc;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 1.2rem;
  color: #ccc;
`;

const Booking = () => {
  const { screeningId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AuthContext);
  
  const [screening, setScreening] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Форматирование даты
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };
  
  // Форматирование времени
  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString('ru-RU', options);
  };
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Для бронирования билетов необходимо войти в аккаунт');
      navigate('/login');
      return;
    }
    
    const fetchScreening = async () => {
      try {
        const res = await axios.get(`/api/screenings/${screeningId}`);
        setScreening(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Ошибка при загрузке сеанса:', err);
        toast.error('Не удалось загрузить информацию о сеансе');
        setLoading(false);
      }
    };
    
    fetchScreening();
  }, [screeningId, isAuthenticated, navigate]);
  
  const handleSeatClick = (row, seat, type) => {
    // Проверка, доступно ли место
    if (type === 0) return;
    
    const seatIndex = selectedSeats.findIndex(
      s => s.row === row && s.seat === seat
    );
    
    if (seatIndex === -1) {
      // Добавление места
      setSelectedSeats([...selectedSeats, { row, seat, type }]);
    } else {
      // Удаление места
      setSelectedSeats(selectedSeats.filter((_, index) => index !== seatIndex));
    }
  };
  
  const calculateTotalPrice = () => {
    if (!screening) return 0;
    
    return selectedSeats.reduce((total, seat) => {
      return total + (seat.type === 2 ? screening.price.vip : screening.price.standard);
    }, 0);
  };
  
  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      toast.error('Выберите хотя бы одно место');
      return;
    }
    
    try {
      const res = await axios.post('/api/tickets', {
        user: user.id,
        screening: screeningId,
        seats: selectedSeats.map(seat => ({
          row: seat.row,
          seat: seat.seat,
          type: seat.type === 2 ? 'vip' : 'standard'
        })),
        totalPrice: calculateTotalPrice()
      });
      
      toast.success('Билеты успешно забронированы!');
      navigate(`/tickets/${res.data._id}`);
    } catch (err) {
      console.error('Ошибка при бронировании билетов:', err);
      toast.error(err.response?.data?.message || 'Ошибка при бронировании билетов');
    }
  };
  
  if (loading) {
    return (
      <BookingContainer>
        <LoadingContainer>Загрузка...</LoadingContainer>
      </BookingContainer>
    );
  }
  
  if (!screening) {
    return (
      <BookingContainer>
        <LoadingContainer>Сеанс не найден</LoadingContainer>
      </BookingContainer>
    );
  }
  
  return (
    <BookingContainer>
      <BookingContent>
        <BookingHeader>
          <Title>Бронирование билетов</Title>
          
          <MovieInfo>
            <PosterContainer>
              <Poster 
                src={screening.movie.poster || 'https://via.placeholder.com/300x450?text=Нет+постера'} 
                alt={screening.movie.title} 
              />
            </PosterContainer>
            
            <InfoDetails>
              <MovieTitle>{screening.movie.title}</MovieTitle>
              
              <InfoItem>
                <FaClock />
                {formatDate(screening.startTime)}, {formatTime(screening.startTime)}
              </InfoItem>
              
              <InfoItem>
                <FaMapMarkerAlt />
                {screening.cinema.name}, {screening.hall}
              </InfoItem>
              
              <InfoItem>
                <FaTicketAlt />
                Стандарт: {screening.price.standard} ₽, VIP: {screening.price.vip} ₽
              </InfoItem>
            </InfoDetails>
          </MovieInfo>
        </BookingHeader>
        
        <BookingGrid>
          <SeatsContainer>
            <Screen />
            
            <SeatsGrid>
              {screening.availableSeats.map((row, rowIndex) => (
                <Row key={rowIndex}>
                  <RowNumber>{rowIndex + 1}</RowNumber>
                  
                  {row.map((seat, seatIndex) => {
                    const isSelected = selectedSeats.some(
                      s => s.row === rowIndex && s.seat === seatIndex
                    );
                    
                    return (
                      <Seat 
                        key={seatIndex}
                        type={seat}
                        selected={isSelected}
                        onClick={() => handleSeatClick(rowIndex, seatIndex, seat)}
                      >
                        <FaChair />
                      </Seat>
                    );
                  })}
                </Row>
              ))}
            </SeatsGrid>
            
            <Legend>
              <LegendItem>
                <LegendBox color="#16213e" border="#1a1a2e" />
                <span>Стандарт</span>
              </LegendItem>
              
              <LegendItem>
                <LegendBox color="#1f2b4d" border="#3a4d8c" />
                <span>VIP</span>
              </LegendItem>
              
              <LegendItem>
                <LegendBox color="#ff4c29" />
                <span>Выбрано</span>
              </LegendItem>
              
              <LegendItem>
                <LegendBox color="#333" />
                <span>Занято</span>
              </LegendItem>
            </Legend>
          </SeatsContainer>
          
          <OrderSummary>
            <SummaryTitle>Ваш заказ</SummaryTitle>
            
            <SummaryItem>
              <SummaryLabel>Фильм:</SummaryLabel>
              <SummaryValue>{screening.movie.title}</SummaryValue>
            </SummaryItem>
            
            <SummaryItem>
              <SummaryLabel>Кинотеатр:</SummaryLabel>
              <SummaryValue>{screening.cinema.name}</SummaryValue>
            </SummaryItem>
            
            <SummaryItem>
              <SummaryLabel>Зал:</SummaryLabel>
              <SummaryValue>{screening.hall}</SummaryValue>
            </SummaryItem>
            
            <SummaryItem>
              <SummaryLabel>Дата и время:</SummaryLabel>
              <SummaryValue>
                {formatDate(screening.startTime)}, {formatTime(screening.startTime)}
              </SummaryValue>
            </SummaryItem>
            
            <SummaryItem>
              <SummaryLabel>Выбрано мест:</SummaryLabel>
              <SummaryValue>{selectedSeats.length}</SummaryValue>
            </SummaryItem>
            
            {selectedSeats.length > 0 && (
              <SelectedSeatsList>
                {selectedSeats.map((seat, index) => (
                  <SelectedSeat key={index}>
                    <span>
                      Ряд {seat.row + 1}, Место {seat.seat + 1} 
                      ({seat.type === 2 ? 'VIP' : 'Стандарт'})
                    </span>
                    <span>
                      {seat.type === 2 ? screening.price.vip : screening.price.standard} ₽
                    </span>
                  </SelectedSeat>
                ))}
              </SelectedSeatsList>
            )}
            
            <TotalPrice>
              <span>Итого:</span>
              <span>{calculateTotalPrice()} ₽</span>
            </TotalPrice>
            
            <BookButton 
              onClick={handleBooking}
              disabled={selectedSeats.length === 0}
            >
              Забронировать
            </BookButton>
          </OrderSummary>
        </BookingGrid>
      </BookingContent>
    </BookingContainer>
  );
};

export default Booking; 