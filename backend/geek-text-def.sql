USE GeekTextDB;

CREATE TABLE IF NOT EXISTS Author(
    authorID INT,
    fname VARCHAR(40),
    lname VARCHAR(40),
    PRIMARY KEY(authorID)
);

CREATE TABLE IF NOT EXISTS Book(
    bookID INT,
    authorID INT,
    title VARCHAR(40),
    genre VARCHAR(40),
    PRIMARY KEY(bookID),
    FOREIGN KEY(authorID) REFERENCES Author(authorID)
);

CREATE TABLE IF NOT EXISTS Info(
    bookID INT,
    totalSold INT,
    rating DECIMAL,
    price DECIMAL,
    releaseDate DATE,
    FOREIGN KEY(bookID) REFERENCES Book(bookID)
);