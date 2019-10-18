const mariadb = require('mariadb/callback');

const POOL = mariadb.createPool({
    host: 'virt-servers.mynetgear.com',
    port: 30000,
    user: "team8",
    password: "WehaveControl",
    database: "geektext",
    connectionLimit: 2,
    dateStrings: 'date'
    //rowsAsArray: true
});

module.exports = POOL;