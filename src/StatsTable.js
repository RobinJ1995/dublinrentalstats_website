import React, { Component } from 'react';

const formatNumber = number => parseFloat(number).toFixed(2);
const renderPriceCells = data => ([
	<td>
		€{formatNumber(data.lowest)}<br />
		€{formatNumber(data.highest)}
	</td>,
	<td>
		{data.median && `€${formatNumber(data.median)}`}
		{data.median && data.average && <br />}
		{data.average && `€${formatNumber(data.average)}`}
	</td>
]);

class StatsTable extends Component {
	render() {
		const {
			data,
		} = this.props;
		
		return (
			<table style={{ width: '100%' }}>
				<thead style={{
					backgroundColor: '#003A49',
					color: 'white',
				}}>
					<tr>
						<th rowspan="3">Date</th>
						<th colspan="4">Renting</th>
						<th colspan="4">Sharing</th>
					</tr>
					<tr>
						<th colspan="2">City Centre</th>
						<th colspan="2">County Dublin</th>
						<th colspan="2">City Centre</th>
						<th colspan="2">County Dublin</th>
					</tr>
					<tr>
						<th>Lowest/<br />Highest</th>
						<th>Median/<br />Average</th>
						<th>Lowest/<br />Highest</th>
						<th>Median/<br />Average</th>
						<th>Lowest/<br />Highest</th>
						<th>Median/<br />Average</th>
						<th>Lowest/<br />Highest</th>
						<th>Median/<br />Average</th>
					</tr>
				</thead>
				<tbody style={{
					backgroundColor: '#DFDFDF',
					color: 'black',
				}}>
					{Object.keys(data).map(date => (
						<tr>
							<th>{new Date(date).toDateString()}</th>
							{renderPriceCells(data[date].rent.city)}
							{renderPriceCells(data[date].rent.county)}
							{renderPriceCells(data[date].sharing.city)}
							{renderPriceCells(data[date].sharing.county)}
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}

export default StatsTable;
