import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";
import "../scss/AdminCategories.scss";

function AdminCategories() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddCategory = () => {
    setEditCategoryId(null);

    setFormData({
      categoryName: "",
      description: "",
    });

    setShowForm(true);
  };

  const handleEdit = (category) => {
    setEditCategoryId(category.categoryId);

    setFormData({
      categoryName: category.categoryName,
      description: category.description || "",
    });

    setShowForm(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editCategoryId !== null) {
        await updateCategory(editCategoryId, formData);
        alert("Category updated successfully");
      } else {
        await createCategory(formData);
        alert("Category created successfully");
      }

      handleCancel();
      loadCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Failed to save category");
    }
  };

  const handleDelete = async (categoryId) => {
    const confirmed = window.confirm(
        "Are you sure you want to delete this category?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteCategory(categoryId);

      alert("Category deleted successfully");

      loadCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditCategoryId(null);

    setFormData({
      categoryName: "",
      description: "",
    });
  };

  return (
      <div className="admin-categories">
        <div className="admin-categories-header">
          <div>
            <h1>Category Management</h1>
            <p>
              Organize FreshNest products by category.
            </p>
          </div>

          <div className="header-actions">
            <button
                type="button"
                className="secondary-button"
                onClick={() => navigate("/admin/inventory")}
            >
              Back to Inventory
            </button>

            <button
                type="button"
                className="primary-button"
                onClick={handleAddCategory}
            >
              + Add Category
            </button>
          </div>
        </div>

        {showForm && (
            <div className="category-form-card">
              <div className="form-header">
                <h2>
                  {editCategoryId !== null
                      ? "Edit Category"
                      : "Add Category"}
                </h2>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Category Name</label>

                  <input
                      type="text"
                      name="categoryName"
                      value={formData.categoryName}
                      onChange={handleChange}
                      placeholder="Enter category name"
                      required
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>

                  <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter category description"
                      rows="4"
                  />
                </div>

                <div className="form-actions">
                  <button
                      type="submit"
                      className="primary-button"
                  >
                    {editCategoryId !== null
                        ? "Update Category"
                        : "Save Category"}
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

        <div className="category-table-card">
          <div className="table-header">
            <div>
              <h2>Categories</h2>
              <span>{categories.length} categories</span>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
              <tr>
                <th>ID</th>
                <th>Category Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
              </thead>

              <tbody>
              {categories.map((category) => (
                  <tr key={category.categoryId}>
                    <td>{category.categoryId}</td>

                    <td className="category-name">
                      {category.categoryName}
                    </td>

                    <td className="category-description">
                      {category.description || "—"}
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                            type="button"
                            className="edit-button"
                            onClick={() => handleEdit(category)}
                        >
                          Edit
                        </button>

                        <button
                            type="button"
                            className="delete-button"
                            onClick={() =>
                                handleDelete(category.categoryId)
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

export default AdminCategories;