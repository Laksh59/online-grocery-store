import { useEffect, useState } from "react";
import { getInventoryByProductId } from "../services/inventoryService";
import "../scss/ProductCard.scss";
import { useCart } from "../CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const [availableQuantity, setAvailableQuantity] = useState(null);
  const [message, setMessage] = useState("");

  const customer = JSON.parse(localStorage.getItem("customer"));
  const isAdmin = customer?.role === "ADMIN";
  const isProductActive = product.active === true;

  useEffect(() => {
    getInventoryByProductId(product.productId)
      .then((response) => {
        setAvailableQuantity(response.data.availableQuantity);
      })
      .catch((error) => {
        console.error("Error fetching inventory:", error);
        setAvailableQuantity(0);
      });
  }, [product.productId]);

  const handleAddToCart = () => {
    if (!isProductActive || availableQuantity === 0) {
      setMessage("Out of Stock");
      return;
    }

    addToCart(product);
    setMessage("Product added to cart!");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.productName} />

      <h3>{product.productName}</h3>

      <p>Price: ₹{product.price}</p>

      {!isAdmin && (
          <>
            {availableQuantity === null ? (
                <p>Checking stock...</p>
            ) : !isProductActive || availableQuantity === 0 ? (
                <p className="out-of-stock">Out of Stock</p>
            ) : (
                <button type="button" onClick={handleAddToCart}>
                  Add to Cart
                </button>
            )}

            {message && <p className="cart-message">{message}</p>}
          </>
      )}
    </div>
  );
}

export default ProductCard;