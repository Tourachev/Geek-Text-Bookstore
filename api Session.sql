-- create table comment (
--   id serial primary key,
--   name varchar(30),
--   message varchar(200),
--   rating INTEGER
-- );
-- insert into comment (name, message, rating)
-- values
--   ('Alex', 'This book is amazing!!!', 5);
-- insert into comment (name, message, rating)
-- values
--   ('Kevin', 'I recommended this book.', 4);
-- insert into comment (name, message, rating)
-- values
--   (
--     'Amanda',
--     'I love this book and my kids loves it. ', 3
--   );
--  select *
--  from comment
delete from comment
where id = 78


-- UPDATE comment SET  name = 'Ashley', message = 'cant wait to read this book!'
-- where id = 18

-- INSERT INTO comment (name, message) VALUES ('julia', 'I read this book many times, I love it!!')