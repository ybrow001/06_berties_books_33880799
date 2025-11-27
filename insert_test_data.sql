# Insert data into the tables

USE berties_books;

INSERT INTO books (name, price) VALUES ('Brighton Rock', 20.25),('Brave New World', 25.00), ('Animal Farm', 12.99);

INSERT INTO users (username, first_name, last_name, email, hashed_password) VALUES ('gold', 'gold', 'smiths', 'gs@gs.uk', '$2b$10$IPzYIKtMNKcnTkQF7kEGme3uYdSFumhkQJqFWsQKsSj5aVAy3yPcy');