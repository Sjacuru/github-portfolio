import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableComponent from './TableComponent';

const LowStockReport = () => {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('Please log in to view low-stock report.');
          setLoading(false);
          return;
        }
        const response = await axios.get('http://localhost:8000/api/ingredients/low-stock/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIngredients(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch low-stock report: ' + (err.response?.data?.detail || 'Server error'));
        setLoading(false);
      }
    };
    fetchLowStock();
  }, []);

  const columns = [
    { key: 'name', label: 'Ingredient Name' },
    { key: 'stock_quantity', label: 'Stock Quantity' },
    { key: 'reorder_point', label: 'Reorder Point' },
  ];

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f9', borderRadius: '8px' }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Manager Low-Stock Report (BMS-20)</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : ingredients.length === 0 ? (
        <p>No low-stock ingredients found.</p>
      ) : (
        <TableComponent data={ingredients} columns={columns} />
      )}
    </div>
  );
};

export default LowStockReport;