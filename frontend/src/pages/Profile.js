import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaTicketAlt, FaClock, FaFilm, FaMapMarkerAlt } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const ProfileContainer = styled.div`
  background-color: #0f0f1e;
  min-height: calc(100vh - 200px);
  color: white;
  padding: 2rem;
`;

const ProfileContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  background-color: #16213e;
  border-radius: 8px;
  padding: 2rem;
  height: fit-content;
`;

const UserInfo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #1f2b4d;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1rem;
  font-size: 2.5rem;
  color: #ff4c29;
`;

const UserName = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const UserRole = styled.p`
  color: #ccc;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const UserDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  
  svg {
    color: #ff4c29;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #333;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  background: none;
  border: none;
  color: ${props => props.active ? '#ff4c29' : '#ccc'};
  padding: 1rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background-color: ${props => props.active ? '#ff4c29' : 'transparent'};
  }
  
  &:hover {
    color: ${props => props.active ? '#ff4c29' : 'white'};
  }
`;

const TabContent = styled.div``;

const TicketsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const TicketCard = styled(Link)`
  background-color: #16213e;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  color: white;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const TicketHeader = styled.div`
  background-color: ${props => props.status === 'completed' ? '#4caf50' : 
                              props.status === 'cancelled' ? '#f44336' : '#ff9800'};
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: bold;
`;

const TicketBody = styled.div`
  padding: 1rem;
`;

const TicketTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TicketDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #ccc;
  font-size: 0.9rem;
  
  svg {
    color: #ff4c29;
  }
`;

const TicketPrice = styled.div`
  margin-top: 1rem;
  font-weight: bold;
  
  span {
    color: #ff4c29;
  }
`;

const NoTickets = styled.div`
  text-align: center;
  padding: 3rem;
  color: #ccc;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #ccc;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  background-color: #1a1a2e;
  border: 1px solid #333;
  border-radius: 4px;
  color: white;
  
  &:focus {
    outline: none;
    border-color: #ff4c29;
  }
`;

const Button = styled.button`
  background-color: #ff4c29;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
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

const DangerButton = styled(Button)`
  background-color: #f44336;
  
  &:hover {
    background-color: #d32f2f;
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

const Profile = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('tickets');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Для доступа к профилю необходимо войти в аккаунт');
      navigate('/login');
      return;
    }
    
    // Загрузка данных пользователя
    if (user) {
      setFormData(prevState => ({
        ...prevState,
        name: user.name,
        email: user.email
      }));
    }
    
    // Загрузка билетов пользователя
    const fetchTickets = async () => {
      try {
        const res = await axios.get('/api/tickets/user');
        setTickets(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Ошибка при загрузке билетов:', err);
        toast.error('Не удалось загрузить билеты');
        setLoading(false);
      }
    };
    
    fetchTickets();
  }, [isAuthenticated, navigate, user]);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.put('/api/users/profile', {
        name: formData.name,
        email: formData.email
      });
      
      toast.success('Профиль успешно обновлен');
      setIsSubmitting(false);
    } catch (err) {
      console.error('Ошибка при обновлении профиля:', err);
      toast.error(err.response?.data?.message || 'Ошибка при обновлении профиля');
      setIsSubmitting(false);
    }
  };
  
  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Пароли не совпадают');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await axios.put('/api/users/password', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      
      toast.success('Пароль успешно изменен');
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setIsSubmitting(false);
    } catch (err) {
      console.error('Ошибка при изменении пароля:', err);
      toast.error(err.response?.data?.message || 'Ошибка при изменении пароля');
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteAccount = async () => {
    if (window.confirm('Вы уверены, что хотите удалить свой аккаунт? Это действие невозможно отменить.')) {
      try {
        await axios.delete('/api/users/profile');
        logout();
        toast.success('Аккаунт успешно удален');
        navigate('/');
      } catch (err) {
        console.error('Ошибка при удалении аккаунта:', err);
        toast.error(err.response?.data?.message || 'Ошибка при удалении аккаунта');
      }
    }
  };
  
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
  
  if (!isAuthenticated || !user) {
    return (
      <ProfileContainer>
        <LoadingContainer>Загрузка...</LoadingContainer>
      </ProfileContainer>
    );
  }
  
  return (
    <ProfileContainer>
      <ProfileContent>
        <Sidebar>
          <UserInfo>
            <Avatar>
              <FaUser />
            </Avatar>
            <UserName>{user.name}</UserName>
            <UserRole>
              {user.role === 'admin' ? 'Администратор' : 
               user.role === 'cinema_admin' ? 'Администратор кинотеатра' : 'Пользователь'}
            </UserRole>
          </UserInfo>
          
          <UserDetail>
            <FaEnvelope />
            {user.email}
          </UserDetail>
          
          <UserDetail>
            <FaTicketAlt />
            {tickets.length} билетов
          </UserDetail>
        </Sidebar>
        
        <div>
          <TabsContainer>
            <Tab 
              active={activeTab === 'tickets'} 
              onClick={() => handleTabChange('tickets')}
            >
              Мои билеты
            </Tab>
            <Tab 
              active={activeTab === 'profile'} 
              onClick={() => handleTabChange('profile')}
            >
              Настройки профиля
            </Tab>
            <Tab 
              active={activeTab === 'password'} 
              onClick={() => handleTabChange('password')}
            >
              Изменить пароль
            </Tab>
          </TabsContainer>
          
          <TabContent>
            {activeTab === 'tickets' && (
              <>
                {loading ? (
                  <LoadingContainer>Загрузка билетов...</LoadingContainer>
                ) : tickets.length > 0 ? (
                  <TicketsList>
                    {tickets.map(ticket => (
                      <TicketCard key={ticket._id} to={`/tickets/${ticket._id}`}>
                        <TicketHeader status={ticket.paymentStatus}>
                          {getStatusText(ticket.paymentStatus)}
                        </TicketHeader>
                        <TicketBody>
                          <TicketTitle>{ticket.screening.movie.title}</TicketTitle>
                          
                          <TicketDetail>
                            <FaClock />
                            {formatDate(ticket.screening.startTime)}, {formatTime(ticket.screening.startTime)}
                          </TicketDetail>
                          
                          <TicketDetail>
                            <FaMapMarkerAlt />
                            {ticket.screening.cinema.name}, {ticket.screening.hall}
                          </TicketDetail>
                          
                          <TicketDetail>
                            <FaTicketAlt />
                            {ticket.seats.length} {ticket.seats.length === 1 ? 'место' : 
                                                 ticket.seats.length < 5 ? 'места' : 'мест'}
                          </TicketDetail>
                          
                          <TicketPrice>
                            Итого: <span>{ticket.totalPrice} ₽</span>
                          </TicketPrice>
                        </TicketBody>
                      </TicketCard>
                    ))}
                  </TicketsList>
                ) : (
                  <NoTickets>
                    <p>У вас пока нет забронированных билетов</p>
                    <Link to="/movies">Перейти к фильмам</Link>
                  </NoTickets>
                )}
              </>
            )}
            
            {activeTab === 'profile' && (
              <form onSubmit={handleUpdateProfile}>
                <FormGroup>
                  <Label htmlFor="name">Имя</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FormGroup>
                
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
                </Button>
                
                <div style={{ marginTop: '3rem' }}>
                  <h3 style={{ color: '#f44336', marginBottom: '1rem' }}>Опасная зона</h3>
                  <DangerButton type="button" onClick={handleDeleteAccount}>
                    Удалить аккаунт
                  </DangerButton>
                </div>
              </form>
            )}
            
            {activeTab === 'password' && (
              <form onSubmit={handleChangePassword}>
                <FormGroup>
                  <Label htmlFor="currentPassword">Текущий пароль</Label>
                  <Input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="newPassword">Новый пароль</Label>
                  <Input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="confirmPassword">Подтверждение нового пароля</Label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </FormGroup>
                
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Изменение...' : 'Изменить пароль'}
                </Button>
              </form>
            )}
          </TabContent>
        </div>
      </ProfileContent>
    </ProfileContainer>
  );
};

export default Profile; 