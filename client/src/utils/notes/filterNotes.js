const filterNotes = (notes, filters) => {
    const { searchTerm, planet, sign, degree } = filters;

    const planets = ['Ascendant', 'Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'Midheaven', 'North Node', 'South Node'];
    const planetIndex = planets.indexOf(planet);

    const filteredNotes = notes.filter(note => {
        const planetTag = note.chartTags && note.chartTags[planetIndex];

        const termMatch = !searchTerm || 
            (note.title && note.title.toLowerCase().includes(searchTerm.toLowerCase())) || 
            (note.content && note.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (note.userTags && note.userTags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) ||
            (note.chartTags && note.chartTags.some(tag => 
                (tag.planet && tag.planet.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (tag.sign && tag.sign.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (tag.degree && String(tag.degree).toLowerCase().includes(searchTerm.toLowerCase()))
            ));

        const planetMatch = !planet || !!planetTag;
        const signMatch = !sign || (note.chartTags && note.chartTags.some(tag => tag.sign === sign));
        const degreeMatch = !degree || (note.chartTags && note.chartTags.some(tag => Number(tag.degree) === Number(degree)));
        return termMatch && planetMatch && signMatch && degreeMatch;
    });

    console.log('filteredNotes:', filteredNotes);

    return filteredNotes;
};

export default filterNotes;