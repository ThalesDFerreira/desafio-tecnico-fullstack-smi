
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';

describe('Header', async () => {
  it('should render the header', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const buttonHome = screen.getByRole('button', {
      name: /sistema de planejamento de demandas/i,
    });

    expect(buttonHome).toBeInTheDocument();
  });
});
