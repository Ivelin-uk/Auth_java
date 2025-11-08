-- Create database if not exists
CREATE DATABASE IF NOT EXISTS auth_service_db;

USE auth_service_db;

-- Users table will be created automatically by Hibernate
-- This script is just for reference and manual database setup if needed

-- Example manual table creation (optional, as Hibernate will create it):
-- CREATE TABLE IF NOT EXISTS users (
--     id BIGINT AUTO_INCREMENT PRIMARY KEY,
--     username VARCHAR(50) UNIQUE NOT NULL,
--     email VARCHAR(100) UNIQUE NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     role VARCHAR(20) NOT NULL,
--     enabled BOOLEAN NOT NULL DEFAULT TRUE,
--     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
-- );

-- Create index for faster queries
-- CREATE INDEX idx_username ON users(username);
-- CREATE INDEX idx_email ON users(email);
