import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ModalAddBlog from '../../Partials/modals/blogs/modalAddBlog';
import ModalUpdateBlog from '../../Partials/modals/blogs/modalUpdateBlog';
import ModalDeleteBlog from '../../Partials/modals/blogs/modalDeleteBlog';

export default function TableBlogs(props) {
	const [data, setData] = React.useState([]);
	const [search, setSearch] = React.useState('');
	const [showModalAddBlog, setShowModalAddBlog] = React.useState(false);
	const [showModalUpdateBlog, setShowModalUpdateBlog] = React.useState({
		isShow: false,
		blog: {},
	});
	const [showModalDeleteBlog, setShowModalDeleteBlog] = React.useState({
		isShow: false,
		blog: {},
	});

	const navigate = useNavigate();

	// useEffect Get Data Blogs
	React.useEffect(() => {
		const getData = async () => {
			await axios
				.get(`http://localhost:8080/api/v1/${props.name}`, {
					headers: { Authorization: `Bearer ${props.token}` },
				})
				.then((response) => setData(response.data.data))
				.catch((error) => console.log(error));
		};

		getData();
	}, []);

	const handleSubmitSearch = (e) => {
		e.preventDefault();
		const getDataSearch = async () => {
			await axios
				.get(`http://localhost:8080/api/v1/${props.name}`, {
					headers: { Authorization: `Bearer ${props.token}` },
					params: { search: search },
				})
				.then((response) => setData(response.data.data))
				.catch((error) => console.log(error));
		};

		getDataSearch();
	};

	const Table = () => {
		const Columns = () => {
			let dataColumns = data[0];
			let keys = Object.keys(dataColumns || {});
			return keys.map((name, i) => {
				return name == 'id' ||
					name == 'updated_at' ||
					name == 'excerpt' ||
					name == 'content' ||
					name == 'image' ? (
					''
				) : (
					<th
						key={i}
						scope="col"
						className="px-6 py-3">
						{name == 'created_at'
							? 'Created At'
							: name == 'user_id'
							? 'User Id'
							: name}
					</th>
				);
			});
		};

		const RowBlogs = () => {
			return data.map((item, i) => (
				<tr
					className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
					key={i}>
					<th
						scope="row"
						className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
						{item.title}
					</th>
					<td className="px-6 py-4">{item.user_id}</td>
					<td className="px-6 py-4">{item.category}</td>
					<td className="px-6 py-4">{item.created_at}</td>
					<td className="p-4">
						<button
							type="button"
							className="font-medium text-start text-primary-600 dark:text-primary-500 hover:underline"
							onClick={() =>
								navigate(`/blogs/${item.id}`, {
									state: { dataBlog: item, dataBlogs: data },
								})
							}>
							Lihat detail
						</button>
						<button
							type="button"
							className="font-medium block pt-2 text-blue-600 dark:text-blue-500 hover:underline"
							onClick={() =>
								setShowModalUpdateBlog({ isShow: true, blog: item })
							}>
							Ubah
						</button>
						<button
							type="button"
							className="button-delete font-medium block pt-2 text-red-600 dark:text-blue-500 hover:underline"
							onClick={() =>
								setShowModalDeleteBlog({ isShow: true, blog: item })
							}>
							Hapus
						</button>
					</td>
				</tr>
			));
		};

		return (
			<table className="w-full mt-2 text-xs text-left rounded shadow-md text-gray-500 dark:text-gray-400">
				<thead className="text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<Columns />
						<th
							scope="col"
							className="px-6 py-3">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="overflow-y-auto">{<RowBlogs />}</tbody>
			</table>
		);
	};

	return (
		<div className="p-4 pt-20 sm:ml-64">
			<div className="relative overflow-x-auto md:overflow-x-scroll sm:rounded-lg">
				<form action="#">
					<label
						htmlFor="default-search"
						className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
						Search
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<svg
								aria-hidden="true"
								className="w-5 h-5 text-gray-500 dark:text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
							</svg>
						</div>
						<input
							type="search"
							id="default-search"
							className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Cari berdasarkan..."
							required=""
							name="search"
							value={search}
							autoFocus
							onChange={(e) => setSearch(e.target.value)}
						/>
						<button
							type="submit"
							onClick={handleSubmitSearch}
							className="text-white absolute right-2.5 bottom-2.5 bg-primary-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
							Cari
						</button>
					</div>
					<button
						type="button"
						onClick={() => setShowModalAddBlog(true)}
						className="mt-2 w-full text-primary-600 hover:text-white border border-primary-600 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-primary-500 dark:text-primary-500 dark:hover:text-white dark:hover:bg-primary-500 dark:focus:ring-primary-800">
						Tambah Blog
					</button>
				</form>

				{showModalAddBlog && (
					<ModalAddBlog
						setIsShow={() => setShowModalAddBlog(false)}
						token={props.token}
					/>
				)}

				{showModalUpdateBlog.isShow && (
					<ModalUpdateBlog
						blog={showModalUpdateBlog.blog}
						setIsShow={() =>
							setShowModalUpdateBlog({ isShow: false, blog: {} })
						}
						token={props.token}
					/>
				)}

				{showModalDeleteBlog.isShow && (
					<ModalDeleteBlog
						blog={showModalDeleteBlog.blog}
						setIsShow={() =>
							setShowModalDeleteBlog({ isShow: false, blog: {} })
						}
						token={props.token}
						message="Anda yakin ingin menghapusnya?"
					/>
				)}

				<Table />
			</div>
		</div>
	);
}
