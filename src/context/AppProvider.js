import React, { useEffect, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

const fields = ['population',
  'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
function AppProvider({ children }) {
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState('');
  const [columnFilter, setColumnFilter] = useState(fields);
  const [selectField, setSelectField] = useState(fields[0]);
  const [comparisonField, setComparisonField] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [initialStateApi, setInitialStateApi] = useState([]);
  const [filters, setFilters] = useState([]);

  const requestApi = async () => {
    const response = await fetch('https://swapi.dev/api/planets');
    const result = await response.json();
    setData(result.results);
    setInitialStateApi(result.results);
  };
  useEffect(() => {
    requestApi();
  }, []);

  const saveFiltersBigger = useCallback(() => {
    const filtered = data.filter((element) => (
      Number(element[selectField]) > Number(number)
    ));
    setData(filtered);
    setColumnFilter(columnFilter.filter((filt) => filt !== selectField));
    setSelectField(columnFilter[1]);
    setFilters([...filters, { selectField, comparisonField, number }]);
  }, [columnFilter, filters, data, selectField, comparisonField, number]);

  const saveFiltersLower = useCallback(() => {
    const filtered = data.filter((element) => (
      Number(element[selectField]) < Number(number)
    ));
    setData(filtered);
    setColumnFilter(columnFilter.filter((filt) => filt !== selectField));
    setSelectField(columnFilter[1]);
    setFilters([...filters, { selectField, comparisonField, number }]);
  }, [columnFilter, filters, data, selectField, comparisonField, number]);

  const saveFiltersEqual = useCallback(() => {
    const filtered = data.filter((element) => (
      Number(element[selectField]) === Number(number)
    ));
    setData(filtered);
    setColumnFilter(columnFilter.filter((filt) => filt !== selectField));
    setSelectField(columnFilter[1]);
    setFilters([...filters, { selectField, comparisonField, number }]);
  }, [columnFilter, filters, data, selectField, comparisonField, number]);

  const handleFilter = useCallback(() => {
    switch (comparisonField) {
    case 'maior que':
      return saveFiltersBigger();
    case 'menor que':
      return saveFiltersLower();
    case 'igual a':
      return saveFiltersEqual();
    default:
      return data;
    }
  }, [data, saveFiltersBigger, saveFiltersLower, saveFiltersEqual, comparisonField]);

  const handleDeleteOneFilter = useCallback((item) => {
    let newData = [...initialStateApi];
    const diferentFilter = filters.filter((element) => element.selectField !== item);
    diferentFilter.forEach((element) => {
      newData = newData.filter((planet) => {
        if (element.comparisonField === 'maior que') {
          return Number(planet[element.selectField]) > Number(element.number);
        }
        if (element.comparisonField === 'menor que') {
          return Number(planet[element.selectField]) < Number(element.number);
        }
        if (element.comparisonField === 'igual a') {
          return Number(planet[element.selectField]) === Number(element.number);
        }
        return true;
      });
    });
    setData([...newData]);
    setFilters([...diferentFilter]);
    setColumnFilter([...columnFilter, item]);
  }, [filters, initialStateApi, columnFilter]);

  const handleDeleteAllFilters = useCallback(() => {
    setData([]);
    setFilters([]);
    setColumnFilter(fields);
    setSelectField(fields[0]);
    setComparisonField('maior que');
    setNumber(0);
    requestApi();
  }, []);

  const context = useMemo(() => ({
    data,
    inputText,
    setInputText,
    columnFilter,
    setColumnFilter,
    selectField,
    setSelectField,
    comparisonField,
    setComparisonField,
    number,
    setNumber,
    filters,
    handleFilter,
    initialStateApi,
    setInitialStateApi,
    handleDeleteAllFilters,
    handleDeleteOneFilter,
  }), [data, inputText, filters, handleFilter, selectField, comparisonField,
    number, columnFilter, initialStateApi,
    handleDeleteAllFilters, handleDeleteOneFilter]);

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
