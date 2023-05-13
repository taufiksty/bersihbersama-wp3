import React from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import ModalConfirm from '../Partials/modals/modalConfirm';
import { useNavigate } from 'react-router-dom';
import Footer from '../Partials/Footer';

export default function BlogCard(props) {
	const [credentials, setCredentials] = React.useState(
		localStorage.getItem('credentials')
			? JSON.parse(localStorage.getItem('credentials'))
			: ''
	);

	const navigate = useNavigate();
	const [dataBlogs, setDataBlogs] = React.useState([]);

	React.useEffect(() => {
		const getDataBlogs = async () => {
			await axios
				.get(`http://localhost:8080/api/v1/blogs`, {
					headers: { Authorization: `Bearer ${credentials.token}` },
				})
				.then((response) => setDataBlogs(response.data.data))
				.catch((error) => console.log(error));
		};

		getDataBlogs();
	}, []);

	const handleLogout = (e) => {
		e.preventDefault();
		localStorage.removeItem('credentials');
		navigate('/', { replace: true });
		window.location.reload();
	};

	function daysToNow(dateCreated) {
		const date1 = new Date(dateCreated);
		const date2 = new Date();
		const millisecondsPerDay = 1000 * 60 * 60 * 24;
		const diffInMilliseconds = Math.abs(date2 - date1);
		const days = Math.floor(diffInMilliseconds / millisecondsPerDay);
		return days;
	}

	const Blogs = () => {
		const items = dataBlogs.map((item, i) => (
			<article
				key={i}
				className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 transition-transform duration-300 ease-in-out hover:scale-105">
				<div className="flex justify-between items-center mb-5 text-gray-500">
					<span className="bg-primary-100 text-primary-600 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-600">
						<svg
							className="mr-1 w-3 h-3"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
								clipRule="evenodd"></path>
							<path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
						</svg>
						Article
					</span>
					<span className="text-sm">{`${daysToNow(
						item.created_at
					)} hari yang lalu`}</span>
				</div>
				<h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					<a
						className="cursor-pointer"
						onClick={() =>
							navigate(`/blogs/${item.id}`, {
								state: { dataBlog: item, dataBlogs },
							})
						}>
						{item.title}
					</a>
				</h2>
				<p className="mb-5 font-light text-gray-500 dark:text-gray-400">
					{`${item.excerpt}...`}
				</p>
				<div className="flex justify-between items-center">
					<div className="flex items-center space-x-4">
						<img
							className="w-7 h-7 rounded-full"
							src="http://localhost:8080/images/profile/default.png"
							alt="Author avatar"
						/>
						<span className="font-medium dark:text-white">Admin</span>
					</div>
					<a
						onClick={() =>
							navigate(`/blogs/${item.id}`, {
								state: { dataBlog: item, dataBlogs },
							})
						}
						className="inline-flex cursor-pointer items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
						Baca selengkapnya
						<svg
							className="ml-2 w-4 h-4"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
								clipRule="evenodd"></path>
						</svg>
					</a>
				</div>
			</article>
		));

		return <div className="grid gap-8 md:mx-5 lg:grid-cols-2">{items}</div>;
	};

	const handleToMoreBlog = (e) => {
		e.preventDefault();
		navigate('/blogs', { state: { credentials: props.credentials } });
	};

	return (
		<div>
			<Navbar
				credentials={credentials}
				activeSection="blogs"
			/>
			<section
				id="blog"
				className="mt-16 bg-white pb-16 dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
				<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
					<div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
						<h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
							Blog
						</h2>
						<p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
							Temukan beragam informasi dan tips menarik seputar menjaga
							lingkungan dan kegiatan BersihBersama.
						</p>
					</div>
					<Blogs />
				</div>
			</section>
			<Footer />
			<ModalConfirm
				id="popup-modal"
				message="Anda yakin ingin keluar?"
				handleYes={handleLogout}
			/>
		</div>
	);
}
