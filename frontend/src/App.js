
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import IngredientList from './components/IngredientList';
import LowStockList from './components/LowStockList';
import LowStockReport from './components/LowStockReport';
import ProductionBatchList from './components/ProductionBatchList';
import ProductionBatchHistory from './components/ProductionBatchHistory';
import ProductionBatchForm from './components/ProductionBatchForm';
import Login from './components/Login';

function App() {
  const isAuthenticated = () => !!localStorage.getItem('access_token');
  // Define application routes
  return (
    <Router>
      <div>
        {isAuthenticated() && (
          <nav>
            <Link to="/ingredients">Ingredients</Link> | <Link to="/low-stock">Low Stock</Link> |{' '}
            <Link to="/production-batches">Production Batches</Link> |{' '}
            <Link to="/production-batches/new">New Batch</Link> |{' '}
            <Link to="/production-batches/history">Batch History</Link> |{' '}
            <Link to="/manager/low-stock-report">Manager Report</Link>
          </nav>
        )}
      <Routes>
        <Route
          path="/ingredients"
          element={isAuthenticated() ? <IngredientList /> : <Navigate to="/login" />}
        />
        <Route
          path="/low-stock"
          element={isAuthenticated() ? <LowStockList /> : <Navigate to="/login" />}
        />
        <Route
          path="/production-batches"
          element={isAuthenticated() ? <ProductionBatchList /> : <Navigate to="/login" />}
        />
        <Route
          path="/production-batches/new"
          element={isAuthenticated() ? <ProductionBatchForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/production-batches/history"
          element={isAuthenticated() ? <ProductionBatchHistory /> : <Navigate to="/login" />}
        />
        <Route
          path="/manager/low-stock-report"
          element={isAuthenticated() ? <LowStockReport /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;