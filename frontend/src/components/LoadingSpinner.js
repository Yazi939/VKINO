import styled, { keyframes } from 'styled-components';
import { spin } from '../styles/animations';

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #ff4c29;
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`; 