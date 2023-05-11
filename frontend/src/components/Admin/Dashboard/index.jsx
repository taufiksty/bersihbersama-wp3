import React from 'react';
import axios from 'axios';
import Users from './users';
import Events from './events';
import Reports from './reports';
import Blogs from './blogs';

export default function Dasboard(props) {
	const [users, setUsers] = React.useState({});
	const [events, setEvents] = React.useState({});
	const [reports, setReports] = React.useState({});
	const [blogs, setBlogs] = React.useState({});

	// Get Data User
	React.useEffect(() => {
		axios
			.get('http://localhost:8080/api/v1/users', {
				headers: { Authorization: `Bearer ${props.token}` },
			})
			.then((response) => setUsers(response.data))
			.catch((error) => console.log(error));
	}, []);

	// Get Data Events
	React.useEffect(() => {
		axios
			.get('http://localhost:8080/api/v1/events', {
				headers: { Authorization: `Bearer ${props.token}` },
			})
			.then((response) => setEvents(response.data))
			.catch((error) => console.log(error));
	}, []);

	// Get Data Reports
	React.useEffect(() => {
		axios
			.get('http://localhost:8080/api/v1/reports', {
				headers: { Authorization: `Bearer ${props.token}` },
			})
			.then((response) => setReports(response.data))
			.catch((error) => console.log(error));
	}, []);

	// Get Data Blogs
	React.useEffect(() => {
		axios
			.get('http://localhost:8080/api/v1/blogs', {
				headers: { Authorization: `Bearer ${props.token}` },
			})
			.then((response) => setBlogs(response.data))
			.catch((error) => console.log(error));
	}, []);

	return (
		<div className="mt-20 mx-3 md:ml-[290px] lg:mr-[180px] md:flex md:flex-row md:flex-wrap md:justify-evenly md:gap-4 lg:justify-start lg:gap-6">
			<Users
				countUser={users.count_user}
				countAdmin={users.count_admin}
				totalUsers={users.total_users}
				setSelectedMenuUsers={props.setSelectedMenuUsers}
			/>
			<Events
				countDone={events.count_done}
				countNotDone={events.count_not_done}
				totalEvents={events.total_events}
				setSelectedMenuEvents={props.setSelectedMenuEvents}
			/>
			<Reports
				countAccepted={reports.count_accepted}
				countNotAccepted={reports.count_not_accepted}
				totalReports={reports.total_reports}
				setSelectedMenuReports={props.setSelectedMenuReports}
			/>
			<Blogs
				totalBlogs={blogs.total_blogs}
				setSelectedMenuBlogs={props.setSelectedMenuBlogs}
			/>
		</div>
	);
}
