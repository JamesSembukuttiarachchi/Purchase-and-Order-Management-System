import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SupplierList from './components/supplierList';
import LoginForm from './components/loginForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/suppliers" element={<SupplierList />} />
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
};

export default App;
