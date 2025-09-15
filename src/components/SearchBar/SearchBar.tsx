import React, { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  minLength?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, minLength = 3 }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.length >= minLength || query.length === 0) {
      onSearch(query);
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Buscar productos... (mín. 3 caracteres)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        {query.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="clear-button"
          >
            ✕
          </button>
        )}
      </div>
      <button type="submit" className="search-button">
        🔍
      </button>
    </form>
  );
};

export default SearchBar;