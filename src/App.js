import './App.css';
import Dashboard from './app/screens/Dashboard';
import Login from './app/screens/Login';

import { useAtom } from 'jotai'


import { loggedInStatus } from './app/utils/store';

function App() {

  const [loggedIn] = useAtom(loggedInStatus)

  return (
    <div className="App">
      {
        loggedIn
        ?
        <Dashboard />
        :
        <Login />
      }
    </div>
  );
}

export default App;
