USE GeekTextDB;

CREATE TABLE IF NOT EXISTS Author(
    authorID INT,
    firstName VARCHAR(40),
    lastName VARCHAR(40),
    bio VARCHAR(40),
    PRIMARY KEY(authorID)
);

CREATE TABLE IF NOT EXISTS Book(
    bookID INT,
    title VARCHAR(40),
    genre VARCHAR(20),
    authorID INT,
    PRIMARY KEY(bookID),
    FOREIGN KEY(authorID) REFERENCES Author(authorID)
);

CREATE TABLE IF NOT EXISTS BookInfo(
    bookID INT,
    totalSold INT,
    rating INT ,
    price DECIMAL,
    releaseDate DATE,
    FOREIGN KEY(bookID) REFERENCES Book(bookID)
);

CREATE TABLE IF NOT EXISTS UserInfo(
    userID INT,
    fName VARCHAR(40),
    lName VARCHAR(40),
    email VARCHAR(40),
    nickname VARCHAR(40),
    city VARCHAR(20),
    state VARCHAR(2),
    street varchar(40),
    zip int,
    FOREIGN KEY(userID) REFERENCES 
);

CREATE TABLE IF NOT EXISTS Feedback(
    userID INT,
    bookID INT,
    rating INT CHECK (rating < 6 and rating >= 0),
    comment VARCHAR(40),
    FOREIGN KEY(bookID) REFERENCES Book(bookID),
    FOREIGN KEY(userID) REFERENCES UserInfo(userID)
);

CREATE TABLE IF NOT EXISTS Credentials(
    userID INT,
    pw varchar(40),
    FOREIGN KEY(userID) REFERENCES UserInfo(userID)
);

CREATE TABLE IF NOT EXISTS PaymentInfo(
    userID INT,
    ccNum INT CHECK(ccNum < 20),
    cvc INT CHECK(cvc = 3),
    expDate DATE,
    city VARCHAR(40),
    state VARCHAR(2),
    zip int,
    street VARCHAR(40),
    FOREIGN KEY(userID) REFERENCES UserInfo(userID),
    PRIMARY KEY(ccNum)
);