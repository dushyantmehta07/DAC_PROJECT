import { useEffect, useState } from "react";
import api from "../api/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrderItems, setSelectedOrderItems] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  function loadOrders() {
    api.get("/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }

  function viewItems(orderId) {
    api.get(`/orders/${orderId}/items`)
      .then(res => setSelectedOrderItems(res.data))
      .catch(err => console.error(err));
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>📦 Admin - Orders</h2>

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map(order => (
        <div key={order.id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <p><b>Order ID:</b> {order.id}</p>
          <p><b>User ID:</b> {order.userId}</p>
          <p><b>Total:</b> ₹{order.total}</p>
          <p><b>Status:</b> {order.status}</p>
          <p><b>Date:</b> {order.createdAt}</p>

          <button onClick={() => viewItems(order.id)}>
            View Items
          </button>
        </div>
      ))}

      {selectedOrderItems.length > 0 && (
        <>
          <hr />
          <h3>🧾 Order Items</h3>

          {selectedOrderItems.map(item => (
            <div key={item.id} style={{ marginBottom: 5 }}>
              Product ID: {item.productId} | 
              Qty: {item.quantity} | 
              Price: ₹{item.price}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default AdminOrders;
