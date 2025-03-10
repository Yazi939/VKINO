import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

const LoginContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 200px);
  background-color: #0f0f1e;
`;

const LoginImage = styled.div`
  flex: 1;
  background-image: url('/images/cinema-login.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  
  @media (max-width: 768px) {
    display: none;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, rgba(15, 15, 30, 0.9), rgba(15, 15, 30, 0.4));
  }
`;

const ImageContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  width: 80%;
`;

const ImageTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #ff4c29;
`;

const ImageText = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
`;

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #16213e;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
`;

const FormTitle = styled.h1`
  color: white;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  color: #ccc;
  margin-bottom: 0.5rem;
  display: block;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #1a1a2e;
  color: white;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #ff4c29;
  }
`;

const Button = styled.button`
  background-color: #ff4c29;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;
  
  &:hover {
    background-color: #e63e00;
  }
  
  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
`;

const RegisterLink = styled.p`
  color: #ccc;
  text-align: center;
  margin-top: 1.5rem;
  
  a {
    color: #ff4c29;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  color: #ff4c29;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const { email, password } = formData;
  
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Очистка ошибки при изменении поля
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Введите email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Введите корректный email';
    }
    
    if (!password) {
      newErrors.password = 'Введите пароль';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async e => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      const result = await login(formData);
      
      if (result.success) {
        toast.success('Вход выполнен успешно!');
        navigate('/');
      } else {
        toast.error(result.message);
        setErrors({ general: result.message });
      }
      
      setIsSubmitting(false);
    }
  };
  
  return (
    <LoginContainer>
      <LoginImage>
        <ImageContent>
          <ImageTitle>Добро пожаловать в VKino</ImageTitle>
          <ImageText>
            Войдите в свой аккаунт, чтобы получить доступ к бронированию билетов, 
            персональным рекомендациям и специальным предложениям.
          </ImageText>
        </ImageContent>
      </LoginImage>
      
      <FormContainer>
        <FormWrapper>
          <FormTitle>Вход в аккаунт</FormTitle>
          
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Введите ваш email"
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="password">Пароль</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Введите ваш пароль"
              />
              {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            </FormGroup>
            
            {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}
            
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Вход...' : 'Войти'}
            </Button>
          </Form>
          
          <RegisterLink>
            Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </RegisterLink>
        </FormWrapper>
      </FormContainer>
    </LoginContainer>
  );
};

export default Login; 