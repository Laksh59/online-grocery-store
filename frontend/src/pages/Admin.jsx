import { useNavigate } from "react-router-dom";
import "../scss/Admin.scss";

function Admin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("customer");
    window.dispatchEvent(new Event("customerChanged"));
    navigate("/login");
  };

  return (
      <div className="admin-page">
        <div className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome back, Admin</p>
          </div>

          <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="admin-dashboard-grid">
          <div className="admin-card">
            <div className="card-icon">📦</div>

            <div className="card-content">
              <h2>Inventory Management</h2>
              <p>
                Manage products, categories and stock inventory.
              </p>
            </div>

            <button
                type="button"
                className="primary-button"
                onClick={() => navigate("/admin/inventory")}
            >
              Manage Inventory
            </button>
          </div>

          <div className="admin-card">
            <div className="card-icon">🛒</div>

            <div className="card-content">
              <h2>Orders</h2>
              <p>
                View and manage customer orders.
              </p>
            </div>

            <button
                type="button"
                className="primary-button"
                onClick={() => navigate("/admin/orders")}
            >
              Manage Orders
            </button>
          </div>
        </div>
      </div>
  );
}

export default Admin;