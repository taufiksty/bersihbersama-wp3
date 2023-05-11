import axios from 'axios';
import React from 'react';
import Navbar from '../Partials/navbarUser';
import ModalConfirm from '../Partials/modalConfirm';
import { useNavigate } from 'react-router-dom';
import Footer from '../Partials/Footer';

export default function Event(props) {
	const [credentials, setCredentials] = React.useState(
		localStorage.getItem('credentials')
			? JSON.parse(localStorage.getItem('credentials'))
			: ''
	);

	const navigate = useNavigate();
	const [dataEvents, setDataEvents] = React.useState([]);

	React.useEffect(() => {
		const getDataEvents = async () => {
			await axios
				.get(`http://localhost:8080/api/v1/events`, {
					headers: { Authorization: `Bearer ${credentials.token}` },
				})
				.then((response) =>
					setDataEvents(response.data.data.filter((i) => i.done == 0))
				)
				.catch((error) => console.log(error));
		};

		getDataEvents();
	}, []);

	const handleLogout = (e) => {
		e.preventDefault();
		localStorage.removeItem('credentials');
		navigate('/', { replace: true });
		window.location.reload();
	};

	const Cards = () => {
		const items = dataEvents.map((item, i) => (
			<div
				key={i}
				className="items-center bg-gray-50 rounded-lg shadow block dark:bg-gray-800 dark:border-gray-700 transition-transform duration-300 ease-in-out hover:scale-105">
				<a
					className="cursor-pointer"
					onClick={() =>
						navigate(`/events/${item.id}`, { state: { dataEvent: item } })
					}>
					<img
						className="w-full rounded-lg"
						src={`http://localhost:8080/images/events/${
							JSON.parse(item.images)[0]
						}`}
						alt={item.title}
					/>
				</a>
				<div className="p-5">
					<h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
						<a
							className="cursor-pointer"
							onClick={() =>
								navigate(`/events/${item.id}`, {
									state: { dataEvent: item },
								})
							}>
							{item.title}
						</a>
					</h3>
					<span className="text-gray-500 dark:text-gray-400">
						{`${item.district}, ${item.city}, ${item.province}`}
					</span>
					<p className="font-light text-gray-500 dark:text-gray-400">
						Jumlah partisipan yang dibutuhkan : {item.total_people}
					</p>
					<p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
						{item.description.length > 65
							? `${item.description.slice(0, 65)}...`
							: item.description}
					</p>
					{!credentials.token ? (
						<button
							type="button"
							onClick={handleToFollowEvent}
							className="sm:mt-0 text-primary-600 hover:text-white border border-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-primary-400 dark:text-primary-400 dark:hover:text-white dark:hover:bg-primary-400 dark:focus:ring-primary-700">
							Ikuti
						</button>
					) : (
						<a
							onClick={() =>
								navigate(`/events/${item.id}`, { state: { dataEvent: item } })
							}
							className="font-medium text-primary-600 dark:text-primary-500 hover:underline cursor-pointer">
							Lihat detail
						</a>
					)}
				</div>
			</div>
		));

		return (
			<div className="grid gap-8 mb-6 lg:mb-16 md:mx-5 md:grid-cols-2">
				{items}
			</div>
		);
	};

	const handleToFollowEvent = (e) => {
		e.preventDefault();
		props.credentials.token === undefined
			? navigate('/login', {
					state: { isError: true, message: 'Anda harus masuk dahulu.' },
			  })
			: '';
	};

	const handleToMoreEvent = (e) => {
		e.preventDefault();
		navigate('/events', { state: { credentials: props.credentials } });
	};

	return (
		<div>
			<Navbar
				credentials={credentials}
				activeSection="events"
			/>
			<section
				id="events"
				className="mt-16 bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
				<div className="py-10 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
					<div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
						<h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
							Kegiatan
						</h2>
						<p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
							Gabung dan eksplor lebih jauh lagi tentang kegiatan BersihBersama
							kami!
						</p>
					</div>
					<Cards />
				</div>
				<Footer />
			</section>
			<ModalConfirm
				id="popup-modal"
				message="Anda yakin ingin keluar?"
				handleYes={handleLogout}
			/>
		</div>
	);
}
