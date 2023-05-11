import React from 'react';

export default function EventList(props) {
	const { dataEvents, navigate, token, handleToFollowEvent } = props;

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
					className="w-full md:rounded-lg rounded-none rounded-l-lg"
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
				{!token ? (
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

	return <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">{items}</div>;
}
