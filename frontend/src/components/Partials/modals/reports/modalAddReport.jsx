import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ModalAddReport(props) {
	const [provinces, setProvinces] = React.useState([]);
	const [cities, setCities] = React.useState([]);
	const [districts, setDistricts] = React.useState([]);
	const [regionId, setRegionId] = React.useState({});
	const [imageFile, setImageFile] = React.useState(null);
	const [valueSubmit, setValueSubmit] = React.useState({
		user_id: props.user_id,
	});

	const navigate = useNavigate();

	React.useEffect(() => {
		axios
			.get(
				'https://kanglerian.github.io/api-wilayah-indonesia/api/provinces.json'
			)
			.then((response) => setProvinces(response.data))
			.catch((error) => {});
	}, []);

	React.useEffect(() => {
		axios
			.get(
				`https://kanglerian.github.io/api-wilayah-indonesia/api/regencies/${regionId.province}.json`
			)
			.then((response) => setCities(response.data))
			.catch((error) => {});
	}, [regionId.province]);

	React.useEffect(() => {
		axios
			.get(
				`https://kanglerian.github.io/api-wilayah-indonesia/api/districts/${regionId.city}.json`
			)
			.then((response) => setDistricts(response.data))
			.catch((error) => {});
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

	const handleAddSubmit = (e) => {
		e.preventDefault();

		let formData = new FormData();
		for (const key in imageFile) {
			formData.append('image[]', imageFile[key]);
		}
		formData.append('data', JSON.stringify(valueSubmit));

		axios
			.post(`http://localhost:8080/api/v1/reports`, formData, {
				headers: {
					Authorization: `Bearer ${props.token}`,
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((response) => {
				console.log(response.data);
				if (response.data.success) {
					props.setCloseModalAddReport();
					navigate('/', {
						state: {
							isSuccess: true,
							message: 'Aduan berhasil dikirim. Lihat riwayat aduanmu',
							variant: 'addReport'
						},
					});
					window.location.reload();
				}
			})
			.catch((e) => console.log(e));
	};

	return (
		<div
			id={props.id}
			tabIndex="-1"
			aria-hidden="true"
			className="bg-opacity-50 flex bg-black overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full">
			<div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
				<div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
					<div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
							Buat Aduan
						</h3>
						<button
							type="button"
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
							onClick={props.setCloseModalAddReport}>
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
									Apa yang ingin Anda adukan?
								</label>
								<input
									type="text"
									name="title"
									id="title"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									placeholder="Sampah di pintu air"
									required=""
									onChange={(e) =>
										setValueSubmit((oldState) => ({
											...oldState,
											title: e.target.value,
										}))
									}
								/>
							</div>
							<div className="sm:col-span-2">
								<label
									htmlFor="description"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Deskripsikan yang Anda lihat
								</label>
								<textarea
									id="description"
									onChange={(e) =>
										setValueSubmit((oldState) => ({
											...oldState,
											description: e.target.value,
										}))
									}
									rows="4"
									className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									placeholder="Terdapat tumpukan sampah yang menghambat aliran sungai"></textarea>
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
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									placeholder="Jl. Wahid Khasim"
									onChange={(e) =>
										setValueSubmit((oldState) => ({
											...oldState,
											address: e.target.value,
										}))
									}
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
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
							<div className="sm:col-span-2">
								<label
									htmlFor="link_map"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Link google map lokasi
								</label>
								<input
									type="text"
									name="link_map"
									id="link_map"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									placeholder="https://goo.gl/maps/5yAazK1XA8VqS3LH7Jl"
									onChange={(e) =>
										setValueSubmit((oldState) => ({
											...oldState,
											link_map: e.target.value,
										}))
									}
								/>
							</div>
							<div className="sm:col-span-2">
								<label
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									htmlFor="images">
									Foto Pendukung
								</label>
								<input
									className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
									id="images"
									type="file"
									name="image[]"
									onChange={(e) => setImageFile(e.target.files)}
									multiple="multiple"
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
								Kirim
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
