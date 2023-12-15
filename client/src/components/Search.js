import React, { useState } from 'react';

const Search = () => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (e) => {
        setSearchText(e.target.value);
        // Perform search logic here
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={handleSearch}
            />
            <button>Search</button>
        </div>
    );
};

export default Search;
