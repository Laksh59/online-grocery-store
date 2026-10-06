import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrders, cancelOrder } from "../services/orderService";
import "../scss/Order.scss";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const customer = JSON.parse(localStorage.getItem("customer"));

  const loadOrders = async () => {
    try {
      const response = await getAllOrders();

      const customerOrders = response.data.filter(
        (order) =>
          String(order.customerId) === String(customer?.customerId),
      );

      setOrders(customerOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleCancel = async (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      await cancelOrder(orderId);

      await loadOrders();

      alert("Order cancelled successfully");
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Failed to cancel order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="orders-page">
      <div className="orders-header">
        <div>
          <h1>My Orders</h1>
          <p>View and track your FreshNest orders</p>
        </div>

        <button type="button" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <h2>No orders yet</h2>

          <p>Your placed orders will appear here.</p>

          <button
            type="button"
            onClick={() => navigate("/products")}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order.orderId}>
              <div className="order-card-header">
                <div>
                  <h2>Order #{order.orderId}</h2>

                  <p>
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>

                <span className="order-status">
                  {order.orderStatus}
                </span>
              </div>

              <div className="order-items">
                {order.orderItems.map((item) => (
                  <div
                    className="order-item"
                    key={item.productId}
                  >
                    <div>
                      <strong>{item.productName}</strong>

                      <span>Quantity: {item.quantity}</span>
                    </div>

                    <strong>₹{item.totalPrice}</strong>
                  </div>
                ))}
              </div>

              <div className="order-total">
                <span>Total Amount</span>

                <strong>₹{order.totalAmount}</strong>
              </div>

              {order.orderStatus === "CREATED" && (
                <div className="order-actions">
                  <button
                    type="button"
                    className="cancel-order-button"
                    onClick={() => handleCancel(order.orderId)}
                    disabled={loading}
                  >
                    Cancel Order
                  </button>
                </div>
              )}

              {order.orderStatus === "CANCELLED" && (
                <p className="cancelled-message">
                  This order has been cancelled.
                </p>
              )}

              {order.orderStatus === "DELIVERED" && (
                <p className="delivered-message">
                  This order has been delivered.
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
