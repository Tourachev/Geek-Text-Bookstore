const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "books_api",
  password: "alex1230",
  port: 5432
});

const getComments = (request, response) => {
  pool.query("SELECT * FROM comments ORDER BY date DESC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getCommentsBySlug = (request, response) => {
  const slug = request.params.slug;

  pool.query(
    "SELECT * FROM comments WHERE slug = $1 ORDER BY date DESC",
    [slug],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createComment = (request, response) => {
  const { name, slug, text } = request.body;
  const parentCommentId = parseInt(request.body.parentCommentId);

  pool.query(
    "INSERT INTO comments (name, slug, text, parent_comment_id) VALUES ($1, $2, $3, $4)",
    [name, slug, text, parentCommentId],
    error => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .json({ status: "success", message: "New comment added." });
    }
  );
};

const updateComment = (request, response) => {
  const { name, slug, text } = request.body;
  const id = parseInt(request.params.id);
  const parentCommentId = parseInt(request.body.parentCommentId);

  pool.query(
    "UPDATE comments SET name = $1, slug = $2, text = $3, parent_comment_id = $4 WHERE id = $5",
    [name, slug, text, parentCommentId, id],
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

const deleteComment = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM comments WHERE id = $1", [id], error => {
    if (error) {
      throw error;
    }
    response
      .status(200)
      .json({ status: "success", message: `Comment deleted with ID: ${id}` });
  });
};

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
  const values = [request.body.name, request.body.message, request.body.rating]
  pool.query(
    `INSERT INTO comment (name, message, rating) VALUES ($1, $2, $3)`,
    values,
    (error, results)=> {
      if (error ) {
        throw error;
      }
      response
        .status(201)
        .json(results.rows);
    }
  );
};

// From the table comment update the message and names
const updatecomment = (request, response) => {
  //const { name, message, rating } = request.body;
  const values = [request.body.name, request.body.message, request.body.rating]
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
  getComments,
  getCommentsBySlug,
  createComment,
  updateComment,
  deleteComment,
  getComment,
  getCommentById,
  createcomment,
  updatecomment,
  deletecomment
};
