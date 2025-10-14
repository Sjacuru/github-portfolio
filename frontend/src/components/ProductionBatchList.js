import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableComponent from './TableComponent';

const ProductionBatchList = () => {
  const [batches, setBatches] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // Fetch production batches on component mount
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('Please log in to view production batches.');
          setLoading(false);
          return;
        }
        const response = await axios.get('http://localhost:8000/api/production-batches/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBatches(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch batches: ' + (err.response?.data?.detail || 'Server error'));
        setLoading(false);
      }
    };
    fetchBatches();
  }, []);
  // Define table columns
  const columns = [
    { key: 'product_name', label: 'Product Name' },
    { key: 'quantity_produced', label: 'Quantity Produced' },
    { key: 'production_date', label: 'Production Date' },
    { key: 'status', label: 'Status' },
  ];
  // Render production batches list
  return (
    <div>
      <h2>Production Batches</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : batches.length === 0 ? (
        <p>No production batches found.</p>
      ) : (
        <TableComponent data={batches} columns={columns} />
      )}
    </div>
  );
};

export default ProductionBatchList;