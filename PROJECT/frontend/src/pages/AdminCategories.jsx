import { useEffect, useState } from "react";
import api from "../api/api";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  function loadCategories() {
    api.get("/categories")
      .then(res => setCategories(res.data));
  }

  function addCategory(e) {
    e.preventDefault();

    api.post("/categories", { name })
      .then(() => {
        alert("✅ Category added");
        setName("");
        loadCategories();
      });
  }

  return (
    <div className="container">
      <h2>📂 Manage Categories</h2>

      <form onSubmit={addCategory}>
        <input
          placeholder="Category name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <button>Add</button>
      </form>

      <hr />

      {categories.map(c => (
        <div key={c.id} className="card">
          {c.name}
        </div>
      ))}
    </div>
  );
}

export default AdminCategories;
