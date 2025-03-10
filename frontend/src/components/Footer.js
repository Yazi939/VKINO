import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #16213e;
  padding: 40px 30px; // Фиксированные отступы
`;

const FooterContent = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  color: #ff4c29;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
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

const FooterLink = styled(Link)`
  color: #cccccc;
  text-decoration: none;
  margin-bottom: 0.8rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ff4c29;
  }
`;

const FooterText = styled.p`
  color: #cccccc;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: #ffffff;
  font-size: 1.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ff4c29;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid #333;
  color: #999;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>О нас</FooterTitle>
          <FooterText>
            VKino - это современная сеть кинотеатров, предлагающая лучшие фильмы и комфортные условия для просмотра. Мы стремимся создать незабываемые впечатления для каждого зрителя.
          </FooterText>
          <SocialIcons>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </SocialIcon>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialIcon>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </SocialIcon>
          </SocialIcons>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Быстрые ссылки</FooterTitle>
          <FooterLink to="/">Главная</FooterLink>
          <FooterLink to="/movies">Фильмы</FooterLink>
          <FooterLink to="/cinemas">Кинотеатры</FooterLink>
          <FooterLink to="/promotions">Акции</FooterLink>
          <FooterLink to="/contact">Контакты</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Помощь</FooterTitle>
          <FooterLink to="/faq">Часто задаваемые вопросы</FooterLink>
          <FooterLink to="/terms">Условия использования</FooterLink>
          <FooterLink to="/privacy">Политика конфиденциальности</FooterLink>
          <FooterLink to="/refund">Политика возврата</FooterLink>
          <FooterLink to="/support">Поддержка</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Контакты</FooterTitle>
          <FooterText>
            ул. Кинематографическая, 123<br />
            Москва, Россия<br /><br />
            Телефон: +7 (123) 456-78-90<br />
            Email: info@vkino.ru
          </FooterText>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        &copy; {new Date().getFullYear()} VKino. Все права защищены.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 