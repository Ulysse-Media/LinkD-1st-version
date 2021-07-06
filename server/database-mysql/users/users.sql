
Create Table users(user_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, user_email VARCHAR(50) UNIQUE, user_password VARCHAR(200), user_position VARCHAR(20) DEFAULT NULL);
