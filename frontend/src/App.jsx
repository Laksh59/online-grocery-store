import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import { CartProvider } from "./CartContext";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";
import AdminProducts from "./pages/AdminProducts";
import AdminCategories from "./pages/AdminCategories";
import AdminInventory from "./pages/AdminInventory";
import AdminOrders from "./pages/AdminOrders";
import Footer from "./components/Footer";
import Orders from "./pages/Orders";

function App() {
  const isAdminApp = window.location.port === "5174";

  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {!isAdminApp ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/categories" element={<Categories />} />

              <Route
                path="/cart"
                element={
                  <ProtectedRoute role="CUSTOMER">
                    <Cart />
                  </ProtectedRoute>
                }
              />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute role="CUSTOMER">
                    <Profile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/orders"
                element={
                  <ProtectedRoute role="CUSTOMER">
                    <Orders />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/checkout"
                element={
                  <ProtectedRoute role="CUSTOMER">
                    <Checkout />
                  </ProtectedRoute>
                }
              />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={
                  <ProtectedRoute role="ADMIN">
                    <Admin />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin"
                element={
                  <ProtectedRoute role="ADMIN">
                    <Admin />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/products"
                element={
                  <ProtectedRoute role="ADMIN">
                    <AdminProducts />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/categories"
                element={
                  <ProtectedRoute role="ADMIN">
                    <AdminCategories />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/inventory"
                element={
                  <ProtectedRoute role="ADMIN">
                    <AdminInventory />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute role="ADMIN">
                    <AdminOrders />
                  </ProtectedRoute>
                }
              />

              <Route path="/login" element={<Login />} />
            </>
          )}
        </Routes>

        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;