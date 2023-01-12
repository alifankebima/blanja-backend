create database blanja;
\l
\c blanja;

create type gender as enum ('laki-laki', 'perempuan');

create table customer(
    id int not null primary key,
    name varchar(255) not null,
    phone_number varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    gender gender not null,
    date_of_birth date not null
);

create table seller(
    id int not null primary key,
    name varchar(255) not null,
    phone_number int not null,
    email varchar(255) not null,
    password varchar(255) not null,
    gender gender not null,
    date_of_birth date not null,
    store_name varchar(255) not null,
    store_description varchar(255)
);

create table products(
    id int not null primary key,
    name varchar(255) not null,
    price int not null,
    description text not null,
    stock int not null,
    rating int,
    color varchar(255) not null,
    size int not null,
    id_category int,
    id_seller int 
);

create table category(
    id int not null primary key,
    name varchar(255) not null
);

