import React from 'react';
import Navbar from './navbarUser';
import AlertSuccess from './alertSuccess';
import ModalConfirm from './modalConfirm';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './footer';
import axios from 'axios';
import ModalFinishEvent from './modalFinishEvent';

export default function EventDetails() {
	const [credentials, setCredentials] = React.useState(
		localStorage.getItem('credentials')
			? JSON.parse(localStorage.getItem('credentials'))
			: ''
	);

	const [isShow, setIsShow] = React.useState(false);
	const [isShowFinishEvent, setIsShowFinishEvent] = React.useState(false);

	const navigate = useNavigate();

	const location = useLocation();
	const data = location.state.dataEvent;

	const [checkUserInEvent, setCheckUserInEvent] = React.useState(false);
	const [countPartisipant, setCountPartisipant] = React.useState(0);

	React.useEffect(() => {
		const getCheckUserOnEvent = async () => {
			await axios
				.get(
					`http://localhost:8080/api/v1/events/checkUserInAnEvent/${data.id}/${credentials.user.id}`,
					{
						headers: { Authorization: `Bearer ${credentials.token}` },
					}
				)
				.then((response) => setCheckUserInEvent(response.data.data))
				.catch((error) => console.log(error));
		};

		getCheckUserOnEvent();
	}, [data]);

	const handleJoinEvent = (e) => {
		e.preventDefault();
		axios
			.post(
				`http://localhost:8080/api/v1/events/join/${data.id}`,
				{
					userId: credentials.user.id,
				},
				{
					headers: { Authorization: `Bearer ${credentials.token}` },
				}
			)
			.then((response) => {
				if (response.status === 201) {
					window.location.reload();
					setIsShow(true);
				}
			})
			.catch((error) => console.log(error));
	};

	React.useEffect(() => {
		const getCountPartisipant = async () => {
			axios
				.get(
					`http://localhost:8080/api/v1/events/getCountPartisipant/${data.id}`,
					{
						headers: { Authorization: `Bearer ${credentials.token}` },
					}
				)
				.then((response) =>
					setCountPartisipant(response.data.data.partisipant_count)
				)
				.catch((error) => console.log(error));
		};

		getCountPartisipant();
	}, []);

	function dateFormat(date) {
		const dateArr = date.split('-');
		return `${dateArr[1]}-${dateArr[2]}-${dateArr[0]}`;
	}

	const handleLogout = (e) => {
		e.preventDefault();
		localStorage.removeItem('credentials');
		navigate('/', { replace: true });
		window.location.reload();
	};

	const handleFinishEvent = (e) => {
		e.preventDefault();
		setIsShowFinishEvent(true);
	};

	console.log(data.done);
	const [current, setCurrent] = React.useState(0);

	const next = () => {
		setCurrent(
			current === JSON.parse(data.images).length - 1 ? 0 : current + 1
		);
	};

	const prev = () => {
		setCurrent(
			current === 0 ? JSON.parse(data.images).length - 1 : current - 1
		);
	};

	return (
		<div>
			{isShow && (
				<AlertSuccess
					message="Anda berhasil terdaftar kegiatan ini"
					setAlertSuccess={() => setIsShow(false)}
					w="mt-20 -mb-20"
				/>
			)}
			<Navbar
				credentials={credentials}
				activeSection="events"
			/>
			{data ? (
				<div
					id="content"
					className="my-24 mx-3 md:mx-20 lg:mx-72">
					<p className="text-2xl text-gray-900 text-center font-bold mb-6">
						Detail Kegiatan
					</p>
					<p></p>
					<div
						id="default-carousel"
						className="relative lg:w-[500px] lg:m-auto"
						data-carousel="static">
						<div className="relative h-56 overflow-hidden rounded-lg md:h-96">
							{JSON.parse(data?.images).map((image, i) => (
								<div
									key={i}
									className={`${i != current ? 'hidden' : ''} ease-in-out`}
									data-carousel-item>
									<img
										src={`http://localhost:8080/images/events/${image}`}
										className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
										alt="..."
									/>
								</div>
							))}
						</div>
						<button
							type="button"
							onClick={prev}
							className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
							data-carousel-prev>
							<span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
								<svg
									aria-hidden="true"
									className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M15 19l-7-7 7-7"></path>
								</svg>
								<span className="sr-only">Previous</span>
							</span>
						</button>
						<button
							type="button"
							onClick={next}
							className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
							data-carousel-next>
							<span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
								<svg
									aria-hidden="true"
									className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M9 5l7 7-7 7"></path>
								</svg>
								<span className="sr-only">Next</span>
							</span>
						</button>
					</div>
					<figcaption className="text-gray-500 text-xs text-center lg:text-sm mt-1">
						Doc. BersihBersama
					</figcaption>
					<div className="mt-7 bg-primary-100 bg-opacity-30 p-3 rounded shadow">
						<p className="font-semibold text-xl">{data.title}</p>
						<p className="mt-3">{data.description}</p>
					</div>
					<div className="mt-4 bg-primary-100 bg-opacity-30 p-3 rounded shadow">
						<p className="font-semibold text-xl">Alamat</p>
						<p className="mt-3">{data.address}</p>
						<p className="mt-2">{`${data.district}, ${data.city}, ${data.province}`}</p>
						<p className="mt-2">
							<i>Link maps</i> :{' '}
							<a
								className="text-primary-600 dark:text-primary-500 hover:underline cursor-pointer"
								href={data.link_map}
								target="_blank">
								Link Gmaps
							</a>
						</p>
					</div>
					<div className="mt-4 bg-primary-100 bg-opacity-30 p-3 rounded shadow">
						<p className="font-semibold text-xl">Pelaksanaan Kegiatan</p>
						<p className="mt-3">Tanggal : {dateFormat(data.date)}</p>
						<p className="mt-2">
							Partisipan yang diharapkan : {data.total_people} orang
						</p>
						<p className="mt-2">
							Partisipan saat ini : {countPartisipant} orang
						</p>
					</div>
					<div className="mt-10 text-center">
						{credentials.user.role == 1 ? (
							data.done == 0 ? (
								<button
									type="button"
									onClick={handleFinishEvent}
									className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg px-5 py-2.5 dark:bg-primary-500 dark:hover:bg-primary-600 focus:outline-none dark:focus:ring-primary-700">
									Konfirmasi kegiatan selesai
								</button>
							) : (
								<div className="mt-4 bg-primary-100 bg-opacity-30 p-3 rounded shadow">
									<p>Kegiatan sudah selesai</p>
								</div>
							)
						) : checkUserInEvent ? (
							<div className="mt-4 bg-primary-100 bg-opacity-30 p-3 rounded shadow">
								<p>
									Terima kasih sudah bergabung dalam kegiatan ini,{' '}
									<a
										className="text-primary-600 dark:text-primary-500 hover:underline cursor-pointer"
										href={data.link_groupwa}>
										silakan gabung grup whatsapp melalui link berikut
									</a>
									.
								</p>
							</div>
						) : (
							<button
								type="button"
								onClick={handleJoinEvent}
								className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg px-5 py-2.5 dark:bg-primary-500 dark:hover:bg-primary-600 focus:outline-none dark:focus:ring-primary-700">
								Ikuti
							</button>
						)}
					</div>
				</div>
			) : (
				<p>Loading...</p>
			)}
			<Footer />
			<ModalConfirm
				id="popup-modal"
				message="Anda yakin ingin keluar?"
				handleYes={handleLogout}
			/>
			{isShowFinishEvent && (
				<ModalFinishEvent
					setIsShow={() => setIsShowFinishEvent(false)}
					eventId={data.id}
					token={credentials.token}
				/>
			)}
		</div>
	);
}
