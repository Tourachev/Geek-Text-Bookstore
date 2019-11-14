const NOT_UNIQUE = 1062; // error num for unique constraint from mariadb
const mariadb = require('mariadb');
const NOT_UNIQUE = 1062; // error num for unique constraint from mariadb
const pool = mariadb.createPool({
    host: 'virt-servers.mynetgear.com',
    port: 30000,
    user: 'team8',
    password: 'WehaveControl',
    database: 'geektext',
    connectionLimit: 2,
    dateStrings: 'date'
    //rowsAsArray: true
});

/* wishToWish
 *---------------------------------------------------------
 * Moves book from one wish list to another.
 * 
 * params: info - json containing bookid, userid, title, 
 *                listnum, and new listnum
 *         callback - callback function to return result
 * 
 * return: int representing result or null(error)
 */
async function wishToWish(info, callback) {

    var step1 = "delete from wishlist where bookid=? and userid=? and listnum=?";
    var step2 = "insert into wishlist values(?,?,?,?,?)";
    var original = [
        info.bookid, info.userid, info.listnum
    ];
    var newList = [
        info.bookid, info.userid, info.title, info.listnum
    ];

    pool.getConnection()
        .then(conn => {
            conn.query(step1, original)
                .then(() => {
                    conn.query(step2, newList)
                        .then(() => {
                            conn.commit();
                            conn.release();
                            callback(null, 1); //success! book moved
                        })
                        .catch(err => {
                            conn.rollback();
                            conn.release();
                            callback(err, null); //error inserting book into new list
                        })
                })
                .catch(err => {
                    conn.rollback();
                    conn.release();
                    callback(err, null); //query error
                })
        })
        .catch(err => {
            callback(err, null); //query error
        })
}

/* addToWish
 *----------------------------------------------------------------------------
 * Add a book to the specified wishlist.
 * 
 * params: info - json containing bookid, userid, title, listnum
 *         callback - callback function to return result
 * 
 * return: int representing result or null(error)
 */
async function addToWish(info, callback) {

    var query = "insert into wishlist values(?,?,?,?)";
    var fields = [
        info.bookid, info.userid, info.title, info.listnum
    ];

    pool.query(query, fields)
        .then(res => {
            callback(null, 2); //book added to wishlist
        })
        .catch(err => {
            if (err.errno == NOT_UNIQUE) {
                callback(err, 1); //book already in list
            } else {
                callback(err, null) //query error
            }
        })
}

/* nameList
 *------------------------------------------------------------------
 * Name a wishlist or rename one.
 *
 * params: info - json containing listnum, listname, userid
 * 
 * return: null(failed) or int(success)
 */
async function nameList(info, callback) {

    var step1 = "insert into listnames values(?,?,?)";
    var step2 = "update listnames set listname=? where listnum=? and userid=?";
    var fields1 = [
        info.listnum, info.listname, info.userid
    ];
    var fields2 = [
        info.listname, info.listnum, info.userid
    ];

    pool.getConnection()
        .then(conn => {
            conn.query(step1, fields1)
                .then(() => {
                    conn.commit();
                    conn.release();
                    callback(null, 2); //newly named list (first time)
                })
                .catch(err => {
                    if (err.errno == NOT_UNIQUE) {
                        conn.query(step2, fields2)
                            .then(() => {
                                conn.commit();
                                conn.release();
                                callback(null, 1); //list name updated
                            })
                            .catch(err => {
                                conn.rollback();
                                conn.release();
                                callback(err, null); //query error
                            })
                    } else {
                        conn.rollback();
                        conn.release();
                        callback(err, null); //query error
                    }
                })
        })
        .catch(err => {
            callback(err, null); //query error
        })
}

module.exports = {
    wishToWish,
    addToWish,
    nameList
};