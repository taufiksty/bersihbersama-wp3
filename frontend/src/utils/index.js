export const daysToNow = (dateCreated) => {
	const date1 = new Date(dateCreated);
	const date2 = new Date();
	const millisecondsPerDay = 1000 * 60 * 60 * 24;
	const diffInMilliseconds = Math.abs(date2 - date1);
	const days = Math.floor(diffInMilliseconds / millisecondsPerDay);
	return days;
};

export const toTitleCase = (str) => {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};

export const dateFormat = (date) => {
	const dateSplit = date.split('-');
	return `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}`;
};
