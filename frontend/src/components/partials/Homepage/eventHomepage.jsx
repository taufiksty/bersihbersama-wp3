import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Event(props) {
	const navigate = useNavigate();
	const [dataEvents, setDataEvents] = React.useState([]);

	React.useEffect(() => {
		const getDataEvents = async () => {
			await axios
				.get(`http://localhost:8080/api/v1/events`, {
					headers: { Authorization: `Bearer ${props.credentials.token}` },
				})
				.then((response) => setDataEvents(response.data.data))
				.catch((error) => console.log(error));
		};

		getDataEvents();
	}, []);

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
		props.credentials.token === undefined
			? navigate('/login', {
					state: { isError: true, message: 'Anda harus masuk dahulu.' },
			  })
			: navigate('/events');
	};

	const Cards = () => {
		const onlyFourComponents = dataEvents.slice(0, 4);
		const items = onlyFourComponents.map((item, i) => (
			<div
				key={i}
				className="items-center bg-gray-50 rounded-lg shadow block dark:bg-gray-800 dark:border-gray-700 transition-transform duration-300 ease-in-out hover:scale-105">
				<a
					className="cursor-pointer"
					onClick={() =>
						navigate(`/events/${item.id}`, { state: { dataEvent: item } })
					}>
					<img
						className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
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
								navigate(`/events/${item.id}`, { state: { dataEvent: item } })
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
					{!props.credentials.token ? (
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
			<div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">{items}</div>
		);
	};

	return (
		<section
			id="events"
			className="bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
			<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
				<div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
					<h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
						Aksi
					</h2>
					<p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
						Gabung dan eksplor lebih jauh lagi tentang kegiatan BersihBersama
						kami!
					</p>
				</div>
				<Cards />
				<div className="text-center">
					<button
						type="button"
						onClick={handleToMoreEvent}
						className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						Aksi lainnya
						<svg
							aria-hidden="true"
							className="w-5 h-5 ml-2 -mr-1"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
								clipRule="evenodd"></path>
						</svg>
					</button>
				</div>
			</div>
		</section>
	);
}
