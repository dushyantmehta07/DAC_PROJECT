import { useEffect, useState } from "react";
import api from "../api/api";

function Cart({ user }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (user) loadCart();
  }, [user]);

  function loadCart() {
    api.get(`/cart/${user.id}`)
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }

  function placeOrder() {
    api.post(`/orders/place/${user.id}`)
      .then(() => {
        alert("✅ Order placed successfully");
        loadCart();
      })
      .catch(err => console.error(err));
  }

  if (!user) {
    return <h3>Please login to view cart</h3>;
  }

return (
  <div className="container">
    <h2>🛒 My Cart</h2>

    {items.length === 0 && <p>Cart is empty</p>}

    <div className="grid">
      {items.map(item => (
        <div key={item.id} className="card">
          <p><b>Product ID:</b> {item.productId}</p>
          <p><b>Quantity:</b> {item.quantity}</p>
        </div>
      ))}
    </div>

    {items.length > 0 && (
      <button onClick={placeOrder} style={{ marginTop: 15 }}>
        Place Order
      </button>
    )}
  </div>
);

}

export default Cart;
