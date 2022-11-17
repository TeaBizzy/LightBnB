const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');
const fs = require('fs');


const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const query = fs.readFileSync('../2_queries/2_get_user_by_email.sql').toString();
  email = email.toLowerCase();
  return pool.query(query, [email])
  .then(res => {
    return res.rows[0];
  })
  .catch(err => console.log(err.message));
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const query = fs.readFileSync('../2_queries/3_get_user_by_id.sql').toString();
  return pool.query(query, [id])
  .then(res => {
    return res.rows[0];
  })
  .catch(err => console.log(err.message));
}
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const name = user.name;
  const email = user.email;
  const password = user.password;
  const values = [name, email, password]
  const query = fs.readFileSync('../2_queries/4_add_user.sql').toString();
  return pool.query(query, values)
  .then(res => {
    return res.rows;
  })
  .catch(err => console.log(err.message));
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const query = fs.readFileSync('../2_queries/5_user_reservations.sql').toString();
  return pool.query(query, [guest_id, limit])
  .then(res => {
    const ob = Object.assign({}, res.rows)
    console.log(ob)
    return ob;
  })
  .catch(err => console.log(err.message));
}
exports.getAllReservations = getAllReservations;

/// Properties


/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const query = fs.readFileSync('../2_queries/1_get_all_properties.sql').toString();
  return pool
  .query(query, [limit])
  .then(res => {
    return res.rows;
  })
  .catch(err => console.log(err.message));
}
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
