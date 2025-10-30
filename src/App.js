import { useState } from 'react';
import './App.css';
import { SearchBar } from './components';

function App() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  return (
    <div className="App">
      <h1>Pluga App</h1>
      <SearchBar value={query} onChange={val => { setQuery(val); setPage(1); }} />

    </div>
  );
}

export default App;
