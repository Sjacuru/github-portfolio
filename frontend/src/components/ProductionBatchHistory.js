import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableComponent from './TableComponent';

const ProductionBatchHistory = () => {
  const [batches, setBatches] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('Please log in to view batch history.');
          setLoading(false);
          return;
        }
        const params = {};
        if (search) params.search = search;
        if (status) params.status = status;
        params.ordering = '-production_date';
        const response = await axios.get('http://localhost:8000/api/production-batches/', {
          headers: { Authorization: `Bearer ${token}` },
          params,
        });
        setBatches(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch batches: ' + (err.response?.data?.detail || 'Server error'));
        setLoading(false);
      }
    };
    fetchBatches();
  }, [search, status]);

  const columns = [
    { key: 'product_name', label: 'Product Name' },
    { key: 'quantity_produced', label: 'Quantity Produced' },
    { key: 'production_date', label: 'Production Date' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <div>
      <h2>Production Batch History (BMS-15)</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Search Product Name:</label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter product name"
        />
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
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

export default ProductionBatchHistory;