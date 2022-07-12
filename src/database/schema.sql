 CREATE DATABASE mycontacts;

 CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

 CREATE TABLE IF NOT EXISTS categories (
    ID UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    NAME VARCHAR NOT NULL
 );

 CREATE TABLE IF NOT EXISTS contacts(
    ID UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    NAME VARCHAR NOT NULL,
    EMAIL VARCHAR UNIQUE,
    PHONE VARCHAR,
    category_id UUID,
    FOREIGN KEY(category_id) REFERENCES categories(ID)
 );