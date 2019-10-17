create database geektext;

use geektext;

create table if not exists book
(
    bookid int,
    title varchar(400),
    genre varchar(20),
    author varchar(400),
    rating int(1),
    price double,
    date date,
    sales int,
    imagelink varchar(2000),
    topseller boolean not null,
    primary key(bookid)
);

create table if not exists credentials
(
    userid int, 
    password varchar(256) not null,
    primary key(userid)
);

create table if not exists userinfo
(
    userid int,
    username varchar(40) unique,
    email varchar(100) unique,
    fname varchar(40),
    lname varchar(40),
    homestate varchar(2),
    homecity varchar(40),
    homeaddress varchar(140),
    nickname varchar(40),
    foreign key(userid) references credentials(userid)
);

create table if not exists paymentinfo
(
    userid int,
    ccnum int not null,
    cvv int(3) not null,
    name varchar(100) not null,
    zip int(5) not null,
    expdate date not null,
    foreign key(userid) references credentials(userid),
    constraint cc_const unique(ccnum, userid)
);

create table if not exists addresses
(
    userid int,
    state varchar(2),
    city varchar(40),
    address varchar(140),
    zip int(5),
    foreign key(userid) references credentials(userid)
);

create table if not exists shoppingcart
(
    userid int,
    bookid int,
    quantity int,
    price double,
    total double as (price * quantity),
    foreign key(userid) references credentials(userid),
    foreign key(bookid) references book(bookid),
    constraint book_const unique(userid, bookid)
);