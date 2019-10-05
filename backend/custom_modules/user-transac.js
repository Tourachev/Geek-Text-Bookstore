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

    /*

    var step1 = "insert into credentials values(?, ?)";
    var cols = [info.values.UserName, info.values.Email, info.values.FirstName, info.values.LastName,
         info.values.State, info.values.City, info.values.Address, info.values.NickName];
    var step2 = "insert into userinfo values(?, ?, ?, ?, ?, ?, ?, ?)";

    pool.getConnection()
      .then(conn => {
        conn.query(step1, [info.values.UserName, hashedpw])
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
            })
          })
          .catch(err => {
            conn.rollback();
            conn.release();
            callback(err, 1); //1 - username taken
          })
      })
      .catch(err => {
        callback(err, 0); //0 - connection error
      })*/
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
                        callback(null, info.username, 3); //success!
                    } else {
                        callback(null, 2); //wrong password
                    }
                });
            } else {
                callback(null, 1); //username does not exist
            }
        })
        .catch(err => {
            console.log(err);
        });
    /*
    var query = "select exists (select * from credentials where userid=? and password=?)";
    pool.query(query, [info.username, hashedpw])
    .then(res => {

        callback(null, res); //1 if authenticated, 0 if not
    })
    .catch(err => {
        callback(err, null);
    })*/
}

async function addPaymentInfo(info, callback) {
    var step1 = 'insert into paymentinfo values(?, ?, ?, ?, ?)';
}

async function removePaymentInfo() {
    var step1 = 'delete * from paymentinfo where ccnum=? and userid=?';
}

async function addShippingAddress() {
    var step1 = 'insert into shipaddresses values(?, ?, ?, ?, ?)';
}

module.exports = { createUser, login };
