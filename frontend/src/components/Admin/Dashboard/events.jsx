import React from 'react';

export default function Events({
	countDone,
	countNotDone,
	totalEvents,
	setSelectedMenuEvents,
}) {
	return (
		<div className="max-w-sm md:w-[45%] mt-3 md:mt-0 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			<a
				href="#kegiatan"
				onClick={setSelectedMenuEvents}>
				<h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
					Kegiatan
				</h5>
			</a>
			<p className="font-normal text-gray-700 dark:text-gray-400">
				Terlaksana : {countDone}
			</p>
			<p className="font-normal text-gray-700 dark:text-gray-400">
				Belum Terlaksana : {countNotDone}
			</p>
			<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
				Total Kegiatan : {totalEvents}
			</p>
			<a
				href="#kegiatan"
				onClick={setSelectedMenuEvents}
				className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-200 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-700">
				Lihat semua
				<svg
					aria-hidden="true"
					className="w-4 h-4 ml-2 -mr-1"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
						clipRule="evenodd"></path>
				</svg>
			</a>
		</div>
	);
}
