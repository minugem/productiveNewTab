import React, { useState } from 'react';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        window.location = `https://www.google.com/search?q=${searchTerm}`;
    };

    return (
        <div className='searchBarDiv'>
            <form className='searchBar' onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search Google"
                    value={searchTerm}
                    onChange={handleChange}
                    autoFocus
                />
                <button className='searchButton' type="submit">
                    <span class="material-symbols-outlined">
                        search
                    </span>
                </button>
            </form>
        </div>
    );
}

export default SearchBar;
