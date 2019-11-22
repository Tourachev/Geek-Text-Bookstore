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
  var query = 'select * from comments where bookid=?';
  pool.query(query, [info.bookid])
      .then(result => {
          callback(null, result);
      })
      .catch(err => {
          callback(err, null);
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

  //  var cols = [ info.body.userid, info.body.comment, info.body.nickname, info.body.rating]
  // const newbookid = info.match.params.bookid;
  //callback if a function in router
   const bookid = parseInt(info.bookid);

  var query = `INSERT INTO comments (userid, nickname, comment, bookid, rating) VALUES(?, ?, ?, ?, ?)`;
  pool
<<<<<<< HEAD
    .query(query, [info.body.userid, info.body.nickname, info.body.comment, bookid, info.body.rating ])
=======
    .query(query, [info.bookid, info.message, info.name, info.rating, info.userid ])
>>>>>>> parent of 2bd09762... updating comment
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
