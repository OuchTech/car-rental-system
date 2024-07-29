const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'rental_user',
  password: 'password',
  database: 'new_rental_car_system',
  connectionLimit: 5
});

module.exports = pool;
