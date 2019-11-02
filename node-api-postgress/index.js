const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3002;
const db = require("./queries");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/comments", db.getComments);
app.get("/comments/:slug", db.getCommentsBySlug);
app.post("/comments", db.createComment);
app.put("/comments/:id", db.updateComment);
app.delete("/comments/:id", db.deleteComment);

// From the comment Table the routes
app.get("/comment", db.getComment);
app.get("/comment/:id", db.getCommentById);
app.post("/comment", db.createcomment);
app.put("/comment/:id", db.updatecomment);
app.delete("/comment/:id", db.deletecomment);

/**THIS HERE IS JUST A TEST DATA COMMENTS */
// app.get("/api/comments", (req, res) => {
//   const comments = [
//     {
//       id: 1,
//       name: "Alex",
//       message: "I love this book!!"
//     },
//     {
//       id: 2,
//       name: "Kevin",
//       message: "I recommended this book!!"
//     },
//     {
//       id: 3,
//       name: "Alex",
//       message: "You have to buy this book!!"
//     }
//   ];

//   res.json(comments);
// });

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
