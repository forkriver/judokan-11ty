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
