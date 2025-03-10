CREATE DATABASE IF NOT EXISTS VKINO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE VKINO;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'cinema_admin', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    duration INT NOT NULL,
    release_date DATE NOT NULL,
    end_date DATE NOT NULL,
    poster VARCHAR(255),
    trailer VARCHAR(255),
    rating DECIMAL(3,1) DEFAULT 0,
    director VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movie_genres (
    movie_id INT,
    genre VARCHAR(50),
    PRIMARY KEY (movie_id, genre),
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);

CREATE TABLE movie_actors (
    movie_id INT,
    actor VARCHAR(100),
    PRIMARY KEY (movie_id, actor),
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);

CREATE TABLE cinemas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    admin_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES users(id)
);

CREATE TABLE cinema_halls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cinema_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    capacity INT NOT NULL,
    seats_layout JSON NOT NULL,
    FOREIGN KEY (cinema_id) REFERENCES cinemas(id) ON DELETE CASCADE
);

CREATE TABLE screenings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT NOT NULL,
    cinema_id INT NOT NULL,
    hall_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    price_standard DECIMAL(10,2) NOT NULL,
    price_vip DECIMAL(10,2) NOT NULL,
    available_seats JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (cinema_id) REFERENCES cinemas(id),
    FOREIGN KEY (hall_id) REFERENCES cinema_halls(id)
);

CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    screening_id INT NOT NULL,
    seats JSON NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    payment_status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    payment_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (screening_id) REFERENCES screenings(id)
); 