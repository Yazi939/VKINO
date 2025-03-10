import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { FaTicketAlt, FaClock, FaMapMarkerAlt, FaChair, FaDownload, FaPrint } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import QRCode from 'react-qr-code';

const TicketContainer = styled.div`
  background-color: #0f0f1e;
  min-height: calc(100vh - 200px);
  color: white;
  padding: 2rem;
`;

const TicketContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const TicketCard = styled.div`
  background-color: #16213e;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
`;

const TicketHeader = styled.div`
  background-color: #ff4c29;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TicketLogo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  
  span {
    color: #16213e;
  }
`;

const TicketStatus = styled.div`
  background-color: ${props => props.status === 'completed' ? '#4caf50' : 
                              props.status === 'cancelled' ? '#f44336' : '#ff9800'};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
`;

const TicketBody = styled.div`
  padding: 2rem;
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
  width: 150px;
  height: 225px;
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

const TicketDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TicketInfo = styled.div``;

const TicketQR = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #ff4c29;
`;

const SeatsList = styled.div`
  margin-bottom: 1.5rem;
`;

const SeatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  
  svg {
    color: ${props => props.type === 'vip' ? '#3a4d8c' : '#1a1a2e'};
  }
`;

const TotalPrice = styled.div`
  font-size: 1.2rem;
  margin-top: 1rem;
  
  span {
    color: #ff4c29;
    font-weight: bold;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background-color: ${props => props.secondary ? '#1f2b4d' : '#ff4c29'};
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${props => props.secondary ? '#2a3a68' : '#e63e00'};
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

const Ticket = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AuthContext);
  
  const [ticket, setTicket] = useState(null);
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
      toast.error('Для просмотра билета необходимо войти в аккаунт');
      navigate('/login');
      return;
    }
    
    const fetchTicket = async () => {
      try {
        const res = await axios.get(`/api/tickets/${ticketId}`);
        setTicket(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Ошибка при загрузке билета:', err);
        toast.error('Не удалось загрузить информацию о билете');
        setLoading(false);
      }
    };
    
    fetchTicket();
  }, [ticketId, isAuthenticated, navigate]);
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleDownload = () => {
    // Здесь можно реализовать скачивание билета в PDF
    toast.info('Функция скачивания билета в разработке');
  };
  
  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Ожидает оплаты';
      case 'completed':
        return 'Оплачен';
      case 'cancelled':
        return 'Отменен';
      default:
        return 'Неизвестно';
    }
  };
  
  if (loading) {
    return (
      <TicketContainer>
        <LoadingContainer>Загрузка...</LoadingContainer>
      </TicketContainer>
    );
  }
  
  if (!ticket) {
    return (
      <TicketContainer>
        <LoadingContainer>Билет не найден</LoadingContainer>
      </TicketContainer>
    );
  }
  
  return (
    <TicketContainer>
      <TicketContent>
        <Title>Ваш билет</Title>
        
        <TicketCard>
          <TicketHeader>
            <TicketLogo>
              <span>V</span>Kino
            </TicketLogo>
            <TicketStatus status={ticket.paymentStatus}>
              {getStatusText(ticket.paymentStatus)}
            </TicketStatus>
          </TicketHeader>
          
          <TicketBody>
            <MovieInfo>
              <PosterContainer>
                <Poster 
                  src={ticket.screening.movie.poster || 'https://via.placeholder.com/300x450?text=Нет+постера'} 
                  alt={ticket.screening.movie.title} 
                />
              </PosterContainer>
              
              <InfoDetails>
                <MovieTitle>{ticket.screening.movie.title}</MovieTitle>
                
                <InfoItem>
                  <FaClock />
                  {formatDate(ticket.screening.startTime)}, {formatTime(ticket.screening.startTime)}
                </InfoItem>
                
                <InfoItem>
                  <FaMapMarkerAlt />
                  {ticket.screening.cinema.name}, {ticket.screening.hall}
                </InfoItem>
                
                <InfoItem>
                  <FaTicketAlt />
                  Билет №: {ticket._id.substring(0, 8).toUpperCase()}
                </InfoItem>
              </InfoDetails>
            </MovieInfo>
            
            <TicketDetails>
              <TicketInfo>
                <SectionTitle>Информация о местах</SectionTitle>
                
                <SeatsList>
                  {ticket.seats.map((seat, index) => (
                    <SeatItem key={index} type={seat.type}>
                      <FaChair />
                      Ряд {seat.row + 1}, Место {seat.seat + 1} ({seat.type === 'vip' ? 'VIP' : 'Стандарт'})
                    </SeatItem>
                  ))}
                </SeatsList>
                
                <TotalPrice>
                  Итого: <span>{ticket.totalPrice} ₽</span>
                </TotalPrice>
              </TicketInfo>
              
              <TicketQR>
                <QRCode 
                  value={`https://vkino.ru/tickets/${ticket._id}`} 
                  size={150} 
                  level="H"
                />
              </TicketQR>
            </TicketDetails>
            
            <ButtonsContainer>
              <Button onClick={handlePrint}>
                <FaPrint />
                Распечатать билет
              </Button>
              
              <Button secondary onClick={handleDownload}>
                <FaDownload />
                Скачать PDF
              </Button>
            </ButtonsContainer>
          </TicketBody>
        </TicketCard>
      </TicketContent>
    </TicketContainer>
  );
};

export default Ticket; 