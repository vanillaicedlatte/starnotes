const filterNotes = (notes, filters) => {
	const { searchTerm, planet, sign, degree } = filters;

	const planets = [
		"Ascendant",
		"Sun",
		"Moon",
		"Mercury",
		"Venus",
		"Mars",
		"Jupiter",
		"Saturn",
		"Uranus",
		"Neptune",
		"Pluto",
		"Midheaven",
		"North Node",
		"South Node",
	];
	const planetIndex = planets.indexOf(planet);

	const filteredNotes = notes.filter((note) => {
		const planetTag = note.chartTags[planetIndex];

		const degreeMatch =
			degree === "" || (planetTag && String(planetTag.degree) === degree);
		const signMatch = sign === "" || (planetTag && planetTag.sign === sign);

		const termMatch =
			searchTerm === "" ||
			(note.title &&
				note.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
			(note.content &&
				note.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
			(note.userTags &&
				note.userTags.some((tag) =>
					tag.toLowerCase().includes(searchTerm.toLowerCase())
				)) ||
			(planetTag &&
				((planetTag.planet &&
					planetTag.planet.toLowerCase().includes(searchTerm.toLowerCase())) ||
					(planetTag.sign &&
						planetTag.sign.toLowerCase().includes(searchTerm.toLowerCase())) ||
					(planetTag.degree &&
						String(planetTag.degree)
							.toLowerCase()
							.includes(searchTerm.toLowerCase()))));

		return termMatch && signMatch && degreeMatch;
	});

	return filteredNotes;
};

export default filterNotes;
