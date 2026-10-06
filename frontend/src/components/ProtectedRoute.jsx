import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const customer = JSON.parse(localStorage.getItem("customer"));
  const isAdminApp = window.location.port === "5174";

  if (!customer) {
    return <Navigate to="/login" replace />;
  }

  if (role && customer.role !== role) {
    return <Navigate to={isAdminApp ? "/admin" : "/"} replace />;
  }

  if (isAdminApp && customer.role !== "ADMIN") {
    return <Navigate to="/login" replace />;
  }

  if (!isAdminApp && customer.role === "ADMIN") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;