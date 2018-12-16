import parseColour from 'parse-color';

const long = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];
export default long;

const short = long.map(str => str.substr(0, 3));
export { short };

const shortenMonth = str => long.reduce((acc, cur, i) => acc.replace(cur, short[i]), str);
const shortenYear = str => str.replace(/\s20(\d{2})/, ' \'$1');

const shorten = str => shortenYear(shortenMonth(str));
export { shorten };
