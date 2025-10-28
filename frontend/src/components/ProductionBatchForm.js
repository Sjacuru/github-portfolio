import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductionBatchForm = () => {
  const [formData, setFormData] = useState({ product_name: '', quantity_produced: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      await axios.post('http://localhost:8000/api/production-batches/', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/production-batches');
    } catch (err) {
      setError('Failed to create batch: ' + (err.response?.data?.detail || 'Server error'));
    }
  };
  // Render production batch creation form
  return (
    <div>
      <h2>Create Production Batch</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={formData.product_name}
            onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Quantity Produced:</label>
          <input
            type="number"
            value={formData.quantity_produced}
            onChange={(e) => setFormData({ ...formData, quantity_produced: e.target.value })}
            required
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default ProductionBatchForm;