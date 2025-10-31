import { render, screen, fireEvent } from '@testing-library/react';
import { AppCard } from '../components/AppCard';

jest.mock('../components/AppCard/style.module.css', () => ({
  card: 'card',
  logo: 'logo',
  name: 'name'
}));

describe('AppCard Componente', () => {
  const mockApp = {
    name: 'Test App',
    icon: 'test-icon.png',
    color: '#FF0000'
  };
  
  const mockOnOpen = jest.fn();

  beforeEach(() => {
    mockOnOpen.mockClear();
  });

  test('renderiza informações corretamente', () => {
    render(<AppCard app={mockApp} onOpen={mockOnOpen} />);
    
    expect(screen.getByText('Test App')).toBeInTheDocument();
    
    const image = screen.getByAltText('Test App logo');
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('test-icon.png');
  });

  test('aplica background color', () => {
    render(<AppCard app={mockApp} onOpen={mockOnOpen} />);
    
    const card = screen.getByRole('button');
    expect(card).toHaveStyle({ backgroundColor: '#FF0000' });
  });

  test('chama onOpen ao clicar', () => {
    render(<AppCard app={mockApp} onOpen={mockOnOpen} />);
    
    const card = screen.getByRole('button');
    fireEvent.click(card);
    
    expect(mockOnOpen).toHaveBeenCalledTimes(1);
    expect(mockOnOpen).toHaveBeenCalledWith(mockApp);
  });
});