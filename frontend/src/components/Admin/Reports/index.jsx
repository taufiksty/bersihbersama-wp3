import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ModalShowReport from '../../Partials/modalShowReport';

export default function TableReports(props) {
	const [data, setData] = React.useState([]);
	const [search, setSearch] = React.useState('');
	const [showModalShowReport, setShowModalShowReport] = React.useState({
		isShow: false,
		report: {},
	});
	const [showModalDeleteReport, setShowModalDeleteReport] = React.useState({
		isShow: false,
		report: {},
	});

	const navigate = useNavigate();

	// useEffect Get Data Reports
	React.useEffect(() => {
		const getData = async () => {
			await axios
				.get(`http://localhost:8080/api/v1/${props.name}`, {
					headers: { Authorization: `Bearer ${props.token}` },
				})
				.then((response) => setData(response.data.data))
				.catch((error) => console.log(error));
		};

		getData();
	}, []);

	const handleSubmitSearch = (e) => {
		e.preventDefault();
		const getDataSearch = async () => {
			await axios
				.get(`http://localhost:8080/api/v1/${props.name}`, {
					headers: { Authorization: `Bearer ${props.token}` },
					params: { search: search },
				})
				.then((response) => setData(response.data.data))
				.catch((error) => console.log(error));
		};

		getDataSearch();
	};

	const ModalDeleteReport = (props) => {
		const handleDelete = (e) => {
			e.preventDefault();
			const id = showModalDeleteReport.report.id;
			axios
				.delete(`http://localhost:8080/api/v1/reports/${id}`, {
					headers: { Authorization: `Bearer ${props.token}` },
				})
				.then((response) => {
					console.log(response.data);
					if (response.data.success) {
						setShowModalDeleteReport({ isShow: false, report: {} });
						navigate('/admin', {
							state: {
								menu: 'reports',
								isSuccess: true,
								message: 'Aduan berhasil dihapus.',
							},
						});
						window.location.reload();
					}
				})
				.catch((error) => console.log(error));
		};

		return (
			<div
				id="delete-modal"
				tabIndex="-1"
				className="fixed flex justify-center top-0 left-0 right-0 z-50 p-4 bg-opacity-50 bg-black overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
				<div className="relative py-72 w-full h-full max-w-md md:h-auto">
					<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<button
							type="button"
							className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
							onClick={() =>
								setShowModalDeleteReport({ isShow: false, report: {} })
							}>
							<svg
								aria-hidden="true"
								className="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"></path>
							</svg>
							<span className="sr-only">Close modal</span>
						</button>
						<div className="p-6 text-center">
							<svg
								aria-hidden="true"
								className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
							</svg>
							<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
								{props.message}
							</h3>
							<button
								type="button"
								onClick={handleDelete}
								className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
								Ya, tentu
							</button>
							<button
								onClick={() =>
									setShowModalDeleteReport({ isShow: false, report: {} })
								}
								type="button"
								className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
								Tidak, batalkan
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	};

	const Table = () => {
		const Columns = () => {
			let dataColumns = data[0];
			let keys = Object.keys(dataColumns || {});
			return keys.map((name, i) => {
				return name == 'id' ||
					name == 'updated_at' ||
					name == 'description' ||
					name == 'link_map' ||
					name == 'images' ? (
					''
				) : (
					<th
						key={i}
						scope="col"
						className="px-6 py-3">
						{name == 'user_id' ? 'User ID' : name}
					</th>
				);
			});
		};

		const RowEvents = () => {
			return data.map((item, i) => (
				<tr
					className={`border-b dark:bg-gray-900 dark:border-gray-700 ${
						item.status == 0 ? 'bg-primary-100' : 'bg-white'
					}`}
					key={i}>
					<th
						scope="row"
						className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
						{item.title}
					</th>
					<td className="px-6 py-4">{item.address}</td>
					<td className="px-6 py-4">{item.district}</td>
					<td className="px-6 py-4">{item.city}</td>
					<td className="px-6 py-4">{item.province}</td>
					<td className="px-6 py-4">{item.user_id}</td>
					<td className="px-6 py-4">
						{item.status == 0 ? 'Belum diterima' : 'Diterima'}
					</td>
					<td className="px-6 py-4">{item.created_at}</td>
					<td className="p-4">
						<button
							type="button"
							className="font-medium text-start text-primary-600 dark:text-primary-500 hover:underline"
							onClick={() => {
								setShowModalShowReport({ isShow: true, report: item });
							}}>
							Lihat detail
						</button>
						<button
							type="button"
							onClick={() =>
								setShowModalDeleteReport({ isShow: true, report: item })
							}
							className="button-delete font-medium block pt-2 text-red-600 dark:text-blue-500 hover:underline">
							Hapus
						</button>
					</td>
				</tr>
			));
		};

		return (
			<table className="w-full mt-4 text-xs text-left rounded shadow-md text-gray-500 dark:text-gray-400">
				<thead className="text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<Columns />
						<th
							scope="col"
							className="px-6 py-3">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="overflow-y-auto">{<RowEvents />}</tbody>
			</table>
		);
	};

	return (
		<div className="p-4 pt-20 sm:ml-64">
			<div className="relative overflow-x-auto md:overflow-x-scroll sm:rounded-lg">
				<form action="#">
					<label
						htmlFor="default-search"
						className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
						Search
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<svg
								aria-hidden="true"
								className="w-5 h-5 text-gray-500 dark:text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
							</svg>
						</div>
						<input
							type="search"
							id="default-search"
							className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Cari berdasarkan..."
							required=""
							name="search"
							value={search}
							autoFocus
							onChange={(e) => setSearch(e.target.value)}
						/>
						<button
							type="submit"
							onClick={handleSubmitSearch}
							className="text-white absolute right-2.5 bottom-2.5 bg-primary-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
							Cari
						</button>
					</div>
				</form>

				{showModalShowReport.isShow && (
					<ModalShowReport
						report={showModalShowReport.report}
						setIsShow={() =>
							setShowModalShowReport({ isShow: false, report: {} })
						}
						token={props.token}
					/>
				)}

				{showModalDeleteReport.isShow && (
					<ModalDeleteReport
						report={showModalDeleteReport.report}
						setIsShow={() =>
							setShowModalDeleteReport({ isShow: false, report: {} })
						}
						token={props.token}
						message="Anda yakin ingin menghapusnya?"
					/>
				)}

				<Table />
			</div>
		</div>
	);
}
