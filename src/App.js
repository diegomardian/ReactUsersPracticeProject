import './App.css';
import {useState} from 'react';
import UsersTable from './UsersTable';
import { Routes, Route } from "react-router-dom";

import UserDetails from './UserDetails';
function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  return (
    <div className="App" style={{justifyContent: 'center', display: 'flex'}}>
        <div style={{width: '80%'}}>
            <Routes>
                <Route path="/" element={<UsersTable users={users} setPage={setPage} page={page} setUsers={setUsers}/>} />
                <Route path="/users/:userId" element={<UserDetails/>} />
            </Routes>
        </div>
    </div>
  );
}

export default App;
