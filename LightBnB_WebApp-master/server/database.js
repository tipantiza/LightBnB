// const properties = require('./json/properties.json');
// const users = require('./json/users.json');
const db = require('./db/index')
// pool.connect();
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return db.query('SELECT * FROM users WHERE email = $1 ', [email])
  .then((res) => res.rows[0])
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return db.query('SELECT * FROM users WHERE id = $1 ', [id])
  .then((res) => res.rows[0])
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
    const name = user.name
    const email = user.email
    const password = user.password
  return db.query("INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING *; ", [name, email, password])
  .then((res) => res.rows[0])
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return db.query(
    `SELECT reservations.*, properties.*, AVG(property_reviews.rating) as average_rating 
    FROM reservations 
    JOIN properties ON reservations.property_id = properties.id 
    JOIN property_reviews ON property_reviews.property_id = properties.id 
    WHERE reservations.guest_id = $1 
    AND reservations.end_date < now()::date 
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date 
    limit $2 ; `, [guest_id, limit])
  .then((res) => res.rows)
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
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE 1=1
  `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND city LIKE $${queryParams.length}`;
  }
  if(options.owner_id){
      queryParams.push(options.owner_id);
      queryString += `
      AND owner_id = $${queryParams.length}\n`;
  }
  
  if(options.minimum_price_per_night){
      queryParams.push(options.minimum_price_per_night * 100);
      queryString += `
      AND cost_per_night >= $${queryParams.length}\n`;
  } 
  if(options.maximum_price_per_night){
      queryParams.push(options.maximum_price_per_night * 100);
      queryString += `
      AND cost_per_night <= $${queryParams.length}\n`;
  }
  queryString += 'GROUP BY properties.id';
  if(options.minimum_rating){
      queryParams.push(options.minimum_rating);
      queryString += `
      HAVING AVG(rating) >= $${queryParams.length}\n`;
  }
  // 4
  queryParams.push(limit);
  queryString += 
  `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return db.query(queryString, queryParams)
  .then(res =>
    {
      console.log('all property values: ',res.rows);
      return res.rows
    });
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  console.log(property);
  const values = []
  for(const info in property){
    values.push(property[info])
  }
  console.log(values);
  return db.query(
    `INSERT INTO properties( 
      title,
      description,
      number_of_bedrooms,
      number_of_bathrooms,
      parking_spaces,
      cost_per_night,
      thumbnail_photo_url,
      cover_photo_url,
      street,
      country,
      city,
      province,
      post_code,
      owner_id) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;`, values)
  .then((res) => {
    console.log("add propety values",res.rows);
    return res.rows[0]})
  
}
exports.addProperty = addProperty;
