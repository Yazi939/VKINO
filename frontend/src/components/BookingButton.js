import styled from 'styled-components';
import { ripple, pulse } from '../styles/animations';

const BookingButton = styled.button`
  // ... существующие стили ...
  position: relative;
  overflow: hidden;

  &:hover {
    animation: ${pulse} 1s infinite;
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