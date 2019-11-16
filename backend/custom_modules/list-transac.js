const NOT_UNIQUE = 1062; // error num for unique constraint from mariadb
const mariadb = require('mariadb');
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
        });
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
        });
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
        });
}

/* getWishLists
 *-----------------------------------------------------
 * Get wishlist for users.
 * 
 * params: userid - userid to get wishlists of
 *         callback - callback function to return values
 * 
 * return: wishlists or null(error)
 */
async function getWishLists(info, callback) {

    var query = 'select * from wishlist where userid=? and listnum=?';

    var i;
    var names = [];
    var query2 = 'select listname from listnames where userid=? order by listnum';

    var data = {books: [], names: []};


    pool.query(query, [info.userid, info.listnum])
        .then(res1 => {
            res1 = res1.splice(0, res1.length);
            data.books = res1;
            pool.query(query2, [info.userid])
                .then(res2 => {
                    res2 = res2.splice(0, res2.length);
                    for (i = 0; i <= 2; i++) {
                        names.push(res2[i].listname);
                    }
                    data.names = names;
                    callback(null, data);
                })
                .catch(err => {
                    callback(err, null);
                })
            
        })
        .catch(err => {
            callback(err, null);
        });
}

/* removeFromWish
 *--------------------------------------------
 * Remove a book from a specified wishlist.
 * 
 * params: info - json containing listnum, bookid, userid
 *         callback - callback function to return result
 * 
 * return: null(error) or result(success)
 */
async function removeFromWish(info, callback) {

    var query = "delete from wishlist where listnum=? and bookid=? and userid=?";
    var fields = [
        info.listnum, info.bookid, info.userid
    ];

    pool.query(query, fields)
        .then(res => {
            callback(null, res); //book deleted from list
        })
        .catch(err => {
            callback(err, null); //query error
        });
}

async function toCart() {
    var query = "";
}

async function getListNames(info, callback) {
    //ascending order by default 1 - 3
    var names = [];
    var i;
    var query = 'select listname from listnames where userid=? order by listnum';

    pool.query(query, [info.userid])
        .then(res => {
            res = res.splice(0, res.length);
            for (i = 0; i <= 2; i++) {
                names.push(res[i].listname);
            }
            callback(null, names);
        })
        .catch(err => {
            callback(err, null);
        });
}

module.exports = {
    wishToWish,
    addToWish,
    nameList,
    getWishLists,
    toCart,
    removeFromWish,
    getListNames
};