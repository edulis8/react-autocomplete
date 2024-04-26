import { useState, useContext } from 'react';
import './App.css';
import Autocomplete from './Autocomplete';
import { AppContext } from './AppContext';

function App() {
  const { users, setUsers } = useContext(AppContext);
  return (
    <div className="App">
      <Autocomplete />
      <code>
        shared context:
        <pre>{JSON.stringify(users, null, 2)}</pre>
      </code>
    </div>
  );
}

export default App;
