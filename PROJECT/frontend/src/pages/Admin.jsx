import { useEffect, useState } from "react";
import api from "../api/api";

function Admin() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: ""
  });

  useEffect(() => {
    loadProducts();
  }, []);

  function loadProducts() {
    api.get("/products")
      .then(res => setProducts(res.data));
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function addProduct(e) {
    e.preventDefault();

    api.post("/products", form)
      .then(() => {
        alert("✅ Product added");
        resetForm();
        loadProducts();
      });
  }

  function editProduct(product) {
    setEditingId(product.id);
    setForm(product);
  }

  function updateProduct(e) {
    e.preventDefault();

    api.put(`/products/${editingId}`, form)
      .then(() => {
        alert("✏️ Product updated");
        resetForm();
        loadProducts();
      });
  }

  function deleteProduct(id) {
    api.delete(`/products/${id}`)
      .then(() => {
        alert("🗑 Product deleted");
        loadProducts();
      });
  }

  function resetForm() {
    setEditingId(null);
    setForm({ name: "", description: "", price: "" });
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>🛠 Admin Dashboard</h2>

      <h3>{editingId ? "Edit Product" : "Add Product"}</h3>

      <form onSubmit={editingId ? updateProduct : addProduct}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <button>
          {editingId ? "Update" : "Add"}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm} style={{ marginLeft: 10 }}>
            Cancel
          </button>
        )}
      </form>

      <hr />

      <h3>All Products</h3>

      {products.map(p => (
        <div key={p.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <b>{p.name}</b> - ₹{p.price}

          <button onClick={() => editProduct(p)} style={{ marginLeft: 10 }}>
            Edit
          </button>

          <button onClick={() => deleteProduct(p.id)} style={{ marginLeft: 10 }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Admin;
