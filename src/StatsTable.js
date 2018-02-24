import React, { Component } from 'react';

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
						{new Array(8).fill('').map((x, i) => (
							<th>{i % 2 ? 'Highest' : 'Lowest'}</th>
						))}
					</tr>
				</thead>
				<tbody style={{
					backgroundColor: '#DFDFDF',
					color: 'black',
				}}>
					{Object.keys(data).map(date => (
						<tr>
							<th>{new Date(date).toDateString()}</th>
							<td>€{data[date].rent.city.lowest}</td>
							<td>€{data[date].rent.city.highest}</td>
							<td>€{data[date].rent.county.lowest}</td>
							<td>€{data[date].rent.county.highest}</td>
							<td>€{data[date].sharing.city.lowest}</td>
							<td>€{data[date].sharing.city.highest}</td>
							<td>€{data[date].sharing.county.lowest}</td>
							<td>€{data[date].sharing.county.highest}</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}

export default StatsTable;
