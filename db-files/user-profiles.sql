/*
  Script that defines the structure of the tables that make up
  user profiles. It creates the tables and establishes the relations
  between them.
*/

USE GeekTextDB;

create table if not exists credentials(
  userid varchar(40),
  password varchar(256) not null,
  primary key(userid)
);

  /*
  To eliminate the duplication of addresses this table will store all addresses.
  The type of address will be determined by the tables that reference it.
  UPS has a free API for address validation.
*/
create table if not exists addresses(
  name varchar(40),
  city varchar(40),
  state varchar(40),
  zip int,
  street varchar(100),
  primary key(street, zip)
);

/*
  Important things to take note of: Users will only be referenced by their userid
  when logging in, after logging in, it should be discarded. If the userid
  is needed then it must be referenced through the nickname. 
  Addresses are not mandatory to make an account.
*/
create table if not exists userinfo(
  nickname varchar(40),
  username varchar(40),
  fname varchar(40),
  lname varchar(40),
  email varchar(100),
  homezip int,
  homestreet varchar(100),
  primary key(nickname),
  foreign key(username) references credentials(userid),
  foreign key(homestreet, homezip) references addresses(street, zip)
);

/*
  Credit card numbers will be tied to a certain user.
*/
create table if not exists paymentinfo(
  nname varchar(40) not null,
  ccnum bigint,
  cvv int,
  fname varchar(40),
  lname varchar(40),
  primary key(ccnum),
  foreign key(nname) references userinfo(nickname)
);