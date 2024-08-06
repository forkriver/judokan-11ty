/**
 * WordPress data fetcher.
 *
 * Using Axios and Eleventy Fetch, gets and caches remote data from a WordPress site.
 * Gets posts, pages, and The Events Caldendar events, for now.
 *
 * @package forkriver\wp-fetch-data
 *
 * @version 1.0.0
 */

/**
 * Gets the WordPress headers. 
 */
async function getWPHeader( url = null, headerScheme = 'x-wp-total' ) {
	const axios = require( 'axios' );
	if ( null === url ) {
		console.warn( "Warning: no URL specified!" );
		return;
	}
	const headers = { count: headerScheme, pages: headerScheme + 'pages' };
	const data = await axios.head( url );
	let ret = {};
	for ( let [key, value] of Object.entries( headers ) ) {
		ret[ key ] = data.headers[ value ];
	}
	console.log( ret );
	return ret;
}

module.exports = {
	getWPHeader,
}
