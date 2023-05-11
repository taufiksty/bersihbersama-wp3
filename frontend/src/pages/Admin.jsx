import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Admin/Navbar';
import Sidebar from '../components/Admin/Sidebar';
import Dashboard from '../components/Admin/Dashboard';
import TableUser from '../components/Admin/Users';
import TableEvents from '../components/Admin/Events';
import TableReports from '../components/Admin/Reports';
import TableBlogs from '../components/Admin/Blogs';
import AlertSuccess from '../components/Partials/alerts/AlertSuccessCenter';
import ModalConfirm from '../components/Partials/modalConfirm';

export default function Admin() {
	const location = useLocation();

	const credentials = JSON.parse(localStorage.getItem('credentials'));

	const [selectedMenu, setSelectedMenu] = React.useState(
		location.state?.menu || 'dashboard'
	);
	const [alertSuccess, setAlertSuccess] = React.useState({
		isSuccess: location.state?.isSuccess,
		message: location.state?.message,
	});

	const navigate = useNavigate();

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
			{/* Modal Confirm Logout */}
			<ModalConfirm
				id="popup-modal"
				message="Anda yakin ingin keluar?"
				handleYes={handleLogout}
			/>

			{/* Alert Success */}
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

			<Navbar credentials={credentials.user} />

			<Sidebar
				selectedMenu={selectedMenu}
				click={{
					dashboard: () => clickedMenu('dashboard'),
					users: () => clickedMenu('users'),
					events: () => clickedMenu('events'),
					reports: () => clickedMenu('reports'),
					blogs: () => clickedMenu('blogs'),
				}}
			/>

			{selectedMenu == 'dashboard' && (
				<Dashboard
					name={selectedMenu}
					token={credentials.token}
					setSelectedMenuUsers={() => setSelectedMenu('users')}
					setSelectedMenuEvents={() => setSelectedMenu('events')}
					setSelectedMenuReports={() => setSelectedMenu('reports')}
					setSelectedMenuBlogs={() => setSelectedMenu('blogs')}
				/>
			)}

			{selectedMenu == 'users' && (
				<TableUser
					name={selectedMenu}
					token={credentials.token}
				/>
			)}

			{selectedMenu == 'events' && (
				<TableEvents
					name={selectedMenu}
					token={credentials.token}
				/>
			)}

			{selectedMenu == 'reports' && (
				<TableReports
					name={selectedMenu}
					token={credentials.token}
				/>
			)}

			{selectedMenu == 'blogs' && (
				<TableBlogs
					name={selectedMenu}
					token={credentials.token}
				/>
			)}
		</section>
	);
}
