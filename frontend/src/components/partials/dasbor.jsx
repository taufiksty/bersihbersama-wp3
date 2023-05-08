import React from 'react';
import axios from 'axios';
import User from './Dasbor/users';
import Events from './Dasbor/events';
import Reports from './Dasbor/reports';
import Blogs from './Dasbor/blogs';

export default function Dasbor(props) {
	const [users, setUsers] = React.useState({});
	const [events, setEvents] = React.useState({});
	const [reports, setReports] = React.useState({});
	const [blogs, setBlogs] = React.useState({});

	React.useEffect(() => {
		axios
			.get('http://localhost:8080/api/v1/users', {
				headers: { Authorization: `Bearer ${props.token}` },
			})
			.then((response) => setUsers(response.data))
			.catch((error) => console.log(error));
	}, []);

	React.useEffect(() => {
		axios
			.get('http://localhost:8080/api/v1/events', {
				headers: { Authorization: `Bearer ${props.token}` },
			})
			.then((response) => setEvents(response.data))
			.catch((error) => console.log(error));
	}, []);

	React.useEffect(() => {
		axios
			.get('http://localhost:8080/api/v1/reports', {
				headers: { Authorization: `Bearer ${props.token}` },
			})
			.then((response) => setReports(response.data))
			.catch((error) => console.log(error));
	}, []);

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
			<User
				count_user={users.count_user}
				count_admin={users.count_admin}
				total_users={users.total_users}
				setSelectedMenuUsers={props.setSelectedMenuUsers}
			/>
			<Events
				count_done={events.count_done}
				count_not_done={events.count_not_done}
				total_events={events.total_events}
				setSelectedMenuEvents={props.setSelectedMenuEvents}
			/>
			<Reports
				count_accepted={reports.count_accepted}
				count_not_accepted={reports.count_not_accepted}
				total_reports={reports.total_reports}
				setSelectedMenuReports={props.setSelectedMenuReports}
			/>
			<Blogs
				total_blogs={blogs.total_blogs}
				setSelectedMenuBlogs={props.setSelectedMenuBlogs}
			/>
		</div>
	);
}
