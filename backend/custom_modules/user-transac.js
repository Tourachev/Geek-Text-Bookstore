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
const NOT_UNIQUE = 45017; // error num for unique constraint from mariadb
const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'virt-servers.mynetgear.com',
    port: 30000,
    user: 'team8',
    password: 'WehaveControl',
    database: 'GeekTextDB',
    connectionLimit: 2,
    dateStrings: 'date'
    //rowsAsArray: true
});

/*
    This functions performs a transaction to create a user.
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
    var query = 'insert into paymentinfo values(?, ?, ?, ?, ?)';

    var fields = [info.userid, info.ccnum, info.cvv, info.name, info.zip, info.expdate];

    pool.query()
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
async function remPaymentInfo(info, callback) {
    var query = 'delete from paymentinfo where ccnum=? and userid=?';

    pool.query(query, [info.ccnum, info.userid])
        .then(res => {
            callback(null, res);
        })
        .catch(err => {
            console.log(err, null);
        });
}

/*
    This function adds a shipping address to the specified user.
    --------------------------------------------------------------

    param:  info - json including shipping address and specified user 
            callback - function that will include the result or error
*/
async function addShippingAddress(info, callback) {
    var query = 'insert into shipaddresses values(?, ?, ?, ?, ?)';

    var fields = [info.username, info.state, info.city, info.address, info.zip];

    pool.query(query, fields)
        .then(res => {
            callback(null, 2); // address added
        })
        .catch(err => {
            if (err.errno === NOT_UNIQUE) {
                callback(null, 1); // address already exists (for specified user)
            } else {
                callback(err, null);
            }
        })
}

/*
    This function removes a shipping address from user.
    -----------------------------------------------------------------

    param:  info - info about which address to delete
            callback - function to return result
*/
async function remShippingAddress(info, callback) {
    var query = 'delete from shipaddresses where ('
                + 'address=? and userid=? and state=? and city=? and zip=?)';

    var data = [info.address, info.userid, info.state, info.city, info.zip];
    
    pool.query(query, data)
        .then(res => {
            callback(null, res);
        })
        .catch(err => {
            callback(err, null);
        })
}

module.exports = { 
    createUser, login, remPaymentInfo, addPaymentInfo, addShippingAddress,
    remShippingAddress 
};
