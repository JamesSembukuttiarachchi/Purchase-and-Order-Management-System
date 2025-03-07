import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SupplierList from './components/supplierList';
import LoginForm from './components/loginForm';
import AddSupplier from './components/addSupplier';
import UserList from './components/userList';
import AddUser from './components/addUser';
import Header from './components/Header'; // Import the Header component

const App = () => {
  const location = useLocation();

  // Do not display the header on the login page
  const hideHeaderOnLogin = location.pathname === '/';

  return (
    <>
      {!hideHeaderOnLogin && <Header />} {/* Render the header except on login */}
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/suppliers" element={<SupplierList />} />
        <Route path="/addsupplier" element={<AddSupplier />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/adduser" element={<AddUser />} />
      </Routes>
    </>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
