import React, { useEffect, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

const fields = 'population';
function AppProvider({ children }) {
  const [apiData, setData] = useState([]);
  const [inputText, setInputText] = useState('');
  const [columnFilter, setColumnFilter] = useState(fields);
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const requestApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const result = await response.json();
      setData(result.results);
    };
    requestApi();
  }, []);

  const saveFiltersBigger = useCallback(() => {
    const filtered = apiData.filter((element) => (
      Number(element[columnFilter]) > Number(number)
    ));
    setData(filtered);
    setFilters([...filters,
      { columnFilter, comparisonFilter, number }]);
  }, [columnFilter, comparisonFilter, number, filters, apiData]);

  const saveFiltersLower = useCallback(() => {
    const filtered = apiData.filter((element) => (
      Number(element[columnFilter]) < Number(number)
    ));
    setData(filtered);
    setFilters([...filters,
      { columnFilter, comparisonFilter, number }]);
  }, [columnFilter, comparisonFilter, number, filters, apiData]);

  const saveFiltersEqual = useCallback(() => {
    const filtered = apiData.filter((element) => (
      Number(element[columnFilter]) === Number(number)
    ));
    setData(filtered);
    setFilters([...filters,
      { columnFilter, comparisonFilter, number }]);
  }, [columnFilter, comparisonFilter, number, filters, apiData]);

  const handleFilter = useCallback(() => {
    switch (comparisonFilter) {
    case 'maior que':
      return saveFiltersBigger();
    case 'menor que':
      return saveFiltersLower();
    case 'igual a':
      return saveFiltersEqual();
    default:
      return apiData;
    }
  }, [apiData, comparisonFilter, saveFiltersBigger, saveFiltersEqual, saveFiltersLower]);

  const context = useMemo(() => ({
    apiData,
    inputText,
    setInputText,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    number,
    setNumber,
    filters,
    handleFilter,
  }), [apiData, inputText, setInputText, columnFilter, setColumnFilter, comparisonFilter,
    setComparisonFilter,
    number,
    setNumber, filters, handleFilter]);

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
