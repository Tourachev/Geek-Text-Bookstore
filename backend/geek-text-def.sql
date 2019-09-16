USE GeekTextDB;

CREATE TABLE IF NOT EXISTS Author(
    authorID INT,
    firstName varchar(40),
    lastName varchar(40),
    bio varchar(40),
    PRIMARY KEY(authorID)
);

CREATE TABLE IF NOT EXISTS Book(
    bookID INT,
    title VARCHAR(40),
    genre varchar(20),
    authorID INT,
    PRIMARY KEY(bookID),
    FOREIGN KEY(authorID) REFERENCES Author(authorID)
);

CREATE TABLE IF NOT EXISTS BookInfo(
    bookID INT,
    totalSold INT,
    rating int ,
    price DECIMAL,
    releaseDate DATE,
    FOREIGN KEY(bookID) REFERENCES Book(bookID)
);