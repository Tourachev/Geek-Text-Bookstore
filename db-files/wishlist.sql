use geektext;

create table if not exists wishlist
(
    bookid int,
    userid varchar(40),
    title varchar(400),
    listnum int(1) check (listnum < 4 and listnum > 0),
    foreign key(userid) references credentials(userid)
        on update cascade,
    foreign key(bookid) references book(bookid),
    constraint list_const unique(bookid, userid, listnum)
);

create table if not exists listnames
(
    listnum int(1),
    listname varchar(60),
    userid varchar(40),
    foreign key(userid) references credentials(userid)
        on update cascade,
    constraint name_const unique(listnum, userid)
);