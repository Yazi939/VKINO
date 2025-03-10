import styled from 'styled-components';
import { device } from './breakpoints';

// Основной контейнер для всего приложения
export const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #0f0f1e;
`;

// Основной контейнер для контента (между header и footer)
export const MainContainer = styled.main`
  flex: 1;
  padding: 80px 30px 30px; // 80px сверху для header
  width: 100%;
  max-width: 1920px; // максимальная ширина для очень широких экранов
  margin: 0 auto;
  
  @media ${device.tablet} {
    padding: 100px 30px 40px;
  }
`;

// Обновим PageContainer
export const PageContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

// Сетка для карточек
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

// Заголовок страницы
export const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: white;
  margin-bottom: 1.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.5rem;
    width: 60px;
    height: 3px;
    background-color: #ff4c29;
  }
`;

// Секция на странице
export const Section = styled.section`
  margin: 4rem 0;
  
  &:first-child {
    margin-top: 0;
  }
`;

// Подзаголовок секции
export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: white;
  margin-bottom: 1.5rem;
`;

// Flex контейнер
export const FlexContainer = styled.div`
  display: flex;
  gap: ${props => props.gap || '1rem'};
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => props.align || 'center'};
  justify-content: ${props => props.justify || 'flex-start'};
  flex-wrap: ${props => props.wrap || 'wrap'};
  
  @media ${device.tablet} {
    flex-direction: ${props => props.tabletDirection || props.direction || 'row'};
  }
`;

// Карточка с контентом
export const Card = styled.div`
  background-color: #16213e;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`; 