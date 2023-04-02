import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './partials/navbarUser';
import Jumbotron from './partials/Homepage/jumbotronHomepage';
import About from './partials/Homepage/aboutHomepage';
import BlogCard from './partials/Homepage/blogHomepage';
import Event from './partials/Homepage/eventHomepage';
import Footer from './partials/footer';
import ModalConfirm from './partials/modalConfirm';
import ModalAddReport from './partials/Homepage/addReportModal';

export default function Homepage() {
	const [credentials, setCredentials] = React.useState(
		JSON.parse(localStorage.getItem('credentials')) || {
			user: { name: 'load..', email: 'load..' },
		}
	);
	const [modalAddReport, setModalAddReport] = React.useState(false);

	const navigate = useNavigate();

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
			<BlogCard />
			<Footer />
			<ModalConfirm
				id="popup-modal"
				message="Anda yakin ingin keluar?"
				handleYes={handleLogout}
			/>
			<div className="relative">
				<button
					type="button"
					onClick={handleToAddReport}
					className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm md:text-base lg:text-lg py-2 px-4 text-center fixed bottom-0 right-0 inline-flex items-center m-4 md:m-5 lg:m-6 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
					Buat aduan
					<ion-icon
						name="add-circle-outline"
						id="add-circle"
						size="large"></ion-icon>
					<span className="sr-only">Buat aduan</span>
				</button>
			</div>
			{modalAddReport ? (
				<ModalAddReport
					id="modalAddReport"
					setCloseModalAddReport={() => setModalAddReport(false)}
				/>
			) : (
				''
			)}
		</div>
	);
}
