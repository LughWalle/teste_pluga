import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../components/Pagination';

jest.mock('../components/Pagination/style.module.css', () => ({
  pagination: 'pagination',
  button: 'button'
}));

describe('Componente Pagination', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test('renderiza corretamente os botões e a numeração da página', () => {
    render(
      <Pagination
        page={2}
        totalPages={5}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('Anterior')).toBeInTheDocument();
    expect(screen.getByText('Próximo')).toBeInTheDocument();
    expect(screen.getByText('2 / 5')).toBeInTheDocument();
  });

  test('desabilita botão Anterior quando estiver na primeira página', () => {
    render(
      <Pagination
        page={1}
        totalPages={5}
        onChange={mockOnChange}
      />
    );

    const botaoAnterior = screen.getByText('Anterior');
    expect(botaoAnterior).toBeDisabled();
  });

  test('desabilita botão Próximo quando estiver na última página', () => {
    render(
      <Pagination
        page={5}
        totalPages={5}
        onChange={mockOnChange}
      />
    );

    const botaoProximo = screen.getByText('Próximo');
    expect(botaoProximo).toBeDisabled();
  });

  test('chama onChange com página anterior quando clicar em Anterior', () => {
    render(
      <Pagination
        page={3}
        totalPages={5}
        onChange={mockOnChange}
      />
    );

    const botaoAnterior = screen.getByText('Anterior');
    fireEvent.click(botaoAnterior);

    expect(mockOnChange).toHaveBeenCalledWith(2);
  });

  test('chama onChange com próxima página quando clicar em Próximo', () => {
    render(
      <Pagination
        page={3}
        totalPages={5}
        onChange={mockOnChange}
      />
    );

    const botaoProximo = screen.getByText('Próximo');
    fireEvent.click(botaoProximo);

    expect(mockOnChange).toHaveBeenCalledWith(4);
  });

  test('exibe corretamente quando há apenas uma página', () => {
    render(
      <Pagination
        page={1}
        totalPages={1}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('1 / 1')).toBeInTheDocument();
    expect(screen.getByText('Anterior')).toBeDisabled();
    expect(screen.getByText('Próximo')).toBeDisabled();
  });
});