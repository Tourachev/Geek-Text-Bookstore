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

/*wishToWish
 *---------------------------------------------------------
 * Moves book from one wish list to another.
 * 
 * params: info - json containing bookid, userid, title, 
 *                listnum, and new listnum
 *         callback - callback function to return result
 * 
 * return: 1 (success) 0 (failure)
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
                            callback(null, 3); //success! book moved
                        })
                        .catch(err => {
                            conn.rollback();
                            conn.release();
                            callback(err, 2); //error inserting book into new list
                        })
                })
                .catch(err => {
                    conn.rollback();
                    conn.release();
                    callback(err, 1); //error deleting book from original list
                })
        })
        .catch(err => {
            callback(err, null);
        })
}

module.exports = {
    wishToWish
};