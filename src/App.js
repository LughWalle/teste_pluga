import { useMemo, useState } from 'react';
import './App.css';
import { CardGrid, SearchBar } from './components';
import useFetchTools from './hooks/useFetchTools';

function App() {
  const PAGE_SIZE = 12;
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const { tools, loading, error } = useFetchTools();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tools;
    return tools.filter(t => (t.name || '').toLowerCase().includes(q) || (t.description || '').toLowerCase().includes(q));
  }, [tools, query]);

  const pageItems = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);
  return (
    <div className="App">
      <h1>Pluga App</h1>
      <SearchBar value={query} onChange={val => { setQuery(val); setPage(1); }} />
      {loading && <div>Carregando...</div>}
      {error && <div>Erro ao carregar ferramentas.</div>}
      {!loading && !error && (
        <>
          <CardGrid items={pageItems} />
        </>
      )}
    </div>
  );
}

export default App;
