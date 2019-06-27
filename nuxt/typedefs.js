/**
 * A GraphQL Query
 * @typedef {Object} GqlQuery
 */

/**
 * An object that contains information for an Apollo query
 * The name of the object determines the template property that will get updated
 * This is an inexhaustive list of properties. See {@link https://vue-apollo.netlify.com/api/smart-query.html} for all properties.
 * @typedef {Object} SmartQuery
 * @property {GqlQuery} query The query.
 * @property {Object} variables The variables to search.
 * @property {Function | Undefined} update Optionally, transform the returned data (we almost always do this)
 * @property {Function | Undefined} result Perform actions with the retrieved data other than updating the property
 */
