import { useEffect, useState } from "react";
import api from "../api/api";

function AdminStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/admin/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>📊 Admin Dashboard</h2>

      <div className="grid">
        <div className="card">
          <h3>Total Orders</h3>
          <h2>{stats.totalOrders}</h2>
        </div>

        <div className="card">
          <h3>Total Products</h3>
          <h2>{stats.totalProducts}</h2>
        </div>

        <div className="card">
          <h3>Total Users</h3>
          <h2>{stats.totalUsers}</h2>
        </div>

        <div className="card">
          <h3>Total Revenue</h3>
          <h2>₹{stats.totalRevenue}</h2>
        </div>
      </div>
    </div>
  );
}

export default AdminStats;
