const EleventyFetch   = require( '@11ty/eleventy-fetch' );
const { getWPHeader } = require( '../../lib/forkriver/getWPData.js' );

const ITEMS_PER_REQUEST = 10;
const API_BASE_URL      = 'https://judomanitoba.mb.ca/wp-json/wp/v2/posts/';
const REMOTE_BASE_URL   = 'https://judomanitoba.mb.ca/';

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
		// EleventyFetch doesn't fetch headers, so Axios, I guess.
		let headers = await getWPHeader( API_BASE_URL, 'x-wp-total' );
		console.log( headers );
		let pages = 0;
		let totalPages = 0;
		let totalPosts = 0;
		if ( headers['count'] ) {
			totalPages = parseInt( headers['pages'] );
		}
		if ( headers['pages'] ) {
			totalPosts = parseInt( headers['count'] );
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
		// Rewrite the post permalink to a local one.
		for ( post of posts ) {
			post.localLink = post.link.replace( /https:\/\/judomanitoba\.mb\.ca\//, '/' );
		}
		return posts;
	} catch ( e ) {
		console.log( e );
		return [];
	}
};
