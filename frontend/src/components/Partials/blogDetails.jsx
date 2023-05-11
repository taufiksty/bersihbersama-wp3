import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './navbarUser';
import Footer from './Footer';
import ModalConfirm from './modalConfirm';
import axios from 'axios';

export default function BlogDetails() {
	const [credentials, setCredentials] = React.useState(
		localStorage.getItem('credentials')
			? JSON.parse(localStorage.getItem('credentials'))
			: ''
	);

	const location = useLocation();
	const data = location.state.dataBlog;
	const dataBlogs = location.state.dataBlogs;
	const dataNewRelated = dataBlogs.slice(0, 4);
	const [authorData, setAuthorData] = React.useState({});

	const navigate = useNavigate();

	React.useEffect(() => {
		const getAuthorData = async () => {
			axios
				.get(`http://localhost:8080/api/v1/users/${data.user_id}`, {
					headers: { Authorization: `Bearer ${credentials.token}` },
				})
				.then((response) => setAuthorData(response.data.data))
				.catch((error) => console.log(error));
		};

		getAuthorData();
	}, [data]);

	const content = data.content;

	const handleLogout = (e) => {
		e.preventDefault();
		localStorage.removeItem('credentials');
		navigate('/', { replace: true });
		window.location.reload();
	};

	function formattedDate(datetime) {
		const date = new Date(datetime);
		const day = date.getDate();
		const month = date.toLocaleString('default', { month: 'short' });
		const year = date.getFullYear();

		return `${day} ${month} ${year}`;
	}

	return (
		<div>
			<Navbar
				credentials={credentials}
				activeSection="blogs"
			/>
			<main className="mt-24 pb-12 md:mx-16 bg-white dark:bg-gray-900">
				<div className="flex justify-between px-4 mx-auto max-w-screen-xl">
					<article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
						<header className="mb-4 lg:mb-6 not-format">
							<address className="flex items-center mb-6">
								<div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
									<img
										className="mr-4 w-12 h-12 rounded-full"
										src={`http://localhost:8080/images/profile/${authorData.image}`}
										alt={authorData.name}
									/>
									<div>
										<a
											rel="author"
											className="text-xl font-bold text-gray-900 dark:text-white">
											Admin
										</a>
										<p className="text-base font-light text-gray-500 dark:text-gray-400">
											<time>{formattedDate(data.created_at)}</time>
										</p>
									</div>
								</div>
							</address>
							<h1 className="my-6 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
								{data.title}
							</h1>
						</header>
						<figure className="">
							<img
								className="rounded"
								src={`http://localhost:8080/images/blogs/${data.image}`}
								alt={data.image}
							/>
							<figcaption className="text-gray-500 text-xs lg:text-sm mt-1">
								Doc. BersihBersama
							</figcaption>
						</figure>
						<div
							className="mt-5"
							dangerouslySetInnerHTML={{
								__html: content,
							}}></div>
					</article>
				</div>
			</main>

			<aside
				aria-label="Artikel terbaru"
				className="py-8 lg:py-24 md:mx-16 bg-white dark:bg-gray-800">
				<div className="px-4 mx-auto max-w-screen-xl">
					<h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
						Artikel terbaru
					</h2>
					<div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
						{dataNewRelated.map((item, i) => (
							<article
								key={i}
								className="max-w-xs">
								<a
									className="cursor-pointer"
									onClick={() => {
										navigate(`/blogs/${item.id}`, {
											state: { dataBlog: item, dataBlogs },
										});
										window.location.reload();
									}}>
									<img
										src={`http://localhost:8080/images/blogs/${item.image}`}
										className="mb-5 rounded-lg"
										alt={item.image}
									/>
								</a>
								<h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
									<a
										className="cursor-pointer"
										onClick={() => {
											navigate(`/blogs/${item.id}`, {
												state: { dataBlog: item, dataBlogs },
											});
											window.location.reload();
										}}>
										{item.title}
									</a>
								</h2>
								<p className="mb-4 font-light text-gray-500 dark:text-gray-400">
									{`${item.excerpt}...`}
								</p>
								<a
									onClick={() => {
										navigate(`/blogs/${item.id}`, {
											state: { dataBlog: item, dataBlogs },
										});
										window.location.reload();
									}}
									className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline cursor-pointer">
									Baca selengkapnya
								</a>
							</article>
						))}
					</div>
				</div>
			</aside>

			<Footer />
			<ModalConfirm
				id="popup-modal"
				message="Anda yakin ingin keluar?"
				handleYes={handleLogout}
			/>
		</div>
	);
}
