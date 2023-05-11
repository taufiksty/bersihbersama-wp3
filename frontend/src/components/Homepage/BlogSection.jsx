import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { daysToNow } from '../../utils';
import BlogList from './BlogHomepage';

export default function BlogCard(props) {
	const { token } = props.credentials;

	const [dataBlogs, setDataBlogs] = React.useState([]);

	const navigate = useNavigate();

	// Fetch Data Blogs
	React.useEffect(() => {
		const getDataBlogs = async () => {
			await axios
				.get(`http://localhost:8080/api/v1/blogs`, {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((response) => setDataBlogs(response.data.data))
				.catch((error) => {
					console.error(error);
					window.location.href = '/serverError';
				});
		};

		getDataBlogs();
	}, []);

	const handleToMoreBlog = (e) => {
		e.preventDefault();
		token === undefined
			? navigate('/login', {
					state: { isError: true, message: 'Anda harus masuk dahulu.' },
			  })
			: navigate('/blogs');
	};

	return (
		<section
			id="blog"
			className="bg-white pb-16 dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
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
				<BlogList
					dataBlogs={dataBlogs}
					daysToNow={daysToNow}
					navigate={navigate}
					token={token}
				/>
			</div>
			<div className="text-center">
				<button
					type="button"
					onClick={handleToMoreBlog}
					className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Blog lainnya
					<svg
						aria-hidden="true"
						className="w-5 h-5 ml-2 -mr-1"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg">
						<path
							fillRule="evenodd"
							d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
							clipRule="evenodd"></path>
					</svg>
				</button>
			</div>
		</section>
	);
}
