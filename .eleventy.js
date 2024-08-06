const { getWPHeader } = require( './lib/forkriver/getWPData.js' );

getWPHeader( 'https://judomanitoba.mb.ca/wp-json/wp/v2/posts' );

module.exports = eleventyConfig => {
	return {
		dir: {
			input:    'src',
			output:   'public',
			data:     '_data',
			includes: '_includes',
			layouts:  '_layouts',
		}
	}
};
