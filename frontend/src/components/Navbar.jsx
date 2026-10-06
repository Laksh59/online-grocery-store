import {Link, useLocation, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../CartContext";
import "../scss/Navbar.scss";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");

  const [customer, setCustomer] = useState(
    JSON.parse(localStorage.getItem("customer")),
  );

  const { cart } = useCart();

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const isAdminApp = window.location.port === "5174";
  const isAdmin = customer?.role === "ADMIN";

  useEffect(() => {
    const updateCustomer = () => {
      setCustomer(JSON.parse(localStorage.getItem("customer")));
    };

    window.addEventListener("customerChanged", updateCustomer);

    return () => {
      window.removeEventListener("customerChanged", updateCustomer);
    };
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      setSearchTerm("");
    }
  }, [location.pathname]);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <nav className="navbar">
      <Link
        to={isAdminApp && isAdmin ? "/admin" : "/"}
        className="brand-name"
      >
        <span className="brand-icon">🌿</span>

        <span>
          <strong>FreshNest</strong>
        </span>
      </Link>

      <div className="search-box">
        <span className="search-icon">⌕</span>

        <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
        />

        {searchTerm && (
            <button
                type="button"
                className="search-clear"
                onClick={() => {
                  setSearchTerm("");
                  navigate("/");
                }}
            >
              ×
            </button>
        )}
      </div>

      <div className="nav-links">
        {isAdminApp ? (
          isAdmin ? (
            <>
              <Link to="/admin/inventory">Inventory</Link>

              <Link to="/admin/orders">Orders</Link>

              <button
                type="button"
                className="profile-button admin-profile"
                onClick={() => navigate("/admin")}
              >
                👤 Admin
              </button>
            </>
          ) : (
            <Link to="/login" className="login-link">
              Login / Sign up
            </Link>
          )
        ) : (
          <>
            <Link to="/cart" className="cart-link">
              <span className="cart-icon">
                🛒
                {totalItems > 0 && (
                  <span className="cart-count">{totalItems}</span>
                )}
              </span>

              <span>Cart</span>
            </Link>

            {customer ? (
              <button
                type="button"
                className="profile-button"
                onClick={() => navigate("/profile")}
              >
                👤 Profile
              </button>
            ) : (
              <Link to="/login" className="login-link">
                Login / Sign up
              </Link>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;