import React from 'react';

export default function Footer(props) {
	return (
		<section id="contact">
			<footer className="p-4 bg-gray-100 sm:p-6 dark:bg-gray-800">
				<div className=" my-8 mx-auto max-w-screen-xl">
					<div className="md:flex md:justify-between">
						<div className="mb-6 md:mb-0">
							<a
								href="#"
								className="flex items-center">
								<span className="self-center text-2xl lg:ml-2 font-semibold whitespace-nowrap text-primary-600 dark:text-white">
									BersihBersama
								</span>
							</a>
						</div>
						<div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
							<div>
								<h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
									Sumber daya
								</h2>
								<ul className="text-gray-600 dark:text-gray-400">
									<li className="mb-4">
										<a
											href="#"
											className="hover:underline">
											UBSI
										</a>
									</li>
									<li>
										<a
											href="#"
											className="hover:underline">
											Sistem Informasi
										</a>
									</li>
								</ul>
							</div>
							<div>
								<h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
									Ikuti kami
								</h2>
								<ul className="text-gray-600 dark:text-gray-400">
									<li className="mb-4">
										<a
											href="#"
											className="hover:underline ">
											Instagram
										</a>
									</li>
									<li>
										<a
											href="#"
											className="hover:underline">
											Twitter
										</a>
									</li>
								</ul>
							</div>
							<div>
								<h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
									Legal
								</h2>
								<ul className="text-gray-600 dark:text-gray-400">
									<li className="mb-4">
										<a
											href="#"
											className="hover:underline">
											Kebijakan Privasi
										</a>
									</li>
									<li>
										<a
											href="#"
											className="hover:underline">
											Syarat &amp; Ketentuan
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
					<div className="sm:flex sm:items-center sm:justify-between">
						<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
							© 2023{' '}
							<a
								href="#"
								className="hover:underline">
								BersihBersama
							</a>
							. All Rights Reserved.
						</span>
						<div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
							<a
								href="#"
								className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
								<ion-icon name="mail"></ion-icon>
							</a>
							<a
								href="#"
								className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
								<ion-icon name="logo-instagram"></ion-icon>
							</a>
							<a
								href="#"
								className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
								<ion-icon name="logo-twitter"></ion-icon>
							</a>
							<a
								href="#"
								className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
								<ion-icon name="logo-whatsapp"></ion-icon>
							</a>
							<a
								href="#"
								className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
								<ion-icon name="logo-youtube"></ion-icon>
							</a>
						</div>
					</div>
				</div>
			</footer>
		</section>
	);
}
