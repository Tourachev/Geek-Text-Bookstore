-- create table comment (
--   id serial primary key,
--   name varchar(30),
--   message varchar(200),
--   date timestamptz default now()
-- );
-- insert into comment (name, message)
-- values
--   ('Alex', 'This book is amazing!!!');
-- insert into comment (name, message)
-- values
--   ('Kevin', 'I recommended this book.');
-- insert into comment (name, message)
-- values
--   (
--     'Amanda',
--     'I love this book and my kids loves it. '
--   );
--  select *
--  from comment
delete from comment
where id = 23

-- UPDATE comment SET  name = 'Ashley', message = 'cant wait to read this book!'
-- where id = 18