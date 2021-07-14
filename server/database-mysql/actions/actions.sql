Create Table actions(action_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, user_id INT NOT NULL, user_position VARCHAR(10), user_email VARCHAR(20), action_type VARCHAR(50), other_stuff VARCHAR(20), start_action DATE NOT NULL, end_action DATE DEFAULT '2021-07/07', schedule TIME NOT NULL, action_town VARCHAR(20), action_location VARCHAR(20), other_location VARCHAR(20), product VARCHAR(100), speaker BOOLEAN, speaker_suggestion VARCHAR(20) Default Null, speaker_transfer BOOLEAN NOT NULL DEFAULT 0, speaker_accommodation BOOLEAN NOT NULL DEFAULT 0, meeting_agenda VARCHAR(300) DEFAULT NULL, meeting_theme VARCHAR(50), pax_number INT NOT NULL, action_field VARCHAR(100), invited_doctors VARCHAR(300), other_doctors VARCHAR(20), comments VARCHAR(100), status VARCHAR(50) DEFAULT "En attente de validation VM", VM_validation INT DEFAULT NULL, DSM_validation INT DEFAULT NULL, CDP_validation INT DEFAULT NULL,  VM_rejection INT DEFAULT NULL, DSM_rejection INT DEFAULT NULL, CDP_rejection INT DEFAULT NULL);