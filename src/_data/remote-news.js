const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
	try {
		let url = 'https://judomanitoba.mb.ca/wp-json/wp/v2/posts/';
		return EleventyFetch( url, {
			duration: '6h',
			type:     'json',
		});
	} catch ( e ) {
		console.log( e );
		return '';
	}
};
