import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import EventUser from './components/Users/Events';
import BlogUser from './components/Users/Blogs';
import Profile from './components/Users/Profile';
import EventDetails from './components/Partials/eventDetails';
import BlogDetails from './components/Partials/blogDetails';
import NotFound from './pages/NotFound';
import ServerError from './pages/ServerError';

function App() {
	const isAuthenticated = localStorage.getItem('credentials') ? true : false;
	const role = isAuthenticated
		? JSON.parse(localStorage.getItem('credentials'))?.user.role
		: 0;

	// Expiration Credentials
	React.useEffect(() => {
		const storedCredentials = localStorage.getItem('credentials');

		if (storedCredentials) {
			const { expirationTime } = JSON.parse(storedCredentials);
			const currentTime = Math.floor(Date.now() / 1000);

			if (currentTime > expirationTime) {
				localStorage.removeItem('credentials');
				window.location.href = '/';
			}
		}
	}, []);

	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={<Homepage />}
				/>
				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/register"
					element={<Register />}
				/>
				<Route
					path="/admin"
					element={isAuthenticated && role == 1 ? <Admin /> : <Login />}
				/>
				<Route
					path="/profil"
					element={isAuthenticated ? <Profile /> : <Login />}
				/>
				<Route
					path="/events"
					element={<EventUser />}
				/>
				<Route
					path="/events/:id"
					element={<EventDetails />}
				/>
				<Route
					path="/blogs"
					element={<BlogUser />}
				/>
				<Route
					path="/blogs/:id"
					element={<BlogDetails />}
				/>
				<Route
					path="/serverError"
					element={<ServerError />}
				/>
				<Route
					path="*"
					element={<NotFound />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
