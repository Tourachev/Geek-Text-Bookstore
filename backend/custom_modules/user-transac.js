/*
    This module defines user profile transactions:
        Creation of accounts
        Updating of user info (password change, email change,
            home address change)
        Modification of payment info
        Modification of shipping addresses
*/

const bcrypt = require('bcrypt');
const saltRounds = 10;
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

/*
    This function performs a transaction to create a user.
    It checks first if username is taken, if it isn't it continues
    to profile info. The second step checks if the email is taken, if not
    then account is created and committed, otherwise it rolls back
    username insertion.
*/
async function createUser(info, callback) {
    bcrypt.hash(info.values.Password, saltRounds, function(err, hash) {
        var step1 = 'insert into credentials values(?, ?)';
        var cols = [
            info.values.UserName,
            info.values.Email,
            info.values.FirstName,
            info.values.LastName,
            info.values.State,
            info.values.City,
            info.values.Address,
            info.values.NickName
        ];
        var step2 = 'insert into userinfo values(?, ?, ?, ?, ?, ?, ?, ?)';

        pool.getConnection()
            .then(conn => {
                conn.query(step1, [info.values.UserName, hash])
                    .then(() => {
                        conn.query(step2, cols)
                            .then(() => {
                                conn.commit();
                                conn.release();
                                callback(null, 3); //3 - success
                            })
                            .catch(err => {
                                conn.rollback();
                                conn.release();
                                callback(err, 2); //2 - email taken
                            });
                    })
                    .catch(err => {
                        conn.rollback();
                        conn.release();
                        callback(err, 1); //1 - username taken
                    });
            })
            .catch(err => {
                callback(err, 0); //0 - connection error
            });
    });
}

/*
    check if username exists, then extract hashed pw, then test it
*/
async function login(info, callback) {
    var query = 'select password from credentials where userid=?';
    pool.query(query, [info.username])
        .then(res => {
            if (res.length > 0) {
                bcrypt.compare(info.password, res[0].password, function(
                    err,
                    result
                ) {
                    if (result === true) {
                        callback(null, 3); //success!
                    } else {
                        callback(null, 2); //wrong password
                    }
                });
            } else {
                callback(null, 1); //username does not exist
            }
        })
        .catch(err => {
            callback(err, null);
        });
}

async function addPaymentInfo(info, callback) {
    var query = 'insert into paymentinfo values(?, ?, ?, ?, ?, ?)';

    var fields = [
        info.username,
        info.ccnum,
        info.cvv,
        info.name,
        info.zip,
        info.expdate
    ];

    pool.query(query, fields)
        .then(res => {
            callback(null, res);
        })
        .catch(err => {
            callback(err, null);
        });
}

/*
    This function removes a certain credit card from a specific user.
    It uses the ccnum and primary key and userid as foreign key.
    ------------------------------------------------------------------

    param:  info - json including ccnum and userid
            callback - function that will include the result or error
*/
async function delPaymentInfo(info, callback) {
    var query = 'delete from paymentinfo where ccnum=? and userid=?';

    pool.query(query, [info.ccnum, info.username])
        .then(res => {
            callback(null, res);
        })
        .catch(err => {
            callback(err, null);
        });
}

/*
    This function adds a shipping address to the specified user.
    --------------------------------------------------------------

    param:  info - json including shipping address and specified user 
            callback - function that will include the result or error
*/
async function addAddress(info, callback) {
    var query = 'insert into addresses values(?, ?, ?, ?, ?)';

    var fields = [info.username, info.state, info.city, info.address, info.zip];

    pool.query(query, fields)
        .then(res => {
            callback(null, 2); // address added
        })
        .catch(err => {
            if (err.errno === NOT_UNIQUE) {
                callback(null, 1); // duplicate address
            } else {
                callback(err, null);
            }
        });
}

/*
    This function removes a shipping address from user.
    -----------------------------------------------------------------

    param:  info - info about which address to delete
            callback - function to return result
*/
async function delAddress(info, callback) {
    var query =
        'delete from addresses where (' +
        'address=? and userid=? and state=? and city=? and zip=?)';

    var data = [info.address, info.username, info.state, info.city, info.zip];

    pool.query(query, data)
        .then(res => {
            callback(null); // query successful
        })
        .catch(err => {
            callback(err); // query error
        });
}

async function getAddresses(username, callback) {
    var query =
        'select state, city, address, zip from addresses where userid=?';

    pool.query(query, [username])
        .then(res => {
            callback(null, res);
        })
        .catch(err => {
            callback(err, null);
        });
}

async function getPaymentInfo(username, callback) {
    var query =
        'select ccnum, cvv, name, zip, expdate from paymentinfo where userid=?';

    pool.query(query, [username])
        .then(res => {
            callback(null, res);
        })
        .catch(err => {
            callback(err, null);
        });
}

async function editPersonalInfo(info, callback) {
    var query =
        'update userinfo set userid=?, email=?, fname=?, lname=?, nickname=? where userid=?';

    var data = [
        info.username,
        info.email,
        info.fname,
        info.lname,
        info.nickname,
        info.username
    ];
    pool.query(query, data)
        .then(res => {
            callback(null, res);
        })
        .catch(err => {
            callback(err, null);
        });
}

async function editPaymentInfo(info, callback) {
    var query =
        'update paymentinfo set (ccnum=?, cvv=?, name=?, zip=?, expdate=?)' +
        'where userid=?';

    var data = [info.ccnum, info.cvv, info.name, info.zip, info.expdate];
    pool.query(query, data)
        .then(res => {
            callback(null, res);
        })
        .catch(err => {
            callback(err, null);
        });
}

async function getCart(info, callback) {
    var query = 'select * from shoppingcart where userid=?';
    pool.query(query, [info.username])
        .then(result => {
            callback(null, result);
        })
        .catch(err => {
            callback(err, null);
        });
}

async function addToCart(info, callback) {
    var query =
        'insert into shoppingcart(userid, bookid, quantity, price, title) values(?,?,?,?,?)';
    var query2 =
        'update shoppingcart set quantity = quantity + 1 where userid=? and bookid=?';
    var fields = [
        info.username,
        info.bookID,
        info.quantity,
        info.price,
        info.title
    ];

    pool.query(query, fields)
        .then(res => {
            console.log(res);
            callback(null, 2); //book added
        })
        .catch(err => {
            if (err.errno === NOT_UNIQUE) {
                pool.query(query2, [info.username, info.bookID])
                    .then(result => {
                        callback(null, 1); //quantity updated
                    })
                    .catch(err => {
                        callback(err, null);
                    });
            } else {
                callback(err, null);
            }
        });
}

async function editQuantity(info, callback) {
    var query =
        'update shoppingcart set quantity=?, price=?, title=? where userid=? and bookid=?';

    var fields = [
        info.quantity,
        info.price,
        info.title,
        info.userid,
        info.bookid
    ];
    pool.query(query, fields)
        .then(res => {
            callback(null, res);
        })
        .catch(err => {
            callback(err, null);
        });
}

async function delCartItems(info, callback) {
    var query = 'delete from shoppingcart where (' + 'userid=? and bookid=?)';

    var data = [info.userid, info.bookid];
    console.log('I WORKED');
    pool.query(query, data)
        .then(res => {
            callback(null); // query successful
        })
        .catch(err => {
            console.log(err);
        });
}

async function getLater(info, callback) {
    var query = 'select * from saveforlater where userid=?';
    pool.query(query, [info.username])
        .then(result => {
            callback(null, result);
        })
        .catch(err => {
            callback(err, null);
        });
}

async function delLater(info, callback) {
    var query = 'delete from saveforlater where (' + 'userid=? and bookid=?)';

    var data = [info.userid, info.bookid];
    console.log('I WORKED');
    pool.query(query, data)
        .then(res => {
            callback(null); // query successful
        })
        .catch(err => {
            console.log(err);
        });
}

//This query does the entire transaction, based on only userid and bookid

async function cartToWish(info, callback) {
    var step1 =
        'select userid, bookid, quantity, price, title from shoppingcart where userid=? and bookid=?';
    var entry;
    var step2 =
        'insert into wishlist(userid, bookid, quantity, price, title)' +
        'values(?,?,?,?,?)';
    var step3 = 'delete from shoppingcart where userid=? and bookid=?';

    pool.query(step1, info)
        .then(res => {
            entry = [
                res[0].userid,
                res[0].bookid,
                res[0].quantity,
                res[0].price,
                res[0].title
            ];
            pool.getConnection()
                .then(con => {
                    con.query(step2, entry)
                        .then(() => {
                            con.query(step3, info)
                                .then(() => {
                                    con.commit();
                                    con.release();
                                    callback(null, 5); //sucess
                                })
                                .catch(err => {
                                    con.rollback();
                                    con.release();
                                    callback(err, 4); //error in step3
                                });
                        })
                        .catch(err => {
                            con.rollback();
                            con.release();
                            callback(err, 3); //error in step 2
                        });
                })
                .catch(err => {
                    con.rollback();
                    con.release();
                    callback(err, 2); //error in step 1
                });
        })
        .catch(err => {
            callback(err, 1); //error making connection
        });
}

async function addToWish(info, callback) {
    var fields = [
        info.userid,
        info.bookid,
        info.quantity,
        info.price,
        info.title
    ];
    var step1 =
        'insert into wishlist(userid, bookid, quantity, price, title)' +
        'values(?,?,?,?,?)';
    var step2 =
        'update wishlist set quantity=quantity+1 where userid=? and bookid=?';
    pool.query(step1, fields)
        .then(res => {
            callback(null, 4); //successfully added to wishlist
        })
        .catch(err => {
            if (err.errno == NOT_UNIQUE) {
                pool.query(step2, [info.userid, info.bookid])
                    .then(res => {
                        callback(null, 3); //quantity updated
                    })
                    .catch(err => {
                        callback(err, 2); //error updating wishlist quantity
                    });
            } else {
                callback(err, 1); //error making connection
            }
        });
}

async function addToLater(info, callback) {
    var fields = [info.userid, info.bookid, info.price, info.title];

    var step1 =
        'insert into saveforlater(userid, bookid, price, title)' +
        'values(?,?,?,?)';
    var step2 =
        'update saveforlater set quantity=quantity+1 where userid=? and bookid=?';
    pool.query(step1, fields)
        .then(res => {
            callback(null, 4); // successfully added to wishlist
        })
        .catch(err => {
            if (err.errno == NOT_UNIQUE) {
                pool.query(step2, [info.userid, info.bookid])
                    .then(res => {
                        callback(null, 3);
                    })
                    .catch(err => {
                        callback(err, 2);
                    });
            } else {
                callback(err, 1); //error making connection
            }
        });
}

async function cartToLater(info, callback) {
    var step1 =
        'select userid, bookid, price, title from shoppingcart where userid=? and bookid=?';
    var entry;
    var step2 =
        'insert into saveforlater(userid, bookid, price, title)' +
        'values(?,?,?,?)';
    var step3 = 'delete from shoppingcart where userid=? and bookid=?';

    pool.query(step1, info)
        .then(res => {
            entry = [
                res[0].userid,
                res[0].bookid,
                res[0].price,
                res[0].title
            ];
            pool.getConnection()
                .then(con => {
                    con.query(step2, entry)
                        .then(() => {
                            con.query(step3, info)
                                .then(() => {
                                    con.commit();
                                    con.release();
                                    callback(null, 5); //sucess
                                })
                                .catch(err => {
                                    con.rollback();
                                    con.release();
                                    callback(err, 4); //error in step3
                                });
                        })
                        .catch(err => {
                            con.rollback();
                            con.release();
                            callback(err, 3); //error in step 2
                        });
                })
                .catch(err => {
                    con.rollback();
                    con.release();
                    callback(err, 2); //error in step 1
                });
        })
        .catch(err => {
            callback(err, 1); //error making connection
        });
}

module.exports = {
    createUser,
    login,
    delPaymentInfo,
    addPaymentInfo,
    addAddress,
    delAddress,
    getAddresses,
    getPaymentInfo,
    editPaymentInfo,
    editPersonalInfo,
    getCart,
    addToCart,
    delCartItems,
    editQuantity,
    cartToWish,
    addToWish,
    addToLater,
    cartToLater,
    getLater,
    delLater
};
