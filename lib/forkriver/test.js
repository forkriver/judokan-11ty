function repeatIt( str = null ) {
	if ( null === str ) {
		console.log( "You didn't give me much to work with here." );
	} else {
		console.log( str );
	}
}

function sayAgain( str = null, str2 = null ) {
	if ( null !== str ) {
		console.log( str );
		console.log( str );
	}
	if ( null !== str2 ) {
		console.log( str2 );
		console.log( str2 );
	}
}

function thirdTry( str1 = null, str2 = null, str3 = null ) {
	console.log( 'Hi!' );
}

module.exports = {
	repeatIt,
	sayAgain,
	thirdTry,
}