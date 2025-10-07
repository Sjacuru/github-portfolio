import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IngredientList = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const token = localStorage.getItem('access_token');  // Adjust based on your JWT storage
        const response = await axios.get('http://localhost:8000/api/ingredients/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        });
        setIngredients(response.data);
      } catch (err) {
        setError('Failed to load ingredients. Ensure you are logged in as Staff.');
      } finally {
        setLoading(false);
      }
    };
    fetchIngredients();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Ingredient Inventory</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Stock</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Unit</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Reorder Point</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map(ing => (
            <tr key={ing.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{ing.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{ing.stock_quantity}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{ing.unit}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{ing.reorder_point}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IngredientList;