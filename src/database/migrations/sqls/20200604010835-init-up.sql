-- ==========================================
-- 				   ACCOUNT
-- ==========================================

CREATE TABLE account (
	id serial,
	email text not null,
	password text not null,
	uuid text null,
	status integer default 0,
	creation_date timestamp not null default now(),
	update_date timestamp null,
	last_login timestamp null,
	primary key (id)
);

CREATE TABLE person (
	id serial,
	name text NOT NULL,
	account_id integer not null,
	PRIMARY KEY (id),
	constraint account_fk foreign key (account_id) references account (id)
);

-- ==========================================
-- 			AUTHENTICATION & LOG
-- ==========================================
CREATE TABLE authentication (
	id serial,
	account_id integer not null,
	datetime timestamp not null default now(),
	token text not null,
	type text not null,
	device_code text,
	active integer not null default 1,
	primary key (id),
	constraint account_fk foreign key (account_id) references account (id)
);

CREATE TABLE request_log (
	id serial,
	authentication_id integer,
	request_name text not null,
	request_params text not null,
	start_time timestamp not null default now(),
	end_time timestamp,
	primary key (id),
	constraint authentication_fk foreign key (authentication_id) references authentication (id)
);

-- ==========================================
-- 			Missing person
-- ==========================================

CREATE TABLE gender (
	id serial,
	description text NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE missing_person (
	id serial,
	name text NOT NULL,
	birth_date date,
	disappearance_date timestamp NOT NULL,
	gender_id integer NOT NULL,
	creation_datetime timestamp not null default now(),
	account_id integer not null,
	primary key (id),
	constraint gender_fk foreign key (gender_id) references gender (id),
	constraint account_fk foreign key (account_id) references account (id)
);

INSERT INTO gender (description) VALUES ('Masculino');
INSERT INTO gender (description) VALUES ('Feminino');
