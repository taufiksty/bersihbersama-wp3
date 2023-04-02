import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FloatingButtonAddReport(props) {
	const navigate = useNavigate();

	const handleToAddReport = (e) => {
		e.preventDefault();
		props.credentials.token === undefined
			? navigate('/login', {
					state: { isError: true, message: 'Anda harus masuk dahulu.' },
			  })
			: '';
	};

	return (
		<button
			type="button"
			id="modalAddReport"
			data-toggle-modal="modalAddReport"
			onClick={handleToAddReport}
			className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm md:text-base lg:text-lg py-2 px-4 text-center fixed bottom-0 right-0 inline-flex items-center m-4 md:m-5 lg:m-6 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
			Buat aduan
			<ion-icon
				name="add-circle-outline"
				id="add-circle"
				size="large"></ion-icon>
			<span className="sr-only">Buat aduan</span>
		</button>
	);
}
