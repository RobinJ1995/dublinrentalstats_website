import React from 'react';

export default () => {
	const quotes = [
		'Have you lost hope yet?',
		...places('Can I just move to {} already, please?'),
		...places('{} is looking more tempting by the day...'),
		'Only a grand a month for a garden shed? What an absolute bargain!',
		'Oh them poor, famished landlords...',
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
