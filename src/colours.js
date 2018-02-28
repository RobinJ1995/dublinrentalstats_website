import parseColour from 'parse-color';

export default {
	rent: {
		city: '#0081FF',
		county: '#2CD700',
	},
	sharing: {
		city: '#FFBE00',
		county: '#FF0052',
	},
};

const setColourOpacity = (colour, opacity) => `rgba(${parseColour(colour).rgb.join(', ')}, ${opacity})`;
export { setColourOpacity };
