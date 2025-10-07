// import { Route, Routes } from 'react-router-dom';
// import IngredientList from './components/IngredientList';

// function App() {
//   return (
//     <Routes>
//       <Route path="/ingredients" element={<IngredientList />} />
//       {/* Other routes */}
//     </Routes>
//   );
// }


import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import IngredientList from './components/IngredientList';
import Login from './components/Login';

function App() {
  const isAuthenticated = () => !!localStorage.getItem('access_token');

  return (
    <Router>
      <Routes>
        <Route
          path="/ingredients"
          element={isAuthenticated() ? <IngredientList /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;