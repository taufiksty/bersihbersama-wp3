import React from 'react';
import axios from 'axios';
import TableUserAdmin from './partials/tableUserAdmin';
import { useLocation, useNavigate } from 'react-router-dom';
import AlertSuccess from './partials/alertSuccess';
import ModalConfirm from './partials/modalConfirm';

export default function Dashboard() {
	const [selectedMenu, setSelectedMenu] = React.useState('dashboard');
	const [credentials, setCredentials] = React.useState(
		JSON.parse(localStorage.getItem('credentials')) || {
			user: { name: 'load..', email: 'load..' },
		}
	);

	const location = useLocation();
	const navigate = useNavigate();

	const [alertSuccess, setAlertSuccess] = React.useState({
		isSuccess: location.state?.isSuccess,
		message: location.state?.message,
	});

	React.useEffect(() => {
		const getCredentials = {
			user: location.state?.user,
			token: location.state?.token,
		};
		if (!getCredentials.user || !getCredentials.token) return;
		setCredentials(getCredentials);
		localStorage.setItem('credentials', JSON.stringify(getCredentials));
	}, []);

	const clickedMenu = (name) => {
		setSelectedMenu(name);
	};

	const handleLogout = (e) => {
		e.preventDefault();
		localStorage.removeItem('credentials');
		navigate('/login', { replace: true });
	};

	return (
		<section>
			{/* Alert Success */}

			{/* Modal Confirm Logout */}
			<ModalConfirm
				id="popup-modal"
				message="Anda yakin ingin keluar?"
				handleYes={handleLogout}
			/>

			<nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
				{alertSuccess.isSuccess ? (
					<AlertSuccess
						message={alertSuccess.message}
						setAlertSuccess={() => {
							setAlertSuccess((oldState) => ({
								...oldState,
								isSuccess: false,
							}));
							history.replaceState(alertSuccess, '');
							window.location.reload();
						}}
					/>
				) : (
					''
				)}
				<div className="px-3 py-3 lg:px-5 lg:pl-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center justify-start">
							<button
								data-drawer-target="logo-sidebar"
								data-drawer-toggle="logo-sidebar"
								aria-controls="logo-sidebar"
								type="button"
								className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
								<span className="sr-only">Open sidebar</span>
								<svg
									className="w-6 h-6"
									aria-hidden="true"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path
										clipRule="evenodd"
										fillRule="evenodd"
										d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
								</svg>
							</button>
							<a
								href="#"
								className="flex ml-2 md:mr-24">
								<span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-primary-600 dark:text-white">
									BersihBersama
								</span>
							</a>
						</div>
						<div className="flex items-center">
							<div className="flex items-center ml-3">
								<div>
									<button
										type="button"
										className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
										aria-expanded="false"
										data-dropdown-toggle="dropdown-user">
										<span className="sr-only">Open user menu</span>
										<img
											className="w-8 h-8 rounded-full"
											src={`http://localhost:8080/images/profile/${credentials.user.image}`}
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
											{credentials.user.name}
										</p>
										<p
											className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
											role="none">
											{credentials.user.email}
										</p>
									</div>
									<ul
										className="py-1"
										role="none">
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
							</div>
						</div>
					</div>
				</div>
			</nav>

			<aside
				id="logo-sidebar"
				className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
				aria-label="Sidebar">
				<div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
					<ul className="space-y-2">
						<li
							className={selectedMenu === 'dashboard' ? 'bg-gray-100' : ''}
							onClick={() => clickedMenu('dashboard')}>
							<a
								href="#"
								className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
								<svg
									aria-hidden="true"
									className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
									<path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
								</svg>
								<span
									className={`flex-1 ml-3 whitespace-nowrap ${
										selectedMenu === 'dashboard' ? 'text-primary-600' : ''
									}`}>
									Dasbor
								</span>
							</a>
						</li>
						<li
							className={selectedMenu === 'users' ? 'bg-gray-100' : ''}
							onClick={() => clickedMenu('users')}>
							<a
								href="#"
								className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
								<svg
									aria-hidden="true"
									className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
										clipRule="evenodd"></path>
								</svg>
								<span
									className={`flex-1 ml-3 whitespace-nowrap ${
										selectedMenu === 'users' ? 'text-primary-600' : ''
									}`}>
									Pengguna
								</span>
							</a>
						</li>
					</ul>
				</div>
			</aside>

			{selectedMenu && (
				<TableUserAdmin
					name="users"
					token={credentials.token}
				/>
			)}
		</section>
	);
}
