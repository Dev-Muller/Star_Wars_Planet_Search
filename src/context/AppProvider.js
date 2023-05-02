import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

const fields = 'population';
function AppProvider({ children }) {
  const [apiData, setData] = useState([]);
  const [columnFilter, setColumnFilter] = useState(fields);

  useEffect(() => {
    const requestApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const result = await response.json();
      setData(result.results);
      // setInitialStateApi(result);
    };
    requestApi();
  }, []);

  const context = useMemo(() => ({
    apiData,
    columnFilter,
    setColumnFilter,
  }), [apiData, columnFilter, setColumnFilter]);

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
