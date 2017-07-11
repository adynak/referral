CREATE SCHEMA nwc
  AUTHORIZATION postgres;

***************

CREATE TABLE nwc.members
(
  id serial NOT NULL,
  name_first text,
  name_last text,
  name_business text,
  occupation text, -- looking for president, CFO, CEO, lead dishwasher, head honcho
  email text,
  phone_main text,
  phone_secondary text,
  member_since date DEFAULT now(),
  active boolean DEFAULT true,
  comments text,
  onlineid text,
  password text,
  pword_type integer, -- is  the password is permanent (1)  or temporary (0)?
  member_type integer, -- regularUser = 0; admin = 1
  CONSTRAINT members_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE nwc.members
  OWNER TO postgres;
COMMENT ON COLUMN nwc.members.occupation IS 'looking for president, CFO, CEO, lead dishwasher, head honcho';
COMMENT ON COLUMN nwc.members.pword_type IS 'is  the password is permanent (1)  or temporary (0)?';
COMMENT ON COLUMN nwc.members.member_type IS 'regularUser = 0; admin = 1';

INSERT INTO members (id, name_first, name_last, name_business, occupation, email, phone_main, phone_secondary, member_since, active, comments, onlineid, password, pword_type, member_type) VALUES (1, 'Marty', 'McFly', 'Great Northwest', 'Agent', 'marty@gmail.com', '1234567890', NULL, '2017-02-22', true, 'some comment', 'username', 'userpassword', 0, 0);
INSERT INTO members (id, name_first, name_last, name_business, occupation, email, phone_main, phone_secondary, member_since, active, comments, onlineid, password, pword_type, member_type) VALUES (2, 'Beverly', 'Sills', 'Real Estate', 'Broker', 'beverly@aol.com', '1230987654', NULL, '2017-02-22', true, 'Real Estate Broker', 'username', 'userpassword', 0, 0);


***************

CREATE TABLE nwc.referrals
(
  id serial NOT NULL,
  originator integer,
  recipient integer,
  datesent timestamp with time zone DEFAULT now(),
  description text,
  location text,
  contact_name_first text,
  contact_name_last text,
  contact_occupation text,
  contact_phone text,
  contact_email text,
  type text,
  temperature integer,
  dateclosed timestamp with time zone,
  dollarestimate numeric,
  markread text,
  delivery text, -- callThem or callMe
  CONSTRAINT referrals_pkey PRIMARY KEY (id),
  CONSTRAINT referrals_originator_fkey FOREIGN KEY (originator)
      REFERENCES nwc.members (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT referrals_recipient_fkey FOREIGN KEY (recipient)
      REFERENCES nwc.members (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT referrals_temperature_fkey FOREIGN KEY (temperature)
      REFERENCES nwc.temperature (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE nwc.referrals
  OWNER TO postgres;
COMMENT ON COLUMN nwc.referrals.delivery IS 'callThem or callMe';

INSERT INTO referrals (id, originator, recipient, datesent, description, location, contact_name_first, contact_name_last, contact_occupation, contact_phone, contact_email, type, temperature, dateclosed, dollarestimate, markread, delivery) VALUES (3, 1, 2, '2017-04-17 00:00:00-07', 'Needing to revisit current life insurance levels', 'Somewhere', 'John', 'Doe', NULL, '1234567890', NULL, 'Inside', 4, '2017-06-09 00:00:00-07', 3068.00, 'new', 'callThem');

***************

CREATE TABLE nwc.temperature
(
  id serial NOT NULL,
  description text,
  CONSTRAINT temperature_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE nwc.temperature
  OWNER TO postgres;

***************

CREATE SEQUENCE nwc.members_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE nwc.members_id_seq
  OWNER TO postgres;

***************

CREATE SEQUENCE nwc.referrals_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE nwc.referrals_id_seq
  OWNER TO postgres;

***************

CREATE SEQUENCE nwc.temperature_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE nwc.temperature_id_seq
  OWNER TO postgres;

INSERT INTO nwc.temperature (id, description) VALUES (1, 'Kicking Tires');
INSERT INTO nwc.temperature (id, description) VALUES (2, 'Mildly Interested');
INSERT INTO nwc.temperature (id, description) VALUES (3, 'Actively Looking');
INSERT INTO nwc.temperature (id, description) VALUES (4, 'Narrowing Options');
INSERT INTO nwc.temperature (id, description) VALUES (5, 'Ready to Pull the Trigger');

