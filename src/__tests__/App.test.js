import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import useFetchTools from '../hooks/useFetchTools';

jest.mock('../hooks/useFetchTools', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('App Componente', () => {
  beforeEach(() => {
    useFetchTools.mockReturnValue({
      tools: [],
      loading: false,
      error: null,
    });
  });
  
  test('renderiza searchBar', () => {
    render(<App />);
    const searchBar = screen.getByRole('textbox');
    expect(searchBar).toBeInTheDocument();
  });
  
  test('mostra mensagem de erro quando ocorre falha ao carregar ferramenta', () => {
    useFetchTools.mockReturnValue({
      tools: [],
      loading: false,
      error: 'Erro ao carregar ferramentas.',
    });
    render(<App />);
    expect(screen.getByText(/Erro ao carregar ferramentas/i)).toBeInTheDocument();
  });

  test('abre modal ao clicar', () => {
    useFetchTools.mockReturnValue({
      tools: [{ app_id: 1, name: 'Test App', link: '#', icon: './assets/searchIcon.svg', color: '' }],
      loading: false,
      error: null,
    });
    
    render(<App />);
    const card = screen.getByText(/Test App/i);
    fireEvent.click(card);
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
  test('atualiza busca ao digitar no searchBar', () => {
    render(<App />);
    const searchBar = screen.getByRole('textbox');
    
    fireEvent.change(searchBar, { target: { value: 'new query' } });
    
    expect(searchBar.value).toBe('new query');
  });
})
