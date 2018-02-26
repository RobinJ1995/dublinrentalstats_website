import React from 'react';

export default () => {
	const quotes = [
		'Because who wouldn\'t want a depression?',
		'Have you lost hope yet?',
		...places('Can I just move to {} already, please?'),
		...places('{} is looking more tempting by the day...'),
		'Helping you get that depression you\'ve always wanted!',
		'If you\'re lucky, the toilet might actually be in a separate room 😊',
		'Only a grand a month for a garden shed? What an absolute bargain!',
		'Sure I\'ve gotta share the room with 5 other people but it\'s only a 5 minute stroll from O\'Connel Street!',
	];
	
	return quotes[Math.floor(Math.random() * quotes.length)];
};

function places(str) {
	const places = [
		'Donegal',
		'Belfast',
		'Limerick',
	];
	
	return places.map(place => str.replace('{}', place));
}
