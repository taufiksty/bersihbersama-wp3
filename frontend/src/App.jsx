import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/homepage';
import Login from './components/login';
import Register from './components/register';
import './App.css';
import Dashboard from './components/dashboardAdmin';
import EventUser from './components/eventUser';
import BlogUser from './components/blogUser';

function App() {
	const [isAuthenticated, setIsAuthenticated] = React.useState(
		localStorage.getItem('credentials') ? true : false
	);
	const [role, setRole] = React.useState(
		JSON.parse(localStorage.getItem('credentials'))?.user.role || 0
	);

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
					element={isAuthenticated && role == 1 ? <Dashboard /> : <Login />}
				/>
				<Route
					path="/events"
					element={<EventUser />}
				/>
				<Route
					path="/blogs"
					element={<BlogUser />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
