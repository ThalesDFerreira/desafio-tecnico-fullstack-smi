import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import customRender from './utils/index';
import { act } from 'react-dom/test-utils';
import App from '../App';

describe('Testando página Home', async () => {
  it('Verifica se existe três botões na página', () => {
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

  it('Verifica se uma mensagem de bem-vindo na página', () => {
    customRender(<App />, '/home');

    const titleEl = screen.getByRole('heading', {
      name: /bem\-vindo ao sistema de planejamento de demandas/i,
    });

    expect(titleEl).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão Cadastrar Demanda é redirecionado para a página AddDemand', async () => {
    const { user, history } = customRender(<App />, '/home');

    const btnElAddDemand = screen.getByRole('button', {
      name: /cadastrar demandas/i,
    });

    await act(async () => {
      await user.click(btnElAddDemand);
      history.push('/add-demanda');
    });

    const titleElPageAddDemand = screen.getByText('Adicionar nova demanda:');

    expect(titleElPageAddDemand).toBeInTheDocument();
    expect(history.location.pathname).toBe('/add-demanda');
  });

  it('Verifica se existe um footer com o nome da empresa Latinhas LLC', async () => {
    customRender(<App />, '/home');

    const nameEl = screen.getByText('Latinhas LLC');

    expect(nameEl).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão Lista Demandas é redirecionado para a página ListDemands', async () => {
    const { user, history } = customRender(<App />, '/home');

    const btnElListDemands = screen.getByRole('button', {
      name: /listar demandas/i,
    });

    await act(async () => {
      await user.click(btnElListDemands);
      history.push('/add-demanda');
    });

    const titleElPageListDemands = screen.getByText('Lista de Demandas:');

    expect(titleElPageListDemands).toBeInTheDocument();
    expect(history.location.pathname).toBe('/lista-demandas');
  });
});
