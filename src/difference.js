import React from 'react';

const formatPercentage = (percentage, includeSign = true, relevancyThreshold = 0.1, boldThreshold = 10) => {
	const rounded = Math.round(percentage * 100) / 100;

	const styles = {
		color: 'grey',
		fontSize: '0.94em'
	};

	if (percentage > 0) {
		if (percentage >= relevancyThreshold) {
			styles.color = 'red';
		}
		if (percentage >= boldThreshold) {
			styles.fontWeight = 'bold';
		}

		return (<span style={styles}>{includeSign && '+'}{rounded}%</span>);
	}

	if (percentage <= 0) {
		if (percentage <= -relevancyThreshold) {
			styles.color = 'green';
		}
		if (percentage <= -boldThreshold) {
			styles.fontWeight = 'bold';
		}

		return (<span style={styles}>{includeSign ? rounded : Math.abs(rounded)}%</span>);
	}
}
const difference = (from, to) => (to / from - 1.0) * 100;

export default difference;

export { formatPercentage };