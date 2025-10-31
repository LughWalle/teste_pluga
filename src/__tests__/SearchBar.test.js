import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../components/SearchBar';

jest.mock('../components/SearchBar/style.module.css', () => ({
  container: 'container',
  icon: 'icon',
  input: 'input'
}));

jest.mock('../assets/searchIcon.svg', () => 'lupa-icon.svg');

describe('Componente SearchBar', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test('renderiza corretamente o campo de busca', () => {
    render(<SearchBar value="" onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('Buscar ferramenta');
    expect(input).toBeInTheDocument();
  });

  test('renderiza o ícone de lupa', () => {
    render(<SearchBar value="" onChange={mockOnChange} />);
    
    const iconeLupa = screen.getByAltText('Buscar');
    expect(iconeLupa).toBeInTheDocument();
    expect(iconeLupa).toHaveAttribute('src', 'lupa-icon.svg');
  });

  test('exibe o valor fornecido no input', () => {
    const valorInicial = 'teste de busca';
    render(<SearchBar value={valorInicial} onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('Buscar ferramenta');
    expect(input).toHaveValue(valorInicial);
  });

  test('chama onChange quando o usuário digita', () => {
    render(<SearchBar value="" onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('Buscar ferramenta');
    fireEvent.change(input, { target: { value: 'novo texto' } });
    
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('novo texto');
  });

  test('mantém o placeholder quando o input está vazio', () => {
    render(<SearchBar value="" onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('Buscar ferramenta');
    expect(input).toHaveAttribute('placeholder', 'Buscar ferramenta');
  });

  test('tem o tipo correto definido como text', () => {
    render(<SearchBar value="" onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('Buscar ferramenta');
    expect(input).toHaveAttribute('type', 'text');
  });
});