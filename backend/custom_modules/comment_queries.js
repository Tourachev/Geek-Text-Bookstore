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
  var query = "select * from comments where bookid=?";
  pool
    .query(query, [info.bookid])
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
  //callback if a function in router
  var query = `INSERT INTO comments (userid, nickname, comment, bookid, rating) VALUES(?, ?, ?, ?, ?)`;
  pool
    .query(query, [
      info.userid,
      info.nickname,
      info.comment,
      info.bookid,
      info.rating
    ])
    .then(res => {
      // use the splice function to cut out the last member
      // of resulting array form query, (its just metadata)
      console.log(res);
      callback(null, res); //return result in second param
    })
    .catch(err => {
      callback(err, null); //return error in first param
    });
}

async function isPurchased(info, callback) {
  //callback if a function in router
  var query = "SELECT * FROM purchase  WHERE bookid=? AND userid=?";
  pool
    .query(query, [
      info.userid,
      info.bookid,
    ])
    .then(res => {
      // use the splice function to cut out the last member
      // of resulting array form query, (its just metadata)
      console.log(res);
      callback(null, res); //return result in second param
    })
    .catch(err => {
      callback(err, null); //return error in first param
    });
}

async function PurchasedBook(info, callback) {
  //callback if a function in router
  var query = `INSERT INTO purchase (bookid, userid) VALUES(?, ?)`;
  pool
    .query(query, [
      info.userid,
      info.bookid,
    ])
    .then(res => {
      // use the splice function to cut out the last member
      // of resulting array form query, (its just metadata)
      console.log(res);
      callback(null, res); //return result in second param
    })
    .catch(err => {
      callback(err, null); //return error in first param
    });
}

module.exports = {
  getComments,
  addComment,
  isPurchased,
  PurchasedBook
  //   getCommenyBySlug
};
