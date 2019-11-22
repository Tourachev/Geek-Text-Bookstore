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

async function getList(info, callback) {
    var query = `
    SELECT B.imagelink, B.bookid, B.title
    FROM (
        (SELECT * FROM wishlist WHERE userid=? AND listnum=?) as A
        JOIN
        (SELECT imagelink, bookid, title FROM book) as B
        ON A.bookid=B.bookid 
    )`;
    pool.query(query, [info.userid, info.listnum])
    .then(res => {
        callback(null, res.splice(0, res.length));
    })
    .catch(err => {
        callback(err, null);
    })
}

async function toWish(info, callback) {
    var step1 = 'DELETE FROM wishlist WHERE bookid=? AND userid=? AND listnum=?';
    var step2 = 'INSERT INTO wishlist VALUES(?,?,?)';

    pool.getConnection()
    .then(con => {
        con.beginTransaction()
        .then(() => {
            con.query(step1, [info.bookid, info.userid, info.listnum])
            .then(() => {
                con.query(step2, [info.bookid, info.userid, info.othernum])
                .then(() => {
                    con.commit();
                    con.release();
                    callback(null, true);
                })
                .catch(err => {
                    con.commit();
                    con.release();
                    callback(null, false);})
            })
            .catch(err => {
                con.rollback();
                con.release();
                callback(err, null);})
        })
        .catch(err => {
            callback(err, null);})
    })
    .catch(err => {callback(err, null);})
}

async function remove(info, callback) {
    var query = 'DELETE FROM wishlist WHERE userid=? AND listnum=? AND bookid=?';
    console.log(query);
    pool.query(query, [info.userid, info.listnum, info.bookid])
    .then(() => {
        callback(null, true);
    })
    .catch(err => {
        callback(err, null);
    })
}

async function toCart(info, callback) {
    var price;
    var getPrice = 'SELECT price FROM book WHERE bookid=?';
    var step1 = 'DELETE FROM wishlist WHERE userid=? AND listnum=? AND bookid=?';
    var step2 = `INSERT INTO shoppingcart(userid, bookid, quantity, price, title)
    VALUES(?,?,?,?,?)`;
    var step3 = `UPDATE shoppingcart SET quantity=(quantity + 1) 
    WHERE userid=? AND bookid=?`;

    pool.query(getPrice, [info.bookid])
    .then(res => {
        price = res[0].price;
    })
    .catch(err => {
        callback(err, null);
    })

    pool.getConnection()
    .then(con => {
        con.beginTransaction()
        .then(() => {
            con.query(step1, [info.userid, info.listnum, info.bookid])
            .then(() => {
                con.query(step2, [info.userid, info.bookid, 1, price, info.title])
                .then(() => {
                    con.commit();
                    con.release();
                    callback(null, true);
                })
                .catch(err => {
                    if (err.errno == NOT_UNIQUE) {
                        con.query(step3, [info.userid, info.bookid])
                        .then(() => {
                            con.commit();
                            con.release();
                            callback(null, true);
                        })
                        .catch(err => {
                            callback(err, null);
                        })
                    }
                    else {
                        con.rollback();
                        con.release();
                        callback(err, null);
                    }
                })
            })
            .catch(err => {
                con.rollback();
                con.release();
                callback(err, null);})
        })
        .catch(err => {callback(err, null);})
    })
    .catch(err => {callback(err, null);})
}

async function rename(info, callback) {
    var query = 'UPDATE listnames SET listname=? WHERE userid=? and listnum=?';
    pool.query(query, [info.listname, info.userid, info.listnum])
    .then(res => {
        callback(null, res.splice(0, res.length));
    })
    .catch(err => {
        callback(err, null);
    })
}

async function getNames(info, callback) {
    var query = 'SELECT listname FROM listnames WHERE userid=?';
    pool.query(query, [info.userid])
    .then(res => {
        callback(null, [res[0].listname, res[1].listname, res[2].listname]);
    })
    .catch(err => {
        callback(err, null);
    })
}

async function mount(info, callback) {
    var data = {
        list1: [],
        list2: [],
        list3: [],
        names: []
    }

    var query1 = `
    SELECT B.imagelink, B.bookid, B.title
    FROM (
        (SELECT * FROM wishlist WHERE userid=? AND listnum=?) as A
        JOIN
        (SELECT imagelink, bookid, title FROM book) as B
        ON A.bookid=B.bookid 
    )`;
    var query2 = 'SELECT listname FROM listnames WHERE userid=?';

    pool.getConnection()
    .then(con => {
        con.beginTransaction()
        .then(() => {
            con.query(query1, [info.userid, 1])
            .then(res1 => {
                data.list1 = res1.splice(0, res1.length);
                con.query(query1, [info.userid, 2])
                .then(res2 => {
                    data.list2 = res2.splice(0, res2.length);
                    con.query(query1, [info.userid, 3])
                    .then(res3 => {
                        data.list3 = res3.splice(0, res3.length);
                        con.query(query2, [info.userid])
                        .then(res4 => {
                            data.names = [res4[0].listname, res4[1].listname, res4[2].listname];
                            con.commit()
                            con.release()
                            callback(null, data);
                        })
                        .catch(err => {
                            con.rollback();
                            con.release();
                            callback(err, null);})
                    })
                    .catch(err => {
                        con.rollback();
                        con.release();
                        callback(err, null);})
                })
                .catch(err => {
                    con.rollback();
                    con.release();
                    callback(err, null);})
            })
            .catch(err => {
                con.rollback();
                con.release();
                callback(err, null);})
        })
        .catch(err => {callback(err, null);})
    })
    .catch(err => {callback(err, null);})
}

async function addToWish(info, callback) {
    pool.query('insert into wishlist values(?,?,?)', [info.bookid, info.userid, info.listnum])
    .then(res => {
        callback(null, false);
    })
    .catch(err => {
        if (err.errno == NOT_UNIQUE) {
            callback(null, false);
        } else {
            callback(err, null);
        }
    })
}


module.exports = {
    toWish,
    toCart,
    remove,
    getList,
    rename,
    getNames,
    mount
};