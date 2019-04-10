--- tables creation
CREATE TABLE taxi
(
    taxi_id VARCHAR(7) PRIMARY KEY,
    model VARCHAR(20) NOT NULL,
    year INT,
    soat VARCHAR(50) NOT NULL,
    trunk BOOLEAN NOT NULL,
    brand varchar(20) NOT NULL
);

CREATE TABLE driver
(
    -- driver's cedula
    driver_id VARCHAR(10) PRIMARY KEY,
    plate VARCHAR(7) REFERENCES taxi(plate),
    name varchar(60) NOT NULL,
    birth_date DATE NOT NULL
);

CREATE TABLE active_driver
(
    driver_id VARCHAR(10) REFERENCES driver(driver_id),
    taxi_id VARCHAR(7) REFERENCES taxi(plate),
    pos_lat FLOAT NOT NULL,
	pos_long FLOAT NOT NULL,
    PRIMARY KEY (driver_id, plate)
);

CREATE TABLE available_trips
(
    driver_id VARCHAR(10) REFERENCES driver(driver_id),
    client_id VARCHAR(7) REFERENCES client(client_id),
    orig_pos_lat FLOAT NOT NULL,
    orig_pos_long FLOAT NOT NULL,
    dest_pos_lat FLOAT NOT NULL,
    dest_pos_long FLOAT NOT NULL,
    PRIMARY KEY (driver_id, client_id)
);

CREATE TABLE drive_login
(
    driver_id VARCHAR(10) REFERENCES driver(driver_id),
    password VARCHAR(50) NOT NULL
);

CREATE TABLE client
(
    -- client's phone # and country code
    client_id VARCHAR(12) PRIMARY KEY,
    name varchar(60) NOT NULL,
    credit_card VARCHAR(18) NOT NULL
);

CREATE TABLE place
(
	name VARCHAR(50) NOT NULL,
	client_id VARCHAR(12) REFERENCES client(client_id),
	pos_lat FLOAT NOT NULL,
	pos_long FLOAT NOT NULL,
	PRIMARY KEY (client_id, name)
);

CREATE TABLE client_login
(
    client_id VARCHAR(12) REFERENCES driver(driver_id),
    password VARCHAR(50) NOT NULL
);

CREATE TABLE trip
(
    trip_id VARCHAR(20) PRIMARY KEY,
    driver_id VARCHAR(10) REFERENCES driver(driver_id),
    client_id VARCHAR(12) REFERENCES client(client_id),
    orig_pos_lat FLOAT NOT NULL,
    orig_pos_long FLOAT NOT NULL,
    dest_pos_lat FLOAT NOT NULL,
    dest_pos_long FLOAT NOT NULL,
    score FLOAT,
    date DATE NOT NULL,
    charged BOOLEAN NOT NULL,
    paid_out BOOLEAN NOT NULL
);

