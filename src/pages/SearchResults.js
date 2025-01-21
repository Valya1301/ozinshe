import React from 'react';

const SearchResults = ({ results }) => {
  return (
    <div>
      <h2>Результаты поиска</h2>
      {results.length > 0 ? (
        <ul>
          {results.map((movie) => (
            <li key={movie.id}>{movie.name}</li>
          ))}
        </ul>
      ) : (
        <p>Нет результатов</p>
      )}
    </div>
  );
};

export default SearchResults;
