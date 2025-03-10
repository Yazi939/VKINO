import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { device } from '../styles/breakpoints';
import { fadeIn, slideDown, pulse, ripple } from '../styles/animations';

const HeaderContainer = styled.header`
  background-color: rgba(22, 33, 62, 0.95);
  backdrop-filter: blur(5px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0 30px;
`;

const HeaderContent = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  
  span {
    color: #ff4c29;
  }
  
  &:hover span {
    animation: ${pulse} 1s infinite;
  }
`;

const Nav = styled.nav`
  display: none;
  
  ${device.tablet} {
    display: flex;
    gap: 2rem;
  }
`;

const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(22, 33, 62, 0.98);
  padding: 5rem 2rem;
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  transition: transform 0.3s ease;
  z-index: 900;
  animation: ${fadeIn} 0.3s ease-out;
  
  ${device.tablet} {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 0.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ff4c29;
  }
  
  ${MobileNav} & {
    font-size: 1.5rem;
    padding: 1rem;
    text-align: center;
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: block;
  z-index: 1000;
  
  ${device.tablet} {
    display: none;
  }
`;

const UserButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: #ff4c29;
  transition: background-color 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background-color: #e63e00;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }

  &:focus:not(:active)::after {
    animation: ${ripple} 0.8s ease-out;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <span>V</span>Kino
        </Logo>
        
        <Nav>
          <NavLink to="/">Главная</NavLink>
          <NavLink to="/movies">Фильмы</NavLink>
          <NavLink to="/cinemas">Кинотеатры</NavLink>
          <UserButton to="/login">
            <FaUser />
            Войти
          </UserButton>
        </Nav>
        
        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MenuButton>
        
        <MobileNav isOpen={isMenuOpen}>
          <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Главная</NavLink>
          <NavLink to="/movies" onClick={() => setIsMenuOpen(false)}>Фильмы</NavLink>
          <NavLink to="/cinemas" onClick={() => setIsMenuOpen(false)}>Кинотеатры</NavLink>
          <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Войти</NavLink>
        </MobileNav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;