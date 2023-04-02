import React from 'react';

export default function About(props) {
	return (
		<section
			id="about"
			className="bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
			<div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
				<div className="max-w-screen-md mb-8 lg:mb-16">
					<h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
						Selamat datang di Gerakan BersihBersama!
					</h2>
					<p className="text-gray-500 sm:text-xl dark:text-gray-400">
						Kami hadir untuk mengajak dan memotivasi masyarakat untuk
						berpartisipasi dalam menjaga kebersihan lingkungan sekitar kita.
					</p>
				</div>
				<div className="space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
					<div>
						<div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
							<ion-icon name="megaphone"></ion-icon>
						</div>
						<h3 className="mb-2 text-xl font-bold dark:text-white">
							Pengaduan
						</h3>
						<p className="text-gray-500 dark:text-gray-400">
							Laporkan area atau lokasi yang perlu diperhatikan kebersihannya.
							Ambil foto dan berikan keterangan detail agar tim kebersihan dapat
							segera menanggapi laporan Anda.
						</p>
					</div>
					<div>
						<div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
							<ion-icon name="easel"></ion-icon>
						</div>
						<h3 className="mb-2 text-xl font-bold dark:text-white">
							Informasi
						</h3>
						<p className="text-gray-500 dark:text-gray-400">
							Temukan informasi terbaru tentang kegiatan yang berlangsung di
							komunitas ini, seperti event membersihkan lingkungan atau
							pemberian edukasi tentang pentingnya menjaga kebersihan.
						</p>
					</div>
					<div>
						<div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
							<ion-icon name="library"></ion-icon>
						</div>
						<h3 className="mb-2 text-xl font-bold dark:text-white">
							Tips dan kampanye
						</h3>
						<p className="text-gray-500 dark:text-gray-400">
							Pelajari tips-tips praktis dan mudah untuk menjaga kebersihan di
							sekitar Anda, serta ikuti kampanye kebersihan untuk mendukung
							gerakan BersihBersama.
						</p>
					</div>
					<div>
						<div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
							<ion-icon name="share-social"></ion-icon>
						</div>
						<h3 className="mb-2 text-xl font-bold dark:text-white">
							Bagikan pengalamanmu
						</h3>
						<p className="text-gray-500 dark:text-gray-400">
							Bagikan pengalamanmu tentang kegiatan kebersihan yang telah kamu
							lakukan. Dengan fitur ini, kamu dapat menginspirasi orang lain
							untuk berpartisipasi dalam gerakan BersihBersama dan memberikan
							kontribusi positif untuk lingkungan.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
