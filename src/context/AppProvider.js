import React, { useEffect, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

const fields = ['population',
  'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
function AppProvider({ children }) {
  const [apiData, setData] = useState([]);
  const [inputText, setInputText] = useState('');
  const [columnFilter, setColumnFilter] = useState(fields);
  // const [comparisonFilter, setComparisonFilter] = useState('maior que');
  // const [number, setNumber] = useState(0);
  const [filters, setFilters] = useState([]);
  const [objFilter, setObjFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  useEffect(() => {
    const requestApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const result = await response.json();
      setData(result.results);
    };
    requestApi();
  }, []);

  const saveFiltersBigger = useCallback(() => {
    const { column, comparison, value } = objFilter;
    const filtered = apiData.filter((element) => (
      Number(element[column]) > Number(value)
    ));
    setData(filtered);
    setFilters([...filters,
      { column,
        comparison,
        value,
      }]);
    setColumnFilter(columnFilter.filter((filt) => filt !== objFilter.column));
    setObjFilter(objFilter.column[0]);
  }, [objFilter, columnFilter, filters, apiData]);

  const saveFiltersLower = useCallback(() => {
    const { column, comparison, value } = objFilter;
    const filtered = apiData.filter((element) => (
      Number(element[column]) < Number(value)
    ));
    setData(filtered);
    setFilters([...filters,
      { column,
        comparison,
        value,
      }]);
    setColumnFilter(columnFilter.filter((filt) => filt !== objFilter.column));
    setObjFilter(objFilter.column[0]);
  }, [objFilter, columnFilter, filters, apiData]);

  const saveFiltersEqual = useCallback(() => {
    const { column, comparison, value } = objFilter;
    const filtered = apiData.filter((element) => (
      Number(element[column]) === Number(value)
    ));
    setData(filtered);
    setFilters([...filters,
      { column,
        comparison,
        value,
      }]);
    setColumnFilter(columnFilter.filter((filt) => filt !== objFilter.column));
    setObjFilter(objFilter.column[0]);
  }, [objFilter, columnFilter, filters, apiData]);

  const handleFilter = useCallback(() => {
    switch (objFilter.comparison) {
    case 'maior que':
      return saveFiltersBigger();
    case 'menor que':
      return saveFiltersLower();
    case 'igual a':
      return saveFiltersEqual();
    default:
      return apiData;
    }
  }, [apiData, objFilter, saveFiltersBigger, saveFiltersEqual, saveFiltersLower]);

  const context = useMemo(() => ({
    apiData,
    inputText,
    setInputText,
    columnFilter,
    setColumnFilter,
    // comparisonFilter,
    // setComparisonFilter,
    // number,
    // setNumber,
    filters,
    handleFilter,
    objFilter,
    setObjFilter,
  }), [apiData, inputText, setInputText, filters, handleFilter, objFilter, setObjFilter,
    columnFilter]);

  return (
    <AppContext.Provider value={ context }>
      {children}
    </AppContext.Provider>
  );
}
AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppProvider;
