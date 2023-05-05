import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function Table() {
  const { data, inputText, setInputText, columnFilter,
    handleFilter, filters, handleDeleteAllFilters, handleDeleteOneFilter,
    selectField, setSelectField, comparisonField, setComparisonField,
    number, setNumber, columnSort, setColumnSort,
    setSort, handleSortBtn } = useContext(AppContext);

  return (
    <section>
      <input
        type="text"
        name="inputText"
        id="inputText"
        data-testid="name-filter"
        value={ inputText }
        onChange={ ({ target }) => setInputText(target.value) }
      />
      <label htmlFor="">
        Coluna:
        <select
          name="column"
          id="columnFilter"
          data-testid="column-filter"
          value={ selectField }
          onChange={ ({ target }) => setSelectField(target.value) }
        >
          { columnFilter.map((item, index) => (
            <option key={ index } value={ item }>{ item }</option>
          ))}
        </select>
      </label>
      <label htmlFor="comparisonFilter">
        Operador:
        <select
          name="comparison"
          id="comparisonFilter"
          value={ comparisonField }
          data-testid="comparison-filter"
          onChange={ ({ target }) => setComparisonField(target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="">
        <input
          type="number"
          name="value"
          id="valueFilter"
          value={ number }
          data-testid="value-filter"
          min="0"
          onChange={ ({ target }) => setNumber(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleFilter }
      >
        Filtrar
      </button>
      {
        filters.length > 0 && (
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ handleDeleteAllFilters }
          >
            Remover todas filtragens
          </button>
        )
      }
      <label htmlFor="">
        Ordenar:
        <select
          name="columnS"
          id="columnSort"
          data-testid="column-sort"
          value={ columnSort }
          onChange={ ({ target }) => setColumnSort(target.value) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="">
        Ascendente
        <input
          type="radio"
          id="sortAsc"
          name="sort"
          value="ASC"
          data-testid="column-sort-input-asc"
          onChange={ ({ target }) => setSort(target.value) }
        />

      </label>
      <label htmlFor="">
        Descendente
        <input
          type="radio"
          name="sort"
          id="sortDesc"
          value="DESC"
          data-testid="column-sort-input-desc"
          onChange={ ({ target }) => setSort(target.value) }
        />

      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleSortBtn }
      >
        ORDENAR
      </button>

      { filters.map((item, index) => (
        <span
          key={ index }
          data-testid="filter"
        >
          {`${item.selectField} ${item.comparisonField} ${item.number}`}
          <button
            type="button"
            onClick={ () => handleDeleteOneFilter(item.selectField) }
          >
            x
          </button>
        </span>
      )) }
      <table className="table">
        <thead className="head">
          <tr className="tr">
            <th className="th">Name</th>

            <th className="th">Rotation Period</th>

            <th className="th">Orbital Period</th>

            <th className="th">Diameter</th>

            <th className="th">Climate</th>

            <th className="th">Gravity</th>

            <th className="th">Terrain</th>

            <th className="th">Surface Water</th>

            <th className="th">Population</th>

            <th className="th">Films</th>

            <th className="th">Created</th>

            <th className="th">Edited</th>

            <th className="th">Url</th>
          </tr>
        </thead>
        <tbody>
          { data.filter((dataElements) => (dataElements.name.includes(inputText)))
            .map((dataElements) => (
              <tr
                className="rs"
                key={ dataElements.name }
              >
                <td data-testid="planet-name">{ dataElements.name }</td>
                <td>{ dataElements.rotation_period }</td>
                <td>{ dataElements.orbital_period }</td>
                <td>{ dataElements.diameter }</td>
                <td>{ dataElements.climate }</td>
                <td>{ dataElements.gravity }</td>
                <td>{ dataElements.terrain }</td>
                <td>{ dataElements.surface_water }</td>
                <td>{ dataElements.population }</td>
                <td>{ dataElements.residents }</td>
                <td>{ dataElements.films }</td>
                <td>{ dataElements.created }</td>
                <td>{ dataElements.edited }</td>
                <td>{ dataElements.url }</td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}
