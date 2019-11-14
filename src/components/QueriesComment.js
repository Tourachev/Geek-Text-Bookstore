// const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "books_api",
//   password: "#####",
//   port: 5432
// });

/*************comment Table ******************* */
// Table comment get all the names and messages
const getComment = (request, response) => {
  pool.query("SELECT * FROM comment ORDER BY rating DESC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// From Table comment get message by ID
const getCommentById = (request, response) => {
  const id = request.params.id;

  pool.query(
    "SELECT * FROM comment WHERE id = $1 ORDER BY rating DESC",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

//FROM the comment table create a new message and name
const createcomment = (request, response) => {
  // const { name, message, date } = request.body;
  const values = [request.body.name, request.body.message, request.body.rating];
  pool.query(
    `INSERT INTO comment (name, message, rating) VALUES ($1, $2, $3)`,
    values,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json(results.rows);
    }
  );
};

// From the table comment update the message and names
const updatecomment = (request, response) => {
  //const { name, message, rating } = request.body;
  const values = [request.body.name, request.body.message, request.body.rating];
  const id = parseInt(request.params.id);

  pool.query(
    "UPDATE comment SET name = '$1', message = '$2', rating = $3 WHERE id = $4",
    [values, id],
    error => {
      if (error) {
        throw error;
      }
      response.status(200).json({
        status: "success",
        message: `Comment modified with ID: ${id}`
      });
    }
  );
};

//from the comment table delete the message and name
const deletecomment = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM comment WHERE id = $1", [id], error => {
    if (error) {
      throw error;
    }
    response
      .status(200)
      .json({ status: "success", message: `Comment deleted with ID: ${id}` });
  });
};

module.exports = {
  getComment,
  getCommentById,
  createcomment,
  updatecomment,
  deletecomment
};

/********THIS IS SQL AND TABLE FOR THE COMMENT component********** */

// -- create table comment (
//     --   id serial primary key,
//     --   name varchar(30),
//     --   message varchar(200),
//     --   rating INTEGER
//     -- );
//     -- insert into comment (name, message, rating)
//     -- values
//     --   ('Alex', 'This book is amazing!!!', 5);
//     -- insert into comment (name, message, rating)
//     -- values
//     --   ('Kevin', 'I recommended this book.', 4);
//     -- insert into comment (name, message, rating)
//     -- values
//     --   (
//     --     'Amanda',
//     --     'I love this book and my kids loves it. ', 3
//     --   );
//     --  select *
//     --  from comment
//     -- delete from comment
//     -- where id = 29

//     -- UPDATE comment SET  name = 'Ashley', message = 'cant wait to read this book!'
//     -- where id = 18

//     -- INSERT INTO comment (name, message) VALUES ('julia', 'I read this book many times, I love it!!')
