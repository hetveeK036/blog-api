-- -- Create the database if it doesn't exist
-- CREATE DATABASE IF NOT EXISTS StoryForge;

-- -- Use the database
-- USE StoryForge;

-- -- Create the stories table
-- CREATE TABLE IF NOT EXISTS Users (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     username VARCHAR(255) NOT NULL,
--     email VARCHAR(255) NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- Create the Posts table
-- CREATE TABLE IF NOT EXISTS Posts (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     username VARCHAR(255) NOT NULL,
--     title VARCHAR(255) NOT NULL,
--     description VARCHAR(255) NOT NULL,
--     img VARCHAR(255) NOT NULL,
--     cat VARCHAR(255) NOT NULL,
--     cat VARCHAR(255) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS StoryForge;

-- Use the database
USE StoryForge;

-- Create the Users table
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Posts table
CREATE TABLE IF NOT EXISTS Posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    img VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL, -- Changed to "category" instead of "cat"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



