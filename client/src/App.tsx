import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SupplierList from './components/supplierList';
import LoginForm from './components/loginForm';
import AddSupplier from './components/addSupplier';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/suppliers" element={<SupplierList />} />
        <Route path="/addsupplier" element={<AddSupplier />} />
      </Routes>
    </Router>
  );
};

export default App;
