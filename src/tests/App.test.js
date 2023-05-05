import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import mockData from './helpers/mockData';

test('Teste a página da aplicacao', () => {
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
  });

});
