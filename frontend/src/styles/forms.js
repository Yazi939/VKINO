import styled from 'styled-components';

export const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #16213e;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  color: white;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #2a3a68;
  border-radius: 4px;
  background-color: #1f2b4d;
  color: white;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #ff4c29;
    outline: none;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #ff4c29;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #e63e00;
  }
  
  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
`; 