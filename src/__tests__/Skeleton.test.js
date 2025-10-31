import { render } from '@testing-library/react';
import { Skeleton } from '../components/Skeleton';

jest.mock('../components/Skeleton/style.module.css', () => ({
  skeleton: 'skeleton'
}));

describe('Componente Skeleton', () => {
  test('renderiza com largura e altura especificadas', () => {
    const { container } = render(
      <Skeleton width="100px" height="50px" />
    );

    const skeleton = container.firstChild;
    expect(skeleton).toHaveStyle({
      width: '100px',
      height: '50px'
    });
  });

  test('renderiza com borda arredondada padrão quando circle é false', () => {
    const { container } = render(
      <Skeleton width="100px" height="50px" circle={false} />
    );

    const skeleton = container.firstChild;
    expect(skeleton).toHaveStyle({
      borderRadius: '4px'
    });
  });

  test('renderiza como círculo quando circle é true', () => {
    const { container } = render(
      <Skeleton width="100px" height="100px" circle />
    );

    const skeleton = container.firstChild;
    expect(skeleton).toHaveStyle({
      borderRadius: '50%'
    });
  });

  test('aplica a classe CSS correta', () => {
    const { container } = render(
      <Skeleton width="100px" height="50px" />
    );

    const skeleton = container.firstChild;
    expect(skeleton).toHaveClass('skeleton');
  });

  test('renderiza sem propriedades opcionais', () => {
    const { container } = render(<Skeleton />);
    
    const skeleton = container.firstChild;
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveStyle({
      borderRadius: '4px'
    });
  });
});