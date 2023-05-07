import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import AppProvider from '../context/AppProvider';
import mockData from './helpers/mockData';

describe('Teste a página da aplicacao', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(
        mockData,
      ),
    });
    render(
      <AppProvider>
        <App />
      </AppProvider>,
    );
  });
  it('Verifica se inputs e table estão presentes', ()=> {
    const textInput = screen.getByTestId('name-filter');
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');

    const tableHeadName = screen.getByRole('columnheader', {
      name: /name/i,
    });
    const tableHeadRotationPeriod = screen.getByRole('columnheader', {
      name: /rotation period/i,
    });
    const tableHeadOrbitalPeriod = screen.getByRole('columnheader', {
      name: /orbital period/i,
    });
    const tableHeadDiameter = screen.getByRole('columnheader', {
      name: /diameter/i,
    });
    const tableHeadClimate = screen.getByRole('columnheader', {
      name: /climate/i,
    });
    const tableHeadGravity = screen.getByRole('columnheader', {
      name: /gravity/i,
    })
    const tableHeadTerrain = screen.getByRole('columnheader', {
      name: /terrain/i,
    });
    const tableHeadSurfaceWater = screen.getByRole('columnheader', {
      name: /surface water/i,
    });
    const tableHeadPopulation = screen.getByRole('columnheader', {
      name: /population/i,
    });
    const tableHeadFilms = screen.getByRole('columnheader', {
      name: /films/i,
    });
    const tableHeadCreated = screen.getByRole('columnheader', {
      name: /created/i,
    });
    const tableHeadEdited = screen.getByRole('columnheader', {
      name: /edited/i,
    });
    const tableHeadUrl = screen.getByRole('columnheader', {
      name: /url/i,
    });

    const orderSort = screen.getByTestId('column-sort');
    const asc = screen.getByTestId('column-sort-input-asc');
    const desc = screen.getByTestId('column-sort-input-desc');
    const sortBtn = screen.getByTestId('column-sort-button');

    expect(textInput).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(filterBtn).toBeInTheDocument();
    expect(tableHeadName).toBeInTheDocument();
    expect(tableHeadRotationPeriod).toBeInTheDocument();
    expect(tableHeadOrbitalPeriod).toBeInTheDocument();
    expect(tableHeadDiameter).toBeInTheDocument();
    expect(tableHeadClimate).toBeInTheDocument();
    expect(tableHeadGravity).toBeInTheDocument();
    expect(tableHeadTerrain).toBeInTheDocument();
    expect(tableHeadSurfaceWater).toBeInTheDocument();
    expect(tableHeadSurfaceWater).toBeInTheDocument();
    expect(tableHeadPopulation).toBeInTheDocument();
    expect(tableHeadFilms).toBeInTheDocument();
    expect(tableHeadCreated).toBeInTheDocument();
    expect(tableHeadEdited).toBeInTheDocument();
    expect(tableHeadUrl).toBeInTheDocument();
    expect(orderSort).toBeInTheDocument();
    expect(asc).toBeInTheDocument();
    expect(desc).toBeInTheDocument();
    expect(sortBtn).toBeInTheDocument();
    expect(columnFilter.children).toHaveLength(5);
    expect(comparisonFilter.children).toHaveLength(3);
    expect(orderSort.children).toHaveLength(5);
  });
  it('testa inputs de filtro igual a e textInput', async () => {
    const textInput = screen.getByTestId('name-filter');
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');
    
    await waitFor(() => {
      const table = screen.getByRole('table');
      const cell = table.querySelectorAll('tr')
      expect(cell).toHaveLength(11);
    });

    userEvent.type(textInput, 'too')

    await waitFor(() => {
      const table = screen.getByRole('table');
      const cell = table.querySelectorAll('tr')
      expect(cell).toHaveLength(2);
      expect(screen.getByRole('cell', {
        name: /tatooine/i,
      })).toBeInTheDocument();
    });

    userEvent.clear(textInput);

    userEvent.selectOptions(columnFilter, 'rotation_period');
    userEvent.selectOptions(comparisonFilter, 'igual a')
    userEvent.type(valueFilter, 27);
    userEvent.click(filterBtn);

    await waitFor(() => {
      const showFilter = screen.getByTestId('filter');
  
      expect(showFilter).toBeInTheDocument();
    });

    await waitFor(() => {
      const columnFilter = screen.getByTestId('column-filter');
      expect(columnFilter.children).toHaveLength(4);
    });
  });
  it('testa inputs de filtro maior que', async () => {
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');
    
    await waitFor(() => {
      const table = screen.getByRole('table');
      const cell = table.querySelectorAll('tr')
      expect(cell).toHaveLength(11);
    });

    userEvent.selectOptions(columnFilter, 'rotation_period');
    userEvent.selectOptions(comparisonFilter, 'maior que')
    userEvent.type(valueFilter, 26);
    userEvent.click(filterBtn);

    await waitFor(() => {
      const showFilter = screen.getByTestId('filter');
  
      expect(showFilter).toBeInTheDocument();
    });
  });
  it('testa inputs de filtro menor que', async () => {
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');
    
    await waitFor(() => {
      const table = screen.getByRole('table');
      const cell = table.querySelectorAll('tr')
      expect(cell).toHaveLength(11);
    });

    userEvent.selectOptions(columnFilter, 'rotation_period');
    userEvent.selectOptions(comparisonFilter, 'menor que')
    userEvent.type(valueFilter, 13);
    userEvent.click(filterBtn);

    await waitFor(() => {
      const showFilter = screen.getByTestId('filter');
  
      expect(showFilter).toBeInTheDocument();
    });
  });
  it('testa os botao de excluir apenas um filtro', async () => {
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');
    
    await waitFor(() => {
      const table = screen.getByRole('table');
      const cell = table.querySelectorAll('tr')
      expect(cell).toHaveLength(11);
    });

    userEvent.selectOptions(columnFilter, 'rotation_period');
    userEvent.selectOptions(comparisonFilter, 'menor que')
    userEvent.type(valueFilter, 13);
    userEvent.click(filterBtn);

    await waitFor(() => {
      const showFilter = screen.getByTestId('filter');
      const removeOneFilter = screen.getByRole('button', {
        name: /x/i,
      });
      const removeAllFilters = screen.getByTestId('button-remove-filters');
      expect(removeOneFilter).toBeInTheDocument();
      expect(removeAllFilters).toBeInTheDocument();
      userEvent.click(removeOneFilter);
      expect(showFilter).not.toBeInTheDocument();
    });
  });
});