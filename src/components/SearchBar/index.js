import React from 'react';

export const SearchBar = ({ value, onChange, placeholder = "Buscar apps..." }) => {
  return (
    <input
      aria-label="Buscar apps"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className='search'
    />
  );
}
