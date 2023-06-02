import React from 'react';
import axios from 'axios';
import ModalUpdateEvent from '../../Partials/modals/events/modalUpdateEvent';
import { useNavigate } from 'react-router-dom';
import ModalAddEvent from '../../Partials/modals/events/modalAddEvent';
import ModalDeleteEvent from '../../Partials/modals/events/modalDeleteEvent';

export default function TableEvents(props) {
	const [data, setData] = React.useState([]);
	const [search, setSearch] = React.useState('');
	const [datePrint, setDatePrint] = React.useState({});
	const [showModalAddEvent, setShowModalAddEvent] = React.useState(false);
	const [showModalUpdateEvent, setShowModalUpdateEvent] = React.useState({
		isShow: false,
		event: {},
	});
	const [showModalDeleteEvent, setShowModalDeleteEvent] = React.useState({
		isShow: false,
		event: {},
	});

	const navigate = useNavigate();

	// useEffect Get Data Events
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

	const handleSelectedMonth = (e) => {
		setDatePrint((oldState) => ({
			...oldState,
			month: e.target.value,
		}));
	};

	const handleSelectedYear = (e) => {
		setDatePrint((oldState) => ({
			...oldState,
			year: e.target.value,
		}));
	};

	const Table = () => {
		const Columns = () => {
			let dataColumns = data[0];
			let keys = Object.keys(dataColumns || {});
			return keys.map((name, i) => {
				return name == 'id' ||
					name == 'created_at' ||
					name == 'updated_at' ||
					name == 'description' ||
					name == 'images_done' ||
					name == 'link_map' ||
					name == 'link_groupwa' ||
					name == 'images' ? (
					''
				) : (
					<th
						key={i}
						scope="col"
						className="px-6 py-3">
						{name == 'total_people' ? 'Total People' : name}
					</th>
				);
			});
		};

		const RowEvents = () => {
			return data.map((item, i) => (
				<tr
					className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
					key={i}>
					<th
						scope="row"
						className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
						{item.title}
					</th>
					<td className="px-6 py-4">{item.date}</td>
					<td className="px-6 py-4">{item.total_people}</td>
					<td className="px-6 py-4">{item.address}</td>
					<td className="px-6 py-4">{item.district}</td>
					<td className="px-6 py-4">{item.city}</td>
					<td className="px-6 py-4">{item.province}</td>
					<td className="px-6 py-4">
						{item.done == 0 ? 'Belum selesai' : 'Selesai'}
					</td>
					<td className="p-4">
						<button
							className="font-medium text-start text-primary-600 dark:text-primary-500 hover:underline"
							onClick={() =>
								navigate(`/events/${item.id}`, { state: { dataEvent: item } })
							}>
							Lihat detail
						</button>
						{item.done == 0 ? (
							<button
								type="button"
								className="block pt-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
								onClick={() =>
									setShowModalUpdateEvent({ isShow: true, event: item })
								}>
								Ubah
							</button>
						) : (
							''
						)}
						<button
							type="button"
							onClick={() =>
								setShowModalDeleteEvent({ isShow: true, event: item })
							}
							className="block pt-2 font-medium text-red-600 button-delete dark:text-blue-500 hover:underline">
							Hapus
						</button>
					</td>
				</tr>
			));
		};

		return (
			<table className="w-full mt-2 text-xs text-left text-gray-500 rounded shadow-md dark:text-gray-400">
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
					<button
						type="button"
						onClick={() => setShowModalAddEvent(true)}
						className="mt-2 w-full text-primary-600 hover:text-white border border-primary-600 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-primary-500 dark:text-primary-500 dark:hover:text-white dark:hover:bg-primary-500 dark:focus:ring-primary-800">
						Tambah Kegiatan
					</button>
					<div className="md:flex md:gap-3">
						<p className="self-center text-center">
							Rekap Laporan Kegiatan Selesai
						</p>
						<select
							id="month"
							onChange={handleSelectedMonth}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-fit p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
							<option>Pilih bulan</option>
							<option value="01">Januari</option>
							<option value="02">Februari</option>
							<option value="03">Maret</option>
							<option value="04">April</option>
							<option value="05">Mei</option>
							<option value="06">Juni</option>
							<option value="07">Juli</option>
							<option value="08">Agustus</option>
							<option value="09">September</option>
							<option value="10">Oktober</option>
							<option value="11">November</option>
							<option value="12">Desember</option>
						</select>
						<select
							id="year"
							onChange={handleSelectedYear}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-fit p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
							<option>Pilih tahun</option>
							<option value="2021">2021</option>
							<option value="2022">2022</option>
							<option value="2023">2023</option>
						</select>
						<button
							type="button"
							onClick={() => {
								window.open('/admin#kegiatan', '_blank');
								navigate('/printEventReport', {
									state: { datePrint, token: props.token },
									replace: true,
								});
							}}
							className="mt-2 w-full md:w-fit text-primary-600 hover:text-white border border-primary-600 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-primary-500 dark:text-primary-500 dark:hover:text-white dark:hover:bg-primary-500 dark:focus:ring-primary-800">
							Cetak
						</button>
					</div>
				</form>

				{showModalAddEvent && (
					<ModalAddEvent
						setIsShow={() => setShowModalAddEvent(false)}
						token={props.token}
					/>
				)}

				{showModalUpdateEvent.isShow && (
					<ModalUpdateEvent
						event={showModalUpdateEvent.event}
						setIsShow={() =>
							setShowModalUpdateEvent({ isShow: false, event: {} })
						}
						token={props.token}
					/>
				)}

				{showModalDeleteEvent.isShow && (
					<ModalDeleteEvent
						event={showModalDeleteEvent.event}
						setIsShow={() =>
							setShowModalDeleteEvent({ isShow: false, event: {} })
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
