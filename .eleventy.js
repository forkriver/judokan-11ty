// const { getWPHeader } = require( './lib/forkriver/getWPData.js' );

// Fork River libraries. Someday maybe I'll make 'em into Node modules.
const {
	frDateRange,
	frDateFormat,
	laterThanToday
} = require( './lib/forkriver/fr-date-formatting.js' );

module.exports = eleventyConfig => {

	/** Filters. **/

    // Article date formatting.
    eleventyConfig.addFilter( 'articleDateFormat', function( theDate ) {
    	return frDateFormat( theDate, 'mdy' );
    });	

	/** Collections. **/

	// Merged local and remote news.
	// @link https://www.roboleary.net/2024/05/26/eleventy-external-posts.html
	eleventyConfig.addCollection( 'news', (collection) => {
		let localNews = collection.getFilteredByGlob( 'src/news/**/*.md' );
		let remoteNews = collection.getAll()[0].data.remoteNews;
		let news = [ ...remoteNews, ...localNews ];
		return [];

	});

	return {
		dir: {
			input:    'src',
			output:   'public',
			data:     '_data',
			includes: '_includes',
			layouts:  '_layouts',
			// @link https://www.cassey.dev/til/2021-07-29-include-nunjucks-in-markdown-11ty/
			markdownTemplateEngine: 'njk',
		}
	}
};
