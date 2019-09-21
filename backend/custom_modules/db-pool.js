const mariadb = require('mariadb/callback');

const POOL = mariadb.createPool({
    host: 'virt-servers.mynetgear.com',
    port: 30000,
    user: "team8",
    password: "WehaveControl",
    database: "GeekTextDB",
    connectionLimit: 2
    //rowsAsArray: true
});

module.exports = POOL;