import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ModalFinishEvent({ setIsShow, eventId, token }) {
	const [imageFiles, setImageFiles] = React.useState(null);

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		let formData = new FormData();
		for (const key in imageFiles) {
			formData.append('image[]', imageFiles[key]);
		}

		axios
			.post(`http://localhost:8080/api/v1/events/finish/${eventId}`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((response) => {
				if (response.status == 201) {
					setIsShow;
					navigate('/admin', {
						state: {
							isSuccess: true,
							message: 'Konfirmasi kegiatan selesai berhasil.',
						},
					});
					window.location.reload();
				}
			});
	};

	return (
		<div
			aria-hidden="true"
			className="bg-opacity-50 flex justify-center bg-black overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 items-center w-full md:inset-0 h-full">
			<div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
				<div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
					<div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
							Masukkan foto-foto kegiatan
						</h3>
						<button
							type="button"
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
							onClick={setIsShow}>
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
					<form
						action="#"
						encType="multipart/form-data">
						<div className="grid gap-4 mb-4 sm:grid-cols-2">
							<div className="sm:col-span-2">
								<input
									className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
									id="images"
									type="file"
									name="image[]"
									onChange={(e) => setImageFiles(e.target.files)}
									multiple="multiple"
								/>
							</div>
						</div>
						<div className="flex justify-center mt-6">
							<button
								type="submit"
								onClick={handleSubmit}
								className="text-white text-center inline-flex items-center bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
								<svg
									className="mr-1 -ml-1 w-6 h-6"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
										clipRule="evenodd"></path>
								</svg>
								Simpan
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
