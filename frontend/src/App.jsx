import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './components/homepage';
import Login from './components/login';
import Register from './components/register';
import DashboardAdmin from './components/admin';
import EventUser from './components/eventUser';
import BlogUser from './components/blogUser';
import Profile from './components/profile';
import EventDetails from './components/partials/eventDetails';
import BlogDetails from './components/partials/blogDetails';

function App() {
	const isAuthenticated = localStorage.getItem('credentials') ? true : false;
	const role = isAuthenticated
		? JSON.parse(localStorage.getItem('credentials'))?.user.role
		: 0;

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
					element={
						isAuthenticated && role == 1 ? <DashboardAdmin /> : <Login />
					}
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
			</Routes>
		</Router>
	);
}

export default App;
