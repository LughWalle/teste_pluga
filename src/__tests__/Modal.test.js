import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '../components/Modal';
import ReactModal from 'react-modal';

// Configurar o elemento root para o ReactModal
beforeAll(() => {
  ReactModal.setAppElement('#root');
});

jest.mock('../components/Modal/style.module.css', () => ({
  modal: 'modal',
  overlay: 'overlay',
  close: 'close',
  content: 'content',
  mainInfo: 'mainInfo',
  logo: 'logo',
  details: 'details',
  button: 'button',
  lastViewed: 'lastViewed',
  list: 'list',
  item: 'item',
  itemLogo: 'itemLogo'
}));

const mockOpen = jest.fn();
window.open = mockOpen;

describe('Modal', () => {
  const mockApp = {
    name: 'App Teste',
    icon: 'test-icon.png',
    color: '#FF0000',
    link: 'https://teste.com'
  };

  const mockLastViewed = [
    { id: '1', name: 'App Atual', icon: 'icon1.png', color: '#FF0000' },
    { id: '2', name: 'App Anterior 1', icon: 'icon2.png', color: '#00FF00' },
    { id: '3', name: 'App Anterior 2', icon: 'icon3.png', color: '#0000FF' },
    { id: '4', name: 'App Anterior 3', icon: 'icon4.png', color: '#FFFF00' }
  ];

  beforeEach(() => {
    mockOpen.mockClear();
  });

  test('não renderiza nada quando app é null', () => {
    const { container } = render(
      <Modal
        isOpen={true}
        onRequestClose={() => {}}
        app={null}
        lastViewed={[]}
      />
    );
    
    expect(container.firstChild).toBeNull();
  });

  test('renderiza as informações do app corretamente', () => {
    render(
      <Modal
        isOpen={true}
        onRequestClose={() => {}}
        app={mockApp}
        lastViewed={mockLastViewed}
      />
    );

    expect(screen.getByText('App Teste')).toBeInTheDocument();
    expect(screen.getByAltText('App Teste')).toHaveAttribute('src', 'test-icon.png');
    expect(screen.getByText('Acessar')).toBeInTheDocument();
  });

  test('chama onRequestClose quando o botão fechar é clicado', () => {
    const onRequestClose = jest.fn();
    render(
      <Modal
        isOpen={true}
        onRequestClose={onRequestClose}
        app={mockApp}
        lastViewed={mockLastViewed}
      />
    );

    fireEvent.click(screen.getByText('×'));
    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });

  test('abre link em nova aba quando botão Acessar é clicado', () => {
    render(
      <Modal
        isOpen={true}
        onRequestClose={() => {}}
        app={mockApp}
        lastViewed={mockLastViewed}
      />
    );

    fireEvent.click(screen.getByText('Acessar'));
    expect(mockOpen).toHaveBeenCalledWith('https://teste.com', '_blank');
  });

  test('renderiza até 3 últimas ferramentas visualizadas', () => {
    render(
      <Modal
        isOpen={true}
        onRequestClose={() => {}}
        app={mockApp}
        lastViewed={mockLastViewed}
      />
    );

    expect(screen.getByText('Últimas ferramentas visualizadas')).toBeInTheDocument();
    expect(screen.getByText('App Anterior 1')).toBeInTheDocument();
    expect(screen.getByText('App Anterior 2')).toBeInTheDocument();
    expect(screen.getByText('App Anterior 3')).toBeInTheDocument();
    
    // Não deve mostrar o App Atual na lista
    expect(screen.queryByText('App Atual')).not.toBeInTheDocument();
  });

  test('aplica cor de fundo correta no ícone', () => {
    render(
      <Modal
        isOpen={true}
        onRequestClose={() => {}}
        app={mockApp}
        lastViewed={mockLastViewed}
      />
    );

    const logo = screen.getByAltText('App Teste');
    expect(logo).toHaveStyle({ backgroundColor: '#FF0000' });
  });

  test('aplica cor padrão (#ccc) quando ferramenta visualizada não tem cor definida', () => {
    const lastViewedSemCor = [
      { id: '1', name: 'App Atual', icon: 'icon1.png' },
      { id: '2', name: 'App Sem Cor', icon: 'icon2.png' }
    ];

    render(
      <Modal
        isOpen={true}
        onRequestClose={() => {}}
        app={mockApp}
        lastViewed={lastViewedSemCor}
      />
    );

    const itemLogo = screen.getByAltText('App Sem Cor');
    expect(itemLogo).toHaveStyle({ backgroundColor: '#ccc' });
  });
});