import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';

export default function ModalAddBlog(props) {
	const [imageFile, setImageFile] = React.useState(null);
	const [valueSubmit, setValueSubmit] = React.useState({ content: '' });
	const editor = React.useRef(null);

	const navigate = useNavigate();

	React.useEffect(() => {
		const credentials = JSON.parse(localStorage.getItem('credentials'));
		const user_id = credentials.user.id;
		setValueSubmit((oldState) => ({ ...oldState, user_id: user_id }));
	}, []);

	React.useEffect(() => {
		const stringWithTags = valueSubmit.content;
		const stringWithoutTags = stringWithTags.replace(/<[^>]+>|&[^;]+;/g, '');
		const excerptToSubmit = stringWithoutTags.substring(0, 250);
		setValueSubmit((oldState) => ({ ...oldState, excerpt: excerptToSubmit }));
	}, [valueSubmit.content]);

	const handleAddSubmit = (e) => {
		e.preventDefault();

		let formData = new FormData();
		formData.append('data', JSON.stringify(valueSubmit));
		formData.append('image', imageFile[0]);

		axios
			.post(`http://localhost:8080/api/v1/blogs`, formData, {
				headers: {
					Authorization: `Bearer ${props.token}`,
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((response) => {
				console.log(response.data);
				if (response.data.success) {
					props.setIsShow();
					navigate('/admin', {
						state: {
							menu: 'blogs',
							isSuccess: true,
							message: 'Post berhasil ditambahkan.',
						},
					});
					window.location.reload();
				}
			})
			.catch((e) => console.log(e));
	};

	return (
		<div
			aria-hidden="true"
			className="bg-opacity-50 flex justify-center bg-black overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 items-center w-full md:inset-0 h-full">
			<div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
				<div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
					<div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
							Tambah Blog
						</h3>
						<button
							type="button"
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
							onClick={props.setIsShow}>
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
								<label
									htmlFor="title"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Judul Post
								</label>
								<input
									type="text"
									name="title"
									id="title"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									placeholder="5 Cara Mengolah Sampah Menjadi Bernilai Guna"
									required=""
									onChange={(e) =>
										setValueSubmit((oldState) => ({
											...oldState,
											title: e.target.value,
										}))
									}
								/>
							</div>
							<div>
								<label
									htmlFor="province"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Kategori Post
								</label>
								<select
									id="category"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									onChange={(event) =>
										setValueSubmit((oldState) => ({
											...oldState,
											category: event.target.value,
										}))
									}>
									<option>Pilih kategori</option>
									<option>Artikel</option>
								</select>
							</div>
							<div className="sm:col-span-2">
								<label
									htmlFor="content"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Konten Post
								</label>
								<JoditEditor
									ref={editor}
									className="max-h-20 overflow-y-auto"
									initialValue="<strong>Tulis isi kontenmu di sini</strong>"
									onChange={(content) => {
										setValueSubmit((oldState) => ({
											...oldState,
											content: content,
										}));
									}}
								/>
							</div>
							<div className="sm:col-span-2">
								<label
									htmlFor="excerpt"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Excerpt
								</label>
								<input
									type="text"
									name="excerpt"
									id="excerpt"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									required=""
									value={valueSubmit.excerpt}
									disabled=""
								/>
							</div>
							<div className="sm:col-span-2">
								<label
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									htmlFor="images">
									Foto Post
								</label>
								<input
									className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
									id="image"
									type="file"
									name="image"
									onChange={(e) => setImageFile(e.target.files)}
								/>
							</div>
						</div>
						<div className="flex justify-center mt-6">
							<button
								type="submit"
								onClick={handleAddSubmit}
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
