import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/homepage';
import Login from './components/login';
import Register from './components/register';
import './App.css';
import Dashboard from './components/dashboardAdmin';

function App() {
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
					element={<Dashboard />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
