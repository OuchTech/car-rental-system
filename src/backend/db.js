const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'carrentaluser',
    password: 'password', 
    database: 'car_rental_system',
    connectionLimit: 5
});

module.exports = {
    getConnection: function() {
        return new Promise(function(resolve, reject) {
            pool.getConnection()
                .then(function(connection) {
                    resolve(connection);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    }
};