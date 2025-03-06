import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SupplierList from './components/supplierList';
import LoginForm from './components/loginForm';
import AddSupplier from './components/addSupplier';
import UserList from './components/userList';
import AddUser from './components/addUser';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/suppliers" element={<SupplierList />} />
        <Route path="/addsupplier" element={<AddSupplier />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/adduser" element={< AddUser />} />
      </Routes>
    </Router>
  );
};

export default App;
