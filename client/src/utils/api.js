export const getPlanetData = async () => {
	const response = await fetch("http://localhost:3000/api/planetData");
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();
	return data;
};

export const getNotes = async (userId) => {
	const response = await fetch(
		`http://localhost:3000/api/notes?userId=${userId}`
	);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();
	return data;
};

export const getAstroData = async () => {
	const response = await fetch("http://localhost:3000/api/astroData");
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();
	return data;
};
