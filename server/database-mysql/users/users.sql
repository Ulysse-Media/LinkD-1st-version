
Create Table users(user_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, user_email VARCHAR(50) UNIQUE, user_password VARCHAR(200), user_position VARCHAR(20) DEFAULT "VM", user_avatar VARCHAR(100) DEFAULT 'https://i.pinimg.com/originals/2c/b5/b7/2cb5b7bfa9506a980435078b0d41379d.gif', resetPasswordToken VARCHAR(70), resetPasswordExpires VARCHAR(20));
