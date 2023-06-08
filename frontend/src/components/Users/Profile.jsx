import React from 'react';
import Navbar from './Navbar';
import ModalConfirm from '../Partials/modals/modalConfirm';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ModalUpdateUser from '../Partials/modals/users/modalUpdateUser';
import AlertSuccess from '../Partials/alerts/AlertSuccessCenter';

export default function Profile() {
	const credentials = localStorage.getItem('credentials')
		? JSON.parse(localStorage.getItem('credentials'))
		: '';

	const location = useLocation();

	const [dataReportsByUser, setDataReportsByUser] = React.useState([]);
	const [dataEventsByUser, setDataEventsByUser] = React.useState([]);
	const [showModalUpdateUser, setShowModalUpdateUser] = React.useState({
		isShow: false,
		user: {},
	});
	const [alertSuccess, setAlertSuccess] = React.useState({
		isSuccess: location.state?.isSuccess,
		message: location.state?.message,
	});

	// Fetch Data Reports By User
	React.useEffect(() => {
		const getDataReports = async () => {
			axios
				.get(
					`http://localhost:8080/api/v1/reports?user_id=${credentials.user.id}`,
					{
						headers: { Authorization: `Bearer ${credentials.token}` },
					},
				)
				.then((response) => setDataReportsByUser(response.data.data))
				.catch((error) => console.log(error));
		};

		getDataReports();
	}, []);

	// Fetch Data Event By User Joined
	React.useEffect(() => {
		const getDataEventsByUserJoined = async () => {
			axios
				.get(
					`http://localhost:8080/api/v1/events/getEventsByUserJoined/${credentials.user.id}`,
					{
						headers: { Authorization: `Bearer ${credentials.token}` },
					},
				)
				.then((response) => setDataEventsByUser(response.data.data))
				.catch((error) => console.log(error));
		};

		getDataEventsByUserJoined();
	}, []);

	const navigate = useNavigate();

	const handleLogout = (e) => {
		e.preventDefault();
		localStorage.removeItem('credentials');
		navigate('/', { replace: true });
		window.location.reload();
	};

	const RowActivityUser = (props) => (
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th className="px-10 py-3 bg-primary-300">{props.title}</th>
						<th className="py-3 bg-primary-300"></th>
					</tr>
				</thead>
				<tbody>
					{props.data.length ? (
						props.data.map((r, i) => (
							<tr
								key={i}
								className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
								<th
									scope="row"
									className="px-4 py-4 max-w-[60px] overflow-x-auto font-medium text-gray-900  dark:text-white">
									{props.title == 'Aduan Anda' ? (
										r.title
									) : (
										<a
											onClick={() =>
												navigate(`/events/${r.event_id}`, {
													state: {
														dataEvent: {
															id: r.event_id,
															title: r.title,
															description: r.description,
															address: r.address,
															district: r.district,
															city: r.city,
															province: r.province,
															link_map: r.link_map,
															date: r.date,
															total_people: r.total_people,
															link_groupwa: r.link_groupwa,
															images: r.images,
														},
													},
												})
											}
											className="text-primary-600 dark:text-primary-500 hover:underline cursor-pointer">
											{r.title}
										</a>
									)}
								</th>
								<td className="px-10 py-4">
									{props.title == 'Aduan Anda'
										? r.status == 0
											? 'Belum diterima'
											: 'Diterima'
										: r.done == 0
										? 'Belum terlaksana'
										: 'Terlaksana'}
								</td>
							</tr>
						))
					) : (
						<tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
							<td className="px-16 py-4">Anda belum memilikinya</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);

	return (
		<div>
			<Navbar
				credentials={credentials}
				activeSection="profil"
			/>
			<div className="mt-24 mx-2 flex flex-col items-center">
				<img
					className="rounded w-36 h-36"
					src={`http://localhost:8080/images/profile/${credentials.user.image}`}
					alt="Extra large avatar"
				/>
				<div className="mt-5 text-center">
					<p className="text-lg">{credentials.user.name}</p>
					<p className="text-sm">{credentials.user.email}</p>
					<p className="text-xs">{credentials.user.sm_account}</p>
					<p className="mt-3 text-xs">{credentials.user.address}</p>
					{credentials.user.city ? (
						<p className="text-xs">
							{credentials.user.district}, {credentials.user.city},{' '}
							{credentials.user.province}
						</p>
					) : (
						''
					)}
					<p className="my-3 text-xs">
						{credentials.user.role == 1 ? 'Admin' : 'Partisipan'}
					</p>
				</div>
				<button
					type="button"
					onClick={() =>
						setShowModalUpdateUser({ isShow: true, user: credentials.user })
					}
					className="my-5 py-1.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-600 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
					Ubah data profil
				</button>
				<div className="mt-3">
					<RowActivityUser
						title="Aduan Anda"
						data={dataReportsByUser}
					/>
				</div>
				<div className="my-7">
					<RowActivityUser
						title="Kegiatan Anda"
						data={dataEventsByUser}
					/>
				</div>
			</div>
			<ModalConfirm
				id="popup-modal"
				message="Anda yakin ingin keluar?"
				handleYes={handleLogout}
			/>
			{showModalUpdateUser.isShow && (
				<ModalUpdateUser
					user={showModalUpdateUser.user}
					setIsShow={() => setShowModalUpdateUser({ isShow: false, user: {} })}
					token={credentials.token}
				/>
			)}
			{alertSuccess.isSuccess ? (
				<AlertSuccess
					message={alertSuccess.message}
					setAlertSuccess={() => {
						setAlertSuccess((oldState) => ({
							...oldState,
							isSuccess: false,
						}));
						window.history.replaceState(null, '', location.pathname);
					}}
				/>
			) : (
				''
			)}
		</div>
	);
}
