import axios from 'axios';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { dateFormat } from '../utils';

export default function Print() {
	const location = useLocation();
	const date = {
		month: location.state?.datePrint.month,
		year: location.state?.datePrint.year,
	};
	const token = location.state?.token;

	const [data, setData] = React.useState([]);
	console.log(data);

	React.useEffect(() => {
		axios
			.get(
				`http://localhost:8080/api/v1/status/getEventDoneByDate?month=${date.month}&year=${date.year}`,
				{ headers: { Authorization: `Bearer ${token}` } },
			)
			.then((response) => setData(response.data.data));
	}, []);

	setTimeout(() => {
		window.print();
	}, 1000);

	return (
		<div className="mx-12">
			<div className="mt-10 pb-3 border-b-2 border-gray-300 shadow-md">
				<div className="flex items-center pl-7 py-2">
					<span className="self-center text-3xl lg:ml-2 font-semibold whitespace-nowrap text-primary-600 dark:text-white">
						BersihBersama
					</span>
				</div>
			</div>
			<div className="mt-3 text-center">
				<p className="font-bold text-2xl mt-6 mb-2">Laporan Kegiatan Selesai</p>
				<p className="text-lg">Bulan : {date.month}</p>
				<p className="text-lg">Tahun : {date.year}</p>
			</div>

			<div className="mt-6 relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th
								scope="col"
								className="px-6 py-3">
								Kegiatan
							</th>
							<th
								scope="col"
								className="px-6 py-3">
								Tanggal
							</th>
							<th
								scope="col"
								className="px-6 py-3">
								Wilayah
							</th>
							<th
								scope="col"
								className="px-6 py-3">
								Dokumentasi
							</th>
						</tr>
					</thead>
					<tbody>
						{data.map((item, i) => (
							<tr
								key={i}
								className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{item.title}
								</th>
								<td className="px-6 py-4">{dateFormat(item.date)}</td>
								<td className="px-6 py-4">
									{item.district}, {item.city}, {item.province}
								</td>
								<td className="px-6 py-4 flex flex-wrap gap-2 justify-center">
									{JSON.parse(item.images_done).map((image, imi) => (
										<img
											key={imi}
											className="max-w-[100px] rounded-md"
											src={`http://localhost:8080/images/events_done/${decodeURI(
												image,
											)}`}
											alt=""
										/>
									))}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
