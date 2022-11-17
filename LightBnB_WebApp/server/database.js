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
    return res.rows;
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

  const city =  options.city ? `%${options.city}%` : '%';
  const ownerID = options.owner_id;
  const minPrice = options.minimum_price_per_night ? options.minimum_price_per_night * 100 : 0;
  const maxPrice = options.maximum_price_per_night ? options.maximum_price_per_night * 100 : 2147483647;
  const minRating = options.minimum_rating ? options.minimum_rating : 0;
  let queryParams;

  let query;
  if(ownerID) {
    queryParams = [city, ownerID, minPrice, maxPrice, minRating, limit];
    query = fs.readFileSync('../2_queries/7_filtered_properties_with_userid.sql').toString();
  } else {
    queryParams = [city, minPrice, maxPrice, minRating, limit];
    query = fs.readFileSync('../2_queries/6_filtered_properties.sql').toString();
  }
  return pool
  .query(query, queryParams)
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
  console.log(property);
  const owner = property.owner_id;
  const title = property.title;
  const desc = property.description;
  const thumb = property.thumbnail_photo_url;
  const cover = property.cover_photo_url;
  const cost = property.cost_per_night;
  const street = property.street;
  const city = property.city;
  const province = property.province;
  const post = property.post_code;
  const country = property.country;
  const parking = property.parking_spaces;
  const baths = property.number_of_bathrooms;
  const beds = property.number_of_bedrooms;
  const queryParams = [owner, title, desc, thumb, cover, cost, street, city, province, post, country, parking, baths, beds]
  const query = fs.readFileSync('../2_queries/8_add_property.sql').toString();
  return pool.query(query, queryParams)
  .then(res => {
    return res.rows;
  })
  .catch(err => console.log(err.message));
}
exports.addProperty = addProperty;
