const NOT_UNIQUE = 1062; // error num for unique constraint from mariadb
const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: "virt-servers.mynetgear.com",
  port: 30000,
  user: "team8",
  password: "WehaveControl",
  database: "geektext",
  connectionLimit: 2,
  dateStrings: "date"
  //rowsAsArray: true
});

async function getComments(info, callback) {
  //callback if a function in router
  var query = "SELECT * FROM comments WHERE bookid=?";
  pool
    .query(query, [info.bookid])
    .then(res => {
      // use the splice function to cut out the last member
      // of resulting array form query, (its just metadata)
      callback(null, res.splice(0, res.length)); //return result in second param
    })
    .catch(err => {
      callback(err, null); //return error in first param
    });
}

// async function getCommnetByslug(info, callback) {
//     // replace the $ from postgresql to ? for mariadb
//     var query = 'SELECT * FROM comments WHERE slug = ? ORDER BY date DESC';
//     pool.query(query, [info.slug])
//         .then(res => {
//             callback(null, res.splice(0, res.length)); //return result in second param
//         })
//         .catch(err => {
//             callback(err, null); //return result in second param
//         });
// }

//FROM the comments table create a new comment inseting the message and rating
async function addComment(info, callback) {

  //  var cols = [info.body.message, info.body.name, info.body.rating]
  // const newbookid = info.match.params.bookid;
  //callback if a function in router
  const bookid = parseInt(info.params.bookid);

  var query = "insert into comments values(?, ?, ?, ?)";
  pool
    .query(query, [bookid, info.message, info.name, info.rating ])
    .then(res => {
      // use the splice function to cut out the last member
      // of resulting array form query, (its just metadata)
      callback(null, res.splice(0, res.length)); //return result in second param
    })
    .catch(err => {
      callback(err, null); //return error in first param
    });
}

module.exports = {
  getComments,
  addComment
  //   getCommenyBySlug
};
