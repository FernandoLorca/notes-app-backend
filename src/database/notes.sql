CREATE DATABASE notesapp;

/c notesapp

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(50),
    password varchar(255),
    created_at timestamp,
    updated_at timestamp
);

CREATE TABLE notes(
    notes_id SERIAL PRIMARY KEY,
    user_id integer,
    title varchar(255),
    context text,
    created_at timestamp,
    updated_at timestamp,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO users (name, email, password, created_at, updated_at) VALUES ('John Doe', 'johndow@example.com', 'password123', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);