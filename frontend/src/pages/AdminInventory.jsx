import { useNavigate } from "react-router-dom";
import "../scss/AdminInventory.scss";

function AdminInventory() {
  const navigate = useNavigate();

  return (
      <div className="admin-inventory-page">
        <div className="admin-inventory-header">
          <div>
            <h1>Inventory Management</h1>
            <p>
              Manage products, categories and stock inventory.
            </p>
          </div>

          <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/admin")}
          >
            Back to Dashboard
          </button>
        </div>

        <div className="inventory-management-grid">
          <div className="inventory-section-card">
            <div className="section-icon">📦</div>

            <h2>Products</h2>

            <p>
              Add, update and delete grocery products.
            </p>

            <button
                type="button"
                className="primary-button"
                onClick={() => navigate("/admin/products")}
            >
              Manage Products
            </button>
          </div>

          <div className="inventory-section-card">
            <div className="section-icon">🏷️</div>

            <h2>Categories</h2>

            <p>
              Create and organize product categories.
            </p>

            <button
                type="button"
                className="primary-button"
                onClick={() => navigate("/admin/categories")}
            >
              Manage Categories
            </button>
          </div>
        </div>
      </div>
  );
}

export default AdminInventory;