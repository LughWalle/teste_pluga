import RCModal from 'react-modal';

export const Modal = ({ isOpen, onRequestClose, app, lastViewed }) => {
  if (!app) return null;
  console.log('Modal renderizado:', isOpen);
  return (
    <RCModal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel={`${app.name} detalhes`}>
      <button onClick={onRequestClose} aria-label="Fechar">Fechar</button>
      <h2>{app.name}</h2>
      <img src={app.logo} alt="" style={{height: 60}}/>
      <p>{app.description}</p>
      <a href={app.link || app.url} target="_blank" rel="noopener noreferrer">Ver no site da Pluga</a>

      <section>
        <h3>Últimas ferramentas visualizadas</h3>
        <ul>
          {lastViewed.slice(0,3).map(t => (
            <li key={t.id || t.name}>
              {t.name}
            </li>
          ))}
        </ul>
      </section>
    </RCModal>
  );
}
