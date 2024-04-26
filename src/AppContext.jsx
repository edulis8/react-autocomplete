import { createContext, useState, useMemo } from 'react';

const AppContext = createContext();

function AppProvider(props) {
  const [users, setUsers] = useState([]);

  const value = useMemo(() => ({ users, setUsers }), [users]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

export { AppContext, AppProvider };
