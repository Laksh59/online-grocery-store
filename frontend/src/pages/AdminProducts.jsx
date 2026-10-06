import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

import { getAllCategories } from "../services/categoryService";

import "../scss/AdminProducts.scss";

function AdminProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [formData, setFormData] = useState({
    productName: "",
    sku: "",
    price: "",
    imageUrl: "",
    active: true,
    categoryId: "",
  });

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = () => {
    getAllProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products", error);
      });
  };

  const loadCategories = () => {
    getAllCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddProduct = () => {
    setEditProductId(null);
    setMessage("");
    setMessageType("");

    setFormData({
      productName: "",
      sku: "",
      price: "",
      imageUrl: "",
      active: true,
      categoryId: "",
    });

    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditProductId(product.productId);
    setMessage("");
    setMessageType("");

    setFormData({
      productName: product.productName,
      sku: product.sku,
      price: product.price,
      imageUrl: product.imageUrl || "",
      active: product.active,
      categoryId: product.categoryId,
    });

    setShowForm(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    const product = {
      productName: formData.productName,
      sku: formData.sku,
      price: Number(formData.price),
      active: formData.active === true || formData.active === "true",
      imageUrl: formData.imageUrl,
      categoryId: Number(formData.categoryId),
    };

    if (editProductId) {
      updateProduct(editProductId, product)
        .then(() => {
          setMessage("Product updated successfully");
          setMessageType("success");
          setShowForm(false);
          setEditProductId(null);
          loadProducts();
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.message ||
            "Unable to update product";

          setMessage(errorMessage);
          setMessageType("error");
        });
    } else {
      createProduct(product)
        .then(() => {
          setMessage("Product created successfully");
          setMessageType("success");
          setShowForm(false);
          loadProducts();
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.message ||
            "Unable to create product";

          setMessage(errorMessage);
          setMessageType("error");
        });
    }
  };

  const handleDelete = (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) {
      return;
    }

    deleteProduct(productId)
      .then(() => {
        setMessage("Product deleted successfully");
        setMessageType("success");
        loadProducts();
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message ||
          "Unable to delete product";

        setMessage(errorMessage);
        setMessageType("error");
      });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditProductId(null);
    setMessage("");
    setMessageType("");

    setFormData({
      productName: "",
      sku: "",
      price: "",
      imageUrl: "",
      active: true,
      categoryId: "",
    });
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(
      (category) => category.categoryId === categoryId,
    );

    return category ? category.categoryName : "—";
  };

  return (
    <div className="admin-products">

      {/* Header */}
      <div className="admin-products-header">
        <div>
          <h1>Product Management</h1>
          <p>Manage your FreshNest products</p>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate("/admin")}
          >
            Back to Dashboard
          </button>

          <button
            type="button"
            className="primary-button"
            onClick={handleAddProduct}
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`form-message ${messageType}`}>
          {message}
        </div>
      )}

      {/* Add/Edit Product Form */}
      {showForm && (
        <div className="product-form-card">

          <div className="form-header">
            <h2>
              {editProductId ? "Edit Product" : "Add Product"}
            </h2>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              {/* Product Name */}
              <div className="form-group">
                <label>Product Name</label>

                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              {/* SKU */}
              <div className="form-group">
                <label>SKU</label>

                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  placeholder="Enter SKU"
                  required
                />
              </div>

              {/* Price */}
              <div className="form-group">
                <label>Price</label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="Enter price"
                  required
                />
              </div>

              {/* Category */}
              <div className="form-group">
                <label>Category</label>

                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>

                  {categories.map((category) => (
                    <option
                      key={category.categoryId}
                      value={category.categoryId}
                    >
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image URL */}
              <div className="form-group">
                <label>Image URL</label>

                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="/muskmelon.jpg"
                  required
                />
              </div>

              {/* Active */}
              <div className="form-group">
                <label>Active</label>

                <select
                  name="active"
                  value={formData.active}
                  onChange={handleChange}
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </select>
              </div>

            </div>

            <div className="form-actions">

              <button
                type="submit"
                className="primary-button"
              >
                {editProductId
                  ? "Update Product"
                  : "Save Product"}
              </button>

              <button
                type="button"
                className="cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>

            </div>

          </form>
        </div>
      )}

      {/* Product Table */}
      <div className="product-table-card">

        <div className="table-header">
          <div>
            <h2>Products</h2>
            <span>{products.length} products</span>
          </div>
        </div>

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Category</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {products.map((product) => (

                <tr key={product.productId}>

                  <td>
                    {product.productId}
                  </td>

                  <td className="product-name">
                    {product.productName}
                  </td>

                  <td>
                    {product.sku}
                  </td>

                  <td className="product-price">
                    ₹{product.price}
                  </td>

                  <td>
                    {getCategoryName(product.categoryId)}
                  </td>

                  <td>
                    <span
                      className={
                        product.active
                          ? "status active"
                          : "status inactive"
                      }
                    >
                      {product.active
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  <td>
                    <div className="action-buttons">

                      <button
                        type="button"
                        className="edit-button"
                        onClick={() =>
                          handleEdit(product)
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-button"
                        onClick={() =>
                          handleDelete(product.productId)
                        }
                      >
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminProducts;