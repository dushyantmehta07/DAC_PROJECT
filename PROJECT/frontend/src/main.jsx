import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AdminOrders from "./pages/AdminOrders";
import AdminStats from "./pages/AdminStats";
import AdminCategories from "./pages/AdminCategories";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <nav style={{ padding: 12, borderBottom: "1px solid #ccc" }}>
        <Link to="/" style={{ marginRight: 12 }}>🛍 Products</Link>
        <Link to="/cart" style={{ marginRight: 12 }}>🛒 Cart</Link>
        <Link to="/register" style={{ marginRight: 12 }}>📝 Register</Link>
        <Link to="/login" style={{ marginRight: 12 }}>🔐 Login</Link>

        {/* ✅ Admin links */}
        {user?.role === "ADMIN" && (
          <>
            <Link to="/admin" style={{ marginRight: 12 }}>🛠 Products</Link>
            <Link to="/admin-categories" style={{ marginRight: 12 }}>📂 Categories</Link>
            <Link to="/admin-orders" style={{ marginRight: 12 }}>📦 Orders</Link>
            <Link to="/admin-stats">📊 Stats</Link>
          </>
        )}

        {/* Logged user */}
        {user && (
          <span style={{ marginLeft: 20 }}>
            👤 {user.name} ({user.role})
          </span>
        )}
      </nav>

      {/* ===== ROUTES ===== */}
      <Routes>
        <Route path="/" element={<Products user={user} />} />
        <Route path="/cart" element={<Cart user={user} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />

        {/* ✅ Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            user?.role === "ADMIN"
              ? <Admin />
              : <h3 style={{ padding: 20 }}>❌ Access Denied</h3>
          }
        />

        <Route
          path="/admin-categories"
          element={
            user?.role === "ADMIN"
              ? <AdminCategories />
              : <h3 style={{ padding: 20 }}>❌ Access Denied</h3>
          }
        />

        <Route
          path="/admin-orders"
          element={
            user?.role === "ADMIN"
              ? <AdminOrders />
              : <h3 style={{ padding: 20 }}>❌ Access Denied</h3>
          }
        />

        <Route
          path="/admin-stats"
          element={
            user?.role === "ADMIN"
              ? <AdminStats />
              : <h3 style={{ padding: 20 }}>❌ Access Denied</h3>
          }
        />
      </Routes>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
