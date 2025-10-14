import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LowStockList = () => {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const token = localStorage.getItem('access_token'); 
        if (!token) {
          setError('Please log in to view low-stock ingredients.');
          setLoading(false);
          return;
        }
        const response = await axios.get('http://localhost:8000/api/ingredients/low-stock/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('API Response:', response.data); // Debug
        setIngredients(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch Error:', err.response || err.message); // Debug
        setError('Failed to fetch low-stock ingredients. Check your connection or login.');
        setLoading(false);
      }
    };
    fetchLowStock();
  }, []);

  return (
    <div>
      <h2>Low-Stock Ingredients (BMS-13)</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : ingredients.length === 0 ? (
        <p>No low-stock ingredients found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Stock Quantity</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Reorder Point</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient) => (
              <tr key={ingredient.name}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{ingredient.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{ingredient.stock_quantity}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{ingredient.reorder_point}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LowStockList;