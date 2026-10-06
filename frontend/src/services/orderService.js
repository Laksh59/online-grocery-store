import api from "./api";

export const getAllOrders = () => {
  return api.get("http://localhost:8084/api/orders");
};

export const updateOrderStatus = (orderId, status) => {
  return api.patch(
    `http://localhost:8084/api/orders/${orderId}/status?status=${status}`,
  );
};

export const cancelOrder = (orderId) => {
  return api.put(`http://localhost:8084/api/orders/${orderId}/cancel`);
};
