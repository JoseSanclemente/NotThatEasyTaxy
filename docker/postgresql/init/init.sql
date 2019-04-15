--- [TABLES CREATION]
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
    taxi_id VARCHAR(7) REFERENCES taxi(taxi_id),
    name varchar(60) NOT NULL,
    birth_date DATE NOT NULL
);

CREATE TABLE active_driver
(
    driver_id VARCHAR(10) REFERENCES driver(driver_id),
    taxi_id VARCHAR(7) REFERENCES taxi(taxi_id),
    pos_lat FLOAT NOT NULL,
	pos_long FLOAT NOT NULL,
    PRIMARY KEY (driver_id, taxi_id)
);

CREATE TABLE driver_login
(
    driver_id VARCHAR(10) REFERENCES driver(driver_id),
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (driver_id)
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
    client_id VARCHAR(12) REFERENCES client(client_id),
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (client_id)
);

CREATE TABLE available_trips
(
    driver_id VARCHAR(10) REFERENCES driver(driver_id),
    client_id VARCHAR(12) REFERENCES client(client_id),
    orig_pos_lat FLOAT NOT NULL,
    orig_pos_long FLOAT NOT NULL,
    dest_pos_lat FLOAT NOT NULL,
    dest_pos_long FLOAT NOT NULL,
    PRIMARY KEY (driver_id, client_id)
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

-- [TABLES POPULATION]
INSERT INTO taxi(taxi_id, model, year, soat, trunk, brand) VALUES('abc-123', 's3', 2019, 'zxcvbnm', true, 'Tesla');
INSERT INTO taxi(taxi_id, model, year, soat, trunk, brand) VALUES('abc-456', 's3', 2019, 'qwertyuiooop', true, 'Tesla');

INSERT INTO driver(driver_id, taxi_id, name, birth_date) VALUES('123456790', 'abc-123', 'Pepe', '1998-10-10');
INSERT INTO driver(driver_id, taxi_id, name, birth_date) VALUES('987654321', 'abc-456', 'Juan', '1997-10-10');
INSERT INTO driver_login(driver_id, password) VALUES('987654321', 'abc');

INSERT INTO client(client_id, name, credit_card) VALUES('571112223344', 'Andrea', '123456789');
INSERT INTO client(client_id, name, credit_card) VALUES('575556667788', 'Felipe', '123456789');
INSERT INTO client_login(client_id, password) VALUES('571112223344', 'abc');

-- values to test active drivers
-- INSERT INTO available_trips(driver_id, client_id, orig_pos_lat, orig_pos_long, dest_pos_lat, dest_pos_long)
-- VALUES('123456790', '571112223344', 0, 1, 2, 3)
-- INSERT INTO available_trips(driver_id, client_id, orig_pos_lat, orig_pos_long, dest_pos_lat, dest_pos_long)
-- VALUES('987654321', '575556667788', 0, 1, 2, 3)
-- INSERT INTO available_trips(driver_id, client_id, orig_pos_lat, orig_pos_long, dest_pos_lat, dest_pos_long)
-- VALUES('987654321', '571112223344', 0, 1, 2, 3)

-- [TRIGGERS AND PROCEDURES]

-- delete
CREATE OR REPLACE FUNCTION take_trip() RETURNS trigger AS $$
BEGIN
    IF NOT EXISTS (SELECT driver_id, client_id FROM available_trips WHERE driver_id = new.driver_id AND client_id = new.client_id)  THEN
        RAISE EXCEPTION 'There is not matching available trip';
        RETURN null;
	END IF;
	DELETE FROM available_trips WHERE driver_id = new.driver_id;
	DELETE FROM active_driver WHERE driver_id = new.driver_id;
    RETURN new;
END;
$$ LANGUAGE plpgsql;

--- add trigger
CREATE TRIGGER take_trip_trigger
BEFORE insert ON trip
FOR EACH ROW EXECUTE PROCEDURE take_trip();

CREATE OR REPLACE FUNCTION create_driver(in_taxi_id VARCHAR, in_model VARCHAR, in_year INT, in_soat VARCHAR, in_trunk BOOLEAN, in_brand VARCHAR, in_driver_id VARCHAR, in_name VARCHAR, in_birth_date DATE) RETURNS VOID AS $$
DECLARE
	ref refcursor;
BEGIN
	IF NOT EXISTS (SELECT * FROM taxi WHERE taxi_id = in_taxi_id) THEN
		INSERT INTO taxi(taxi_id, model, year, soat, trunk, brand) VALUES(in_taxi_id, in_model, in_year, in_soat, in_trunk, in_brand);
		INSERT INTO driver(driver_id, taxi_id, name, birth_date) VALUES(in_driver_id, in_taxi_id, in_name, in_birth_date);
		RETURN;
	END IF;
	INSERT INTO driver(driver_id, taxi_id, name, birth_date) VALUES(in_driver_id, in_taxi_id, in_name, in_birth_date);
	RETURN;
	
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_user(in_client_id VARCHAR, in_name VARCHAR, in_credit_card VARCHAR, in_password VARCHAR) RETURNS VOID AS $$
BEGIN
	INSERT INTO client(client_id, name, credit_card) VALUES(in_client_id, in_name, in_credit_card);
	INSERT INTO client_login(client_id, password) VALUES(in_client_id, in_password);
	RETURN;
	
END;
$$ LANGUAGE plpgsql;