import { render, screen, fireEvent } from '@testing-library/react';
import { CardGrid } from '../components/CardGrid';

jest.mock('../components/CardGrid/style.module.css', () => ({
  grid: 'grid',
  skeletonCard: 'skeletonCard'
}));

jest.mock('../components/AppCard', () => ({
  AppCard: ({ app, onOpen }) => (
    <div role="button" onClick={() => onOpen(app)}>
      {app.name}
    </div>
  )
}));

jest.mock('../components/Skeleton', () => ({
  Skeleton: ({ 'data-testid': tid }) => <div data-testid={tid || 'skeleton'} />
}));

describe('CardGrid componente', () => {
  test('renderiza 12 skeletons quando loading for true', () => {
    const { container } = render(<CardGrid items={[]} onOpen={() => {}} loading={true} />);

    const wrappers = container.getElementsByClassName('skeletonCard');
    expect(wrappers.length).toBe(12);
  });

  test('renderiza os itens quando loading for false', () => {
    const items = [
      { id: '1', name: 'App Um' },
      { id: '2', name: 'App Dois' }
    ];

    render(<CardGrid items={items} onOpen={() => {}} loading={false} />);

    expect(screen.getByText('App Um')).toBeInTheDocument();
    expect(screen.getByText('App Dois')).toBeInTheDocument();
  });

  test('chama onOpen com o item correto quando AppCard é clicado', () => {
    const items = [{ id: '1', name: 'App Clique' }];
    const onOpen = jest.fn();

    render(<CardGrid items={items} onOpen={onOpen} loading={false} />);

    const button = screen.getByRole('button', { name: /App Clique/i });
    fireEvent.click(button);

    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onOpen).toHaveBeenCalledWith(items[0]);
  });
});
