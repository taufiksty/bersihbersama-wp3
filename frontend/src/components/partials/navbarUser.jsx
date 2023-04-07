import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {
	const [activeSection, setActiveSection] = React.useState('home');
	const sections = React.useRef([]);

	const handleScroll = () => {
		const pageYOffset = window.pageYOffset;
		let newActiveSection = null;

		sections.current.forEach((section) => {
			const sectionOffsetTop = section.offsetTop - 350;
			const sectionHeight = section.offsetHeight;

			if (
				pageYOffset >= sectionOffsetTop &&
				pageYOffset < sectionOffsetTop + sectionHeight
			) {
				newActiveSection = section.id;
			}
		});

		setActiveSection(newActiveSection);
	};

	React.useEffect(() => {
		sections.current = document.querySelectorAll('section');
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const navigate = useNavigate();

	const handleToLogin = (e) => {
		e.preventDefault();
		navigate('/login');
	};

	return (
		<nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<a
					href="#"
					className="flex items-center">
					<span className="self-center text-2xl lg:ml-2 font-semibold whitespace-nowrap text-primary-600 dark:text-white">
						BersihBersama
					</span>
				</a>
				<div className="flex md:order-2">
					<button
						data-collapse-toggle="navbar-sticky"
						type="button"
						className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						aria-controls="navbar-sticky"
						aria-expanded="false">
						<span className="sr-only">Open main menu</span>
						<svg
							className="w-6 h-6"
							aria-hidden="true"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
								clipRule="evenodd"></path>
						</svg>
					</button>
				</div>
				<div
					className="items-center justify-between hidden w-full md:-mr-24 lg:-mr-[520px] md:flex md:w-auto md:order-1"
					id="navbar-sticky">
					<ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						<li className="md:py-1">
							<a
								href="#home"
								className={`block py-2 pl-3 pr-4 ${
									activeSection === 'home'
										? 'bg-primary-600 text-white md:text-primary-600 md:bg-white'
										: 'text-gray-900'
								} text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 md:p-0 md:dark:hover:text-primary-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
								aria-current="page">
								Home
							</a>
						</li>
						<li className="md:py-1">
							<a
								href="#about"
								className={`block py-2 pl-3 pr-4 ${
									activeSection === 'about'
										? 'bg-primary-600 text-white md:text-primary-600 md:bg-white'
										: 'text-gray-900'
								} text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 md:p-0 md:dark:hover:text-primary-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
								Tentang
							</a>
						</li>
						<li className="md:py-1">
							<a
								href="#events"
								className={`block py-2 pl-3 pr-4 ${
									activeSection === 'events'
										? 'bg-primary-600 text-white md:text-primary-600 md:bg-white'
										: 'text-gray-900'
								} text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 md:p-0 md:dark:hover:text-primary-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
								Kegiatan
							</a>
						</li>
						<li className="md:py-1">
							<a
								href="#blog"
								className={`block py-2 pl-3 pr-4 ${
									activeSection === 'blog'
										? 'bg-primary-600 text-white md:text-primary-600 md:bg-white'
										: 'text-gray-900'
								} text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 md:p-0 md:dark:hover:text-primary-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
								Blog
							</a>
						</li>
						<li className="md:py-1">
							<a
								href="#contact"
								className={`block py-2 pl-3 pr-4 ${
									activeSection === 'contact'
										? 'bg-primary-600 text-white md:text-primary-600 md:bg-white'
										: 'text-gray-900'
								} text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 md:p-0 md:dark:hover:text-primary-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
								Kontak
							</a>
						</li>
						{props.credentials.token === undefined ? (
							<li className="mt-3 md:mt-0">
								<button
									type="button"
									onClick={handleToLogin}
									className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
									Login
								</button>
							</li>
						) : (
							<li className="mt-3 md:mt-0">
								<div>
									<button
										type="button"
										className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
										aria-expanded="false"
										data-dropdown-toggle="dropdown-user">
										<span className="sr-only">Open user menu</span>
										<img
											className="w-8 h-8 rounded-full"
											src={`http://localhost:8080/images/profile/${props.credentials.user.image}`}
											alt="user photo"
										/>
									</button>
								</div>
								<div
									className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
									id="dropdown-user">
									<div
										className="px-4 py-3"
										role="none">
										<p
											className="text-sm text-gray-900 dark:text-white"
											role="none">
											{props.credentials.user.name}
										</p>
										<p
											className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
											role="none">
											{props.credentials.user.email}
										</p>
									</div>
									<ul
										className="py-1"
										role="none">
										{props.credentials.user.role == 1 && (
											<li>
												<button
													onClick={() => {
														navigate('/admin');
														window.location.reload();
													}}
													className="block w-full text-left px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
													Halaman Admin
												</button>
											</li>
										)}
										<li>
											<button
												data-modal-target="popup-modal"
												data-modal-toggle="popup-modal"
												className="block w-full text-left px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
												role="menuitem">
												Keluar
											</button>
										</li>
									</ul>
								</div>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}
