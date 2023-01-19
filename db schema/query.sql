create database blanja;
\l
\c blanja;

create type gender as enum ('laki-laki', 'perempuan');

create table customers(
    id varchar not null primary key,
    email varchar not null,
    password varchar not null,
    fullname varchar not null,
    role varchar not null,
    phone_number varchar not null,
    gender gender not null,
    date_of_birth date not null
);

create table sellers(
    id varchar not null primary key,
    email varchar not null,
    password varchar not null,
    fullname varchar not null,
    role varchar not null,
    phone_number varchar not null,
    gender gender not null,
    date_of_birth date not null,
    store_name varchar not null,
    store_description varchar not null
);

create table products(
    id varchar not null primary key,
    name varchar not null,
    stock int not null,
    price int not null,
    photo varchar not null,
    description text not null,
    color varchar not null,
    size int not null,
    rating int,
    id_category int,
    id_seller int 
);

-- TODO: Create category - products relation
-- create table category(
--     id int not null primary key,
--     name varchar(255) not null
-- );