import React from 'react';

export default function AlertSuccess(props) {
	const { setAlertSuccess, message, variant } = props;

	return (
		<div
			tabIndex="-1"
			aria-hidden="true"
			className="bg-black bg-opacity-50 flex justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 items-center w-full md:inset-0 h-modal md:h-full">
			<div className="relative p-4 w-full max-w-md h-full md:h-auto">
				<div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
					<div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
						<svg
							aria-hidden="true"
							className="w-8 h-8 text-green-500 dark:text-green-400"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clipRule="evenodd"></path>
						</svg>
						<span className="sr-only">Success</span>
					</div>
					<p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
						{message}{' '}
						{variant == 'addReport' && (
							<a
								href="/profil"
								className="hover:underline text-blue-500">
								di sini.
							</a>
						)}
					</p>
					<button
						type="button"
						onClick={setAlertSuccess}
						className="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900">
						Tutup
					</button>
				</div>
			</div>
		</div>
	);
}
