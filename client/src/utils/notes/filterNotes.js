const filterNotes = (notes, filters) => {
    const { searchTerm, planet, sign, degree } = filters;

    console.log('searchTerm:', searchTerm);
    console.log('planet:', planet);
    console.log('sign:', sign);
    console.log('degree:', degree);

    const planets = ['Ascendant', 'Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'Midheaven', 'North Node', 'South Node'];
    const planetIndex = planets.indexOf(planet);

    const filteredNotes = notes.filter(note => {
        const planetTag = note.chartTags[planetIndex];

        return (
            (searchTerm === '' || planetTag.degree === searchTerm) &&
            (sign === '' || planetTag.sign === sign) &&
            (degree === '' || planetTag.degree === degree)
        );
    });

    console.log('filteredNotes:', filteredNotes);

    return filteredNotes;
};

export default filterNotes;