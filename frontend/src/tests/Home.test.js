import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import customRender from './utils/index';
import Home from '../pages/Home';
import App from '../App';

describe('Testando página Home', async () => {
  it('Verifica se existe três botões na página"', () => {
    customRender(<App />, '/home');

    const btnElHeader = screen.getByRole('button', {
      name: /sistema de planejamento de demandas/i,
    });

    const btnElAddDemand = screen.getByRole('button', {
      name: /cadastrar demandas/i,
    });

    const btnElListDemands = screen.getByRole('button', {
      name: /listar demandas/i,
    });

    const buttonsEl = screen.getAllByRole('button');

    expect(buttonsEl).toHaveLength(3);
    expect(btnElHeader).toBeInTheDocument();
    expect(btnElAddDemand).toBeInTheDocument();
    expect(btnElListDemands).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão Cadastrar Demanda é redirecionado para a página AddDemand', async () => {
    const { user, history } = customRender(<App />, '/home');

    const btnElAddDemand = screen.getByRole('button', {
      name: /cadastrar demandas/i,
    });

    await user.click(btnElAddDemand);

    history.push('/add-demanda');

    const titleElPageAddDemand = screen.getByText('Adicionar nova demanda:');

    expect(titleElPageAddDemand).toBeInTheDocument();
    expect(history.location.pathname).toBe('/add-demanda');
  });

  it('Verifica se ao clicar no botão Lista Demandas é redirecionado para a página ListDemands', async () => {
    const { user, history } = customRender(<App />, '/home');

    const btnElListDemands = screen.getByRole('button', {
      name: /listar demandas/i,
    });

    await user.click(btnElListDemands);

    history.push('/lista-demandas');

    const titleElPageListDemands = screen.getByText('Lista de Demandas:');

    expect(titleElPageListDemands).toBeInTheDocument();
    expect(history.location.pathname).toBe('/lista-demandas');
  });

});
