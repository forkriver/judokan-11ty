const EleventyFetch = require( '@11ty/eleventy-fetch' );
const axios         = require( 'axios' );

const ITEMS_PER_REQUEST = 10;
const API_BASE_URL      = 'https://judomanitoba.mb.ca/wp-json/wp/v2/posts/';

/**
 * Gets a set of posts from the remote server.
 *
 * @since 1.0.0
 *
 * @param  {Number} page The "page" of posts we're fetching. Start at 1.
 * @return {Object}      Total, Pages, and API data.
 */
async function getPosts( page = 1 ) {
	try {
		const url    = API_BASE_URL + `?page=${page}`;
		const params = {
			duration: '6h',
			type:     'json',
		};
		return response = await EleventyFetch( url, params );
	} catch ( e ) {
		console.error( e );
		return [];
	}
}

module.exports = async function() {
	try {
		let baseUrl = 'https://judomanitoba.mb.ca/wp-json/wp/v2/posts/';
		// EleventyFetch doesn't fetch headers, so Axios, I guess.
		let headers = await axios.head( baseUrl );
		let pages = 0;
		let totalPages = 0;
		let totalPosts = 0;
		if ( headers.headers['x-wp-totalpages'] ) {
			totalPages = parseInt( headers.headers['x-wp-totalpages'] );
		}
		if ( headers.headers['x-wp-total'] ) {
			totalPosts = parseInt( headers.headers['x-wp-total'] );
		}
		let posts = [];
		let response;
		let url;
		for ( i = 1; i <= totalPages; i++ ) {
			console.log( `Getting page ${i} of ${totalPages}...`)
			posts = posts.concat( await getPosts( i ) );
		}
		console.log( `Found ${posts.length} posts in total.`)
		if ( posts.length === totalPosts ) {
			console.log( '	...which seems about right.' );
		} else {
			console.log( `	...which seems a bit off, frankly; we expected ${totalPosts}.` );
		}
		return posts;
	} catch ( e ) {
		console.log( e );
		return [];
	}
};
