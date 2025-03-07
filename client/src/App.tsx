/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SupplierList from './components/supplierList';
import LoginForm from './components/loginForm';
import AddSupplier from './components/addSupplier';
import UserList from './components/userList';
import AddUser from './components/addUser';
import Header from './components/Header';
import Footer from './components/Footer';
import ResetPasswordForm from './components/ResetPasswordForm';

const App = () => {
  const location = useLocation();

  // Do not display the header on the login page
  const hideHeaderOnLogin = location.pathname === '/';

  return (
    <>
      {!hideHeaderOnLogin && <Header />}
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/suppliers" element={<SupplierList />} />
        <Route path="/addsupplier" element={<AddSupplier />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/resetpassword" element={<ResetPasswordForm setShowResetForm={function (value: React.SetStateAction<boolean>): void {
          throw new Error('Function not implemented.');
        }} />} />
      </Routes>
      {!hideHeaderOnLogin && <Footer />}

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
