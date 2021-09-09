Create Table notifications(notification_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, notification_name VARCHAR(200), notification_sender INT, notification_VM_supervisor INT DEFAULT NULL, notification_DSM_supervisor INT DEFAULT NULL, notification_CDP_supervisor INT DEFAULT NULL, notification_MED_supervisor INT DEFAULT NULL, markAsRead_VM_supervisor BOOLEAN NOT NULL DEFAULT 0, markAsRead_DSM_supervisor BOOLEAN NOT NULL DEFAULT 0, markAsRead_CDP_supervisor BOOLEAN NOT NULL DEFAULT 0, recieved_since VARCHAR(50));