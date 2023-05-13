import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ModalUpdateUser(props) {
	const [provinces, setProvinces] = React.useState([]);
	const [cities, setCities] = React.useState([]);
	const [districts, setDistricts] = React.useState([]);
	const [regionId, setRegionId] = React.useState({});
	const [imageFile, setImageFile] = React.useState(null);
	const [valueSubmit, setValueSubmit] = React.useState(props.user);
	const credentials = JSON.parse(localStorage.getItem('credentials'));

	const navigate = useNavigate();

	React.useEffect(() => {
		axios
			.get(
				'https://kanglerian.github.io/api-wilayah-indonesia/api/provinces.json'
			)
			.then((response) => setProvinces(response.data))
			.catch((error) => console.log(error));
	}, []);

	React.useEffect(() => {
		axios
			.get(
				`https://kanglerian.github.io/api-wilayah-indonesia/api/regencies/${regionId.province}.json`
			)
			.then((response) => setCities(response.data));
	}, [regionId.province]);

	React.useEffect(() => {
		axios
			.get(
				`https://kanglerian.github.io/api-wilayah-indonesia/api/districts/${regionId.city}.json`
			)
			.then((response) => setDistricts(response.data));
	}, [regionId.city]);

	function toTitleCase(str) {
		return str.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}

	function handleSelectedProvince(event) {
		const selectedIndex = event.target.options.selectedIndex;
		setValueSubmit((oldState) => ({
			...oldState,
			province: event.target.value,
		}));
		setRegionId((oldState) => ({
			...oldState,
			province: event.target.options[selectedIndex].getAttribute('data-key'),
		}));
	}

	function handleSelectedCities(event) {
		const selectedIndex = event.target.options.selectedIndex;
		setValueSubmit((oldState) => ({
			...oldState,
			city: event.target.value,
		}));
		setRegionId((oldState) => ({
			...oldState,
			city: event.target.options[selectedIndex].getAttribute('data-key'),
		}));
	}

	function handleSelectedDistrict(event) {
		setValueSubmit((oldState) => ({
			...oldState,
			district: event.target.value,
		}));
	}

	function handleUpdateSubmit(event) {
		event.preventDefault();

		let formData = new FormData();
		formData.append('image', imageFile);
		formData.append('data', JSON.stringify(valueSubmit));

		axios
			.post(
				`http://localhost:8080/api/v1/users/update/${valueSubmit.id}`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${props.token}`,
						'Content-Type': 'multipart/form-data',
					},
				}
			)
			.then((response) => {
				if (response.data.success) {
					axios
						.get(`http://localhost:8080/api/v1/users/${credentials.user.id}`, {
							headers: { Authorization: `Bearer ${props.token}` },
						})
						.then((response) =>
							localStorage.setItem(
								'credentials',
								JSON.stringify({
									token: credentials.token,
									user: response.data.data,
								})
							)
						);
					props.setIsShow();
					if (credentials.user.role == 1) {
						navigate('/admin', {
							state: {
								menu: 'users',
								isSuccess: true,
								message: 'Perubahan berhasil.',
							},
						});
					} else {
						navigate('/profil', {
							state: {
								isSuccess: true,
								message: 'Data berhasil diubah.',
							},
						});
						window.location.reload();
					}
				}
			})
			.catch((e) => console.log(e));
	}

	return (
		<div
			aria-hidden="true"
			className="fixed flex justify-center top-0 left-0 right-0 bottom-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full bg-opacity-50 bg-black">
			<div className="relative md:pt-10 lg:py-14 w-full h-full max-w-lg md:h-fit">
				<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
					<button
						type="button"
						className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
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
					<div className="px-6 py-6 lg:px-8">
						<h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
							Ubah Pengguna
						</h3>
						<form
							className="space-y-6"
							action="#">
							<div>
								<label
									htmlFor="name"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Nama
								</label>
								<input
									type="text"
									name="nama"
									id="nama"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
									placeholder="nama"
									value={valueSubmit.name}
									onChange={(e) =>
										setValueSubmit((oldState) => ({
											...oldState,
											name: e.target.value,
										}))
									}
									required
								/>
							</div>
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Email
								</label>
								<input
									disabled={props.user.role == 2 ? true : false}
									type="email"
									name="email"
									id="email"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
									placeholder="name@company.com"
									value={valueSubmit.email}
									onChange={(e) =>
										setValueSubmit((oldState) => ({
											...oldState,
											email: e.target.value,
										}))
									}
									required
								/>
							</div>
							<div>
								<label
									htmlFor="address"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Alamat
								</label>
								<input
									type="text"
									name="address"
									id="address"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
									placeholder="Jl. Wahid Khasim No. 38"
									value={valueSubmit.address}
									onChange={(e) =>
										setValueSubmit((oldState) => ({
											...oldState,
											address: e.target.value,
										}))
									}
									required
								/>
							</div>
							<div>
								<label
									htmlFor="province"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Provinsi
								</label>
								<select
									id="province"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									onChange={handleSelectedProvince}>
									<option>Pilih provinsi</option>
									{provinces.map((item) => (
										<option
											key={item.id}
											value={toTitleCase(item.name)}
											data-key={item.id}>
											{toTitleCase(item.name)}
										</option>
									))}
								</select>
							</div>
							<div>
								<label
									htmlFor="city"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Kota/Kabupaten
								</label>
								<select
									id="city"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									onChange={handleSelectedCities}>
									<option>Pilih kota/kabupaten</option>
									{cities.map((item) => (
										<option
											key={item.id}
											value={toTitleCase(item.name)}
											data-key={item.id}>
											{toTitleCase(item.name)}
										</option>
									))}
								</select>
							</div>
							<div>
								<label
									htmlFor="district"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Kecamatan
								</label>
								<select
									id="district"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									onChange={handleSelectedDistrict}>
									<option>Pilih kecamatan</option>
									{districts.map((item) => (
										<option
											key={item.id}
											value={toTitleCase(item.name)}>
											{toTitleCase(item.name)}
										</option>
									))}
								</select>
							</div>
							<div>
								<label
									htmlFor="sm_account"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Akun sosial media
								</label>
								<input
									type="text"
									name="sm_account"
									id="sm_account"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
									placeholder="taufiksty"
									value={valueSubmit.sm_account}
									onChange={(e) =>
										setValueSubmit((oldState) => ({
											...oldState,
											sm_account: e.target.value,
										}))
									}
									required
								/>
							</div>
							{props.user.role == 1 && (
								<div>
									<label
										htmlFor="role"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Role
									</label>
									<div className="flex flex-row justify-around">
										<div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 pr-5">
											<input
												id="1"
												type="radio"
												name="role"
												value="1"
												className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
												onChange={(e) =>
													setValueSubmit((oldState) => ({
														...oldState,
														role: e.target.value,
													}))
												}
											/>
											<label
												htmlFor="bordered-radio-1"
												className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
												Admin
											</label>
										</div>
										<div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 pr-5">
											<input
												id="2"
												type="radio"
												name="role"
												value="2"
												className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
												onChange={(e) =>
													setValueSubmit((oldState) => ({
														...oldState,
														role: e.target.value,
													}))
												}
											/>
											<label
												htmlFor="bordered-radio-2"
												className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
												Partisipan
											</label>
										</div>
									</div>
								</div>
							)}
							<div>
								<label
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									htmlFor="image">
									Foto profil
								</label>
								<input
									className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
									aria-describedby="file_input_help"
									id="image"
									name="image"
									type="file"
									onChange={(e) => setImageFile(e.target.files[0])}
								/>
								<p
									className="mt-1 text-sm text-gray-500 dark:text-gray-300"
									id="file_input_help">
									PNG, JPG or JPEG (MAX. 2 MB).
								</p>
							</div>
							<button
								type="submit"
								onClick={handleUpdateSubmit}
								className="w-full text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
								Simpan
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
