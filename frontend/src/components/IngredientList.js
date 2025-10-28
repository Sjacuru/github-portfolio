
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// IngredientList component to display and manage ingredients
const IngredientList = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', stock_quantity: '', unit: '', reorder_point: '' });
  const [editingId, setEditingId] = useState(null);
// Fetch ingredients from backend
const fetchIngredients = async () => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('Please log in to view ingredients.');
    const response = await axios.get('http://localhost:8000/api/ingredients/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setIngredients(response.data);
    setLoading(false);
  } catch (err) {
    setError(err.message || 'Failed to load ingredients. Ensure you are logged in as Staff.');
    setLoading(false);
  }
};
  // Fetch ingredients on component mount
  useEffect(() => {
    fetchIngredients();
  }, []);
  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Handle form submission for adding/editing ingredients
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      if (!token) throw new Error('Please log in to perform this action.');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (editingId) {
        // Update existing ingredient
        await axios.put(`http://localhost:8000/api/ingredients/${editingId}/`, formData, config);
      } else {
        // Create new ingredient
        await axios.post('http://localhost:8000/api/ingredients/', formData, config);
      }
      setFormData({ name: '', stock_quantity: '', unit: '', reorder_point: '' });
      setEditingId(null);
      fetchIngredients(); // Refresh list
    } catch (err) {
      setError(err.message || 'Failed to save ingredient.');
    }
  };
  // Handle edit button click
  const handleEdit = (ingredient) => {
    setFormData({
      name: ingredient.name,
      stock_quantity: ingredient.stock_quantity,
      unit: ingredient.unit,
      reorder_point: ingredient.reorder_point
    });
    setEditingId(ingredient.id);
  };
  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) throw new Error('Please log in to perform this action.');
      await axios.delete(`http://localhost:8000/api/ingredients/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchIngredients(); // Refresh list
    } catch (err) {
      setError(err.message || 'Failed to delete ingredient.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Ingredient Inventory</h2>
      
      {/* Form for Adding/Editing Ingredients */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-100 rounded shadow">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ingredient Name"
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="stock_quantity"
            value={formData.stock_quantity}
            onChange={handleInputChange}
            placeholder="Stock Quantity"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="unit"
            value={formData.unit}
            onChange={handleInputChange}
            placeholder="Unit (e.g., kg)"
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="reorder_point"
            value={formData.reorder_point}
            onChange={handleInputChange}
            placeholder="Reorder Point"
            className="p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {editingId ? 'Update Ingredient' : 'Add Ingredient'}
        </button>
      </form>

      {/* Ingredient Table */}
      <table className="w-full border-collapse shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Unit</th>
            <th className="border p-2">Reorder Point</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map(ing => (
            <tr key={ing.id} className="hover:bg-gray-50">
              <td className="border p-2">{ing.name}</td>
              <td className="border p-2">{ing.stock_quantity}</td>
              <td className="border p-2">{ing.unit}</td>
              <td className="border p-2">{ing.reorder_point}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(ing)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ing.id)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IngredientList;
