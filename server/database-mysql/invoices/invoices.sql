Create Table invoices(invoice_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, action_id INT NOT NULL, invoice_local_price INT, invoice_price INT, invoice_product JSON, invoice_logistic VARCHAR(20), invoice_accommodation VARCHAR(20), invoice_transfer VARCHAR(50), invoice_honorary_speaker VARCHAR(20), invoice_extras VARCHAR(20), invoice_comments VARCHAR(200));