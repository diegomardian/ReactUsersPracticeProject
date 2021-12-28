import './App.css';
import {useEffect, useState} from 'react';
import UsersTable from './UsersTable';
import { Routes, Route } from "react-router-dom";
import Login from './Login';

import UserDetails from './UserDetails';
import Header from "./Header";

function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState('');

  const logout = () => {
    window.localStorage.setItem('user', '');
    setUser('');
  }

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("user");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  if (!user) {
    return <Login setUser={setUser}/>
  }

  return (
    <div className="App">
      <Header logout={logout}/>
      <div className="App" style={{justifyContent: 'center', display: 'flex'}}>
        <div style={{width: '80%'}}>
          <Routes>
            <Route path="/" element={<UsersTable users={users} setPage={setPage} page={page} setUsers={setUsers}/>} />
            <Route path="/users/:userId" element={<UserDetails/>} />
          </Routes>
        </div>
      </div>
    </div>

  );
}

export default App;
