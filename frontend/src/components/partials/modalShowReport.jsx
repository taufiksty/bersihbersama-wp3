import axios from 'axios';
import React from 'react';

export default function ModalShowReport({ report, setIsShow, token }) {
	const [user, setUser] = React.useState({});
	const [current, setCurrent] = React.useState(0);

	const next = () => {
		setCurrent(
			current === JSON.parse(report.images).length - 1 ? 0 : current + 1
		);
	};

	const prev = () => {
		setCurrent(
			current === 0 ? JSON.parse(report.images).length - 1 : current - 1
		);
	};

	React.useEffect(() => {
		axios
			.get(`http://localhost:8080/api/v1/users/${report.user_id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => setUser(response.data.data))
			.catch((error) => console.log(error));
	}, []);

	function daysToNow(dateCreated) {
		const date1 = new Date(dateCreated);
		const date2 = new Date();
		const millisecondsPerDay = 1000 * 60 * 60 * 24;
		const diffInMilliseconds = Math.abs(date2 - date1);
		const days = Math.floor(diffInMilliseconds / millisecondsPerDay);
		return days;
	}

	const handleAcceptReport = (e) => {
		e.preventDefault();
		axios
			.post(
				`http://localhost:8080/api/v1/status/acceptReport/${report.id}`,
				{ headers: { Authorization: `Bearer ${token}` } }
			)
      .then((response) => {
				if (response.data.success) {
					setIsShow();
					navigate('/admin', {
						state: {
							menu: 'reports',
							isSuccess: true,
							message: 'Aduan berhasil diterima',
						},
					});
					window.location.reload();
				}
			});
	};

	return (
		<div
			tabIndex="-1"
			aria-hidden="true"
			className="bg-black bg-opacity-50 flex justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 items-center w-full md:inset-0 h-modal md:h-full">
			<div className="relative p-4 w-full max-w-xl lg:max-w-2xl h-full md:h-auto">
				<div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
					<div className="flex justify-between mb-4 rounded-t sm:mb-5">
						<div className="text-gray-900 md:text-xl dark:text-white">
							<h3 className="text-lg font-semibold ">{report.title}</h3>
							<p className="text-xs">
								Dari {user.name} pada {daysToNow(report.created_at)} hari yang
								lalu
							</p>
						</div>
						<div>
							<button
								type="button"
								onClick={setIsShow}
								className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white">
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
						</div>
					</div>
					<dl>
						<dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
							Detail
						</dt>
						<dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
							{report.description}
						</dd>
						<dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
							Alamat
						</dt>
						<dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
							{report.address}
						</dd>
						<dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
							Wilayah
						</dt>
						<dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
							{`${report.district}, ${report.city}, ${report.province}`}
						</dd>
						<dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
							Foto pendukung
						</dt>
						<dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
							<div
								id="default-carousel"
								className="relative w-full"
								data-carousel="static">
								<div className="relative h-56 overflow-hidden rounded-lg md:h-96">
									{JSON.parse(report.images).map((image, i) => (
										<div
											key={i}
											className={`${
												i != current ? 'hidden' : ''
											} duration-700 ease-in-out`}
											data-carousel-item>
											<img
												src={`http://localhost:8080/images/reports/${image}`}
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
						</dd>
					</dl>
					<div className="flex justify-end items-center">
						{report.status == 0 ? (
							<button
								type="button"
								onClick={handleAcceptReport}
								className="inline-flex items-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-900">
								Terima
							</button>
						) : (
							<p>Sudah diterima</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
