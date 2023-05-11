import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Homepage/Navbar';
import Jumbotron from '../components/Homepage/JumbotronSection';
import About from '../components/Homepage/AboutSection';
import BlogCard from '../components/Homepage/BlogSection';
import Event from '../components/Homepage/EventSection';
import Footer from '../components/Partials/Footer';
import ModalConfirm from '../components/Partials/modalConfirm';
import ModalAddReport from '../components/Partials/modals/reports/modalAddReport';
import AlertSuccess from '../components/Partials/alerts/AlertSuccessCenter';
import ButtonAddReport from '../components/Partials/buttons/AddReportFloatingButton';

export default function Homepage() {
	const credentials = JSON.parse(localStorage.getItem('credentials')) || {
		user: { name: 'load..', email: 'load..' },
	};

	const navigate = useNavigate();
	const location = useLocation();

	const [modalAddReport, setModalAddReport] = React.useState(false);
	const [alertSuccess, setAlertSuccess] = React.useState(
		location.state?.isSuccess || false,
		location.state?.message,
		location.state?.variant
	);

	const handleLogout = (e) => {
		e.preventDefault();
		localStorage.removeItem('credentials');
		navigate('/', { replace: true });
		window.location.reload();
	};

	const handleToAddReport = (e) => {
		e.preventDefault();
		credentials.token === undefined
			? navigate('/login', {
					state: { isError: true, message: 'Anda harus masuk dahulu.' },
			  })
			: setModalAddReport(true);
	};

	return (
		<div>
			<Navbar credentials={credentials} />
			<Jumbotron credentials={credentials} />
			<About />
			<Event credentials={credentials} />
			<BlogCard credentials={credentials} />
			<Footer />

			{/* Alert Success */}
			{alertSuccess && (
				<AlertSuccess
					message={alertSuccess.message}
					variant={alertSuccess.variant}
					setAlertSuccess={() => {
						setAlertSuccess({});
						window.history.replaceState(null, '', location.pathname);
					}}
				/>
			)}

			{/* Modal Confirm */}
			<ModalConfirm
				id={credentials.token && 'popup-modal'}
				message="Anda yakin ingin keluar?"
				handleYes={handleLogout}
			/>

			{/* Floating Button Add Report */}
			<ButtonAddReport set={handleToAddReport} />

			{/* Modal Add Report */}
			{modalAddReport ? (
				<ModalAddReport
					id="modalAddReport"
					setCloseModalAddReport={() => setModalAddReport(false)}
					token={credentials.token}
					user_id={credentials.user.id}
				/>
			) : (
				''
			)}
		</div>
	);
}
