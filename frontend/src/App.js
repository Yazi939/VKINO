import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppWrapper, MainContainer } from './styles/layout';

// Компоненты
import Header from './components/Header';
import Footer from './components/Footer';

// Страницы
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetails from './pages/MovieDetails';
import CinemaDetails from './pages/CinemaDetails';
import Booking from './pages/Booking';
import Ticket from './pages/Ticket';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import CinemaAdminDashboard from './pages/CinemaAdminDashboard';
import NotFound from './pages/NotFound';
import Movies from './pages/Movies';
import Cinemas from './pages/Cinemas';

// Контекст
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppWrapper>
          <Header />
          <MainContainer>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movies/:id" element={<MovieDetails />} />
              <Route path="/cinemas" element={<Cinemas />} />
              <Route path="/cinemas/:id" element={<CinemaDetails />} />
              <Route path="/booking/:screeningId" element={<Booking />} />
              <Route path="/tickets/:ticketId" element={<Ticket />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/cinema-admin" element={<CinemaAdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainContainer>
          <Footer />
          <ToastContainer position="bottom-right" />
        </AppWrapper>
      </Router>
    </AuthProvider>
  );
}

export default App; 