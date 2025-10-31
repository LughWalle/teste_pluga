import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { CardGrid, Modal, Pagination, SearchBar } from './components';
import useFetchTools from './hooks/useFetchTools';
import { useLastViewed } from './hooks/useLastViewer';
import ReactModal from 'react-modal';

function App() {
  const PAGE_SIZE = 12;
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(true)
  const [selected, setSelected] = useState(null)

  const { lastViewed, pushLastViewed } = useLastViewed()
  const { tools, loading, error } = useFetchTools();

  useEffect(() => {
    ReactModal.setAppElement('#root');
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tools;
    return tools.filter(t => (t.name || '').toLowerCase().includes(q) || (t.description || '').toLowerCase().includes(q));
  }, [tools, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);
  
  const openModal = (app) => {
    setSelected(app);
    setModalOpen(true);
    pushLastViewed({ id: app.app_id, name: app.name, link: app.link, icon: app.icon, color: app.color });
  }

  return (
    <div className="App">
      <SearchBar value={query} onChange={val => { setQuery(val); setPage(1); }} />
      {error && <div>Erro ao carregar ferramentas.</div>}
      {!error && (
        <>
          <CardGrid items={pageItems} onOpen={openModal} loading={loading}/>
          <div style={{ marginTop: 16 }}>
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </div>
        </>
      )}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        app={selected}
        lastViewed={lastViewed}
      />
    </div>
  );
}

export default App;
