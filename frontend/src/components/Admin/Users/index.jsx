import React from 'react';
import axios from 'axios';
import ModalUpdateUser from '../../Partials/modals/users/modalUpdateUser';
import ModalDeleteUser from '../../Partials/modals/users/modalDeleteUser';

export default function TableUsers(props) {
	const [data, setData] = React.useState([]);
	const [search, setSearch] = React.useState('');
	const [showModalUpdateUser, setShowModalUpdateUser] = React.useState({
		isShow: false,
		user: {},
	});
	const [showModalDeleteUser, setShowModalDeleteUser] = React.useState({
		isShow: false,
		user: {},
	});


	// useEffect Get Data User
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

	const Table = () => {
		const Columns = () => {
			let dataColumns = data[0];
			let keys = Object.keys(dataColumns || {});
			return keys.map((name, i) => {
				return name == 'id' ||
					name == 'created_at' ||
					name == 'updated_at' ||
					name == 'password' ? (
					''
				) : (
					<th
						key={i}
						scope="col"
						className="px-6 py-3">
						{name == 'sm_account' ? 'Social Media Account' : name}
					</th>
				);
			});
		};

		const RowUsers = () => {
			return data.map((item, i) => (
				<tr
					className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
					key={i}>
					<th
						scope="row"
						className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
						{item.name}
					</th>
					<td className="px-6 py-4">{item.email}</td>
					<td className="px-6 py-4">{item.address}</td>
					<td className="px-6 py-4">{item.district}</td>
					<td className="px-6 py-4">{item.city}</td>
					<td className="px-6 py-4">{item.province}</td>
					<td className="px-6 py-4">{item.sm_account}</td>
					<td className="px-6 py-4">
						{item.role == '1' ? 'Admin' : 'Partisipan'}
					</td>
					<td className="px-6 py-4">
						<img
							src={`http://localhost:8080/images/profile/${item.image}`}
							alt="user's profile"
						/>
					</td>
					<td className="px-6 py-4">
						<button
							type="button"
							className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
							onClick={() =>
								setShowModalUpdateUser({ isShow: true, user: item })
							}>
							Ubah
						</button>
						<button
							type="button"
							onClick={() =>
								setShowModalDeleteUser({ isShow: true, user: item })
							}
							className="button-delete font-medium block pt-2 text-red-600 dark:text-blue-500 hover:underline">
							Hapus
						</button>
					</td>
				</tr>
			));
		};

		return (
			<table className="max-w-full mt-4 text-xs md:overflow-x-scroll text-left rounded shadow-md text-gray-500 dark:text-gray-400">
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
				<tbody className="overflow-y-auto">{<RowUsers />}</tbody>
			</table>
		);
	};

	return (
		<div className="p-4 pt-20 sm:ml-64">
			<div className="relative overflow-x-auto sm:rounded-lg">
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
				{showModalUpdateUser.isShow && (
					<ModalUpdateUser
						user={showModalUpdateUser.user}
						setIsShow={() =>
							setShowModalUpdateUser({ isShow: false, user: {} })
						}
						token={props.token}
					/>
				)}

				{showModalDeleteUser.isShow && (
					<ModalDeleteUser
						user={showModalDeleteUser.user}
						setIsShow={() =>
							setShowModalDeleteUser({ isShow: false, user: {} })
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
