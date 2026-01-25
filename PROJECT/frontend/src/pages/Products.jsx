import { useEffect, useState } from "react";
import api from "../api/api";

function Products({ user }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  function addToCart(productId) {
    if (!user) {
      alert("Please login first");
      return;
    }

    api.post(`/cart/add?userId=${user.id}&productId=${productId}&quantity=1`)
      .then(() => alert("✅ Added to cart"))
      .catch(err => console.error(err));
  }

return (
  <div className="container">
    <h2>🛒 Products</h2>

    <div className="grid">
      {products.map(p => (
        <div key={p.id} className="card">
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <p><b>₹{p.price}</b></p>

          <button onClick={() => addToCart(p.id)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  </div>
);

}

export default Products;
