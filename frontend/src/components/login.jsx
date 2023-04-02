import axios from 'axios';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AlertError from './partials/alertError';
import AlertSuccess from './partials/alertSuccess';

export default function Login() {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [token, setToken] = React.useState('');
	const [user, setUser] = React.useState({});

	const navigate = useNavigate();
	const location = useLocation();

	const [alertError, setAlertError] = React.useState({
		isError: location.state?.isError,
		message: location.state?.message,
	});
	const [alertSuccess, setAlertSuccess] = React.useState({
		isSuccess: location.state?.isSuccess,
		message: location.state?.message,
	});

	console.log(alertError);

	const handleSubmit = (e) => {
		e.preventDefault();

		const setAuthUserAndRedirect = (token, uid) => {
			axios
				.get(`http://localhost:8080/api/v1/users/${uid}`, {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((res) => {
					setUser(res.data.data);
				})
				.catch((e) => console.log(e));
		};

		const setTokenAndGetAuthUser = (token) => {
			setToken(token);
			axios
				.get('http://localhost:8080/api/v1/auth/user', {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((response) =>
					setAuthUserAndRedirect(token, response.data.data.id)
				)
				.catch((e) => console.log(e));
		};

		const getToken = () => {
			axios
				.post('http://localhost:8080/api/v1/auth/token', {
					email: email,
					password: password,
				})
				.then((response) =>
					response.data.success
						? setTokenAndGetAuthUser(response.data.token)
						: setAlertError({
								isError: true,
								message:
									'Upaya masuk gagal, pengguna tidak ditemukan. Periksa kembali email dan password Anda.',
						  })
				)
				.catch((e) => console.log(e));
		};

		if (alertError.isError) return;

		getToken();
	};

	React.useEffect(() => {
		if (user.role === '1') {
			navigate('/admin', {
				state: { user: user, token: token },
				replace: true,
			});
		} else if (user.role === '2') {
			localStorage.setItem(
				'credentials',
				JSON.stringify({ user: user, token: token })
			);
			navigate('/', { replace: true });
			window.location.reload();
		}
	}, [user]);

	return (
		<section className="bg-gray-100 dark:bg-gray-900">
			{alertError.isError ? (
				<AlertError
					message={alertError.message}
					setAlertError={() => setAlertError({ isError: false })}
				/>
			) : (
				''
			)}
			{alertSuccess.isSuccess ? (
				<AlertSuccess
					message={alertSuccess.message}
					setAlertSuccess={() =>
						setAlertSuccess((oldState) => ({ ...oldState, isSuccess: false }))
					}
				/>
			) : (
				''
			)}
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen align-middle md:h-screen lg:py-0">
				<a
					href="#"
					className="flex items-center mb-6 text-2xl font-semibold text-primary-600 dark:text-white">
					BersihBersama
				</a>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Masuk ke akunmu
						</h1>
						<form
							className="space-y-4 md:space-y-6"
							action="#">
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Email Anda
								</label>
								<input
									type="email"
									name="email"
									id="email"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="name@mail.com"
									required=""
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Kata Sandi
								</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required=""
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input
											id="remember"
											aria-describedby="remember"
											type="checkbox"
											className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
											required=""
										/>
									</div>
									<div className="ml-3 text-sm">
										<label
											htmlFor="remember"
											className="text-gray-500 dark:text-gray-300">
											Ingat saya
										</label>
									</div>
								</div>
								<a
									href="#"
									className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
									Lupa kata sandi?
								</a>
							</div>
							<button
								type="submit"
								className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
								onClick={handleSubmit}>
								Masuk
							</button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Belum memiliki akun?{' '}
								<a
									href="/register"
									className="font-medium text-primary-600 hover:underline dark:text-primary-500">
									Daftar
								</a>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
