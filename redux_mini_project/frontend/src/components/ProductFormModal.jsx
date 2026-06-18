import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProductAsync, updateProductAsync } from '../features/products/productSlice';
import { X, Sparkles } from 'lucide-react';

const CATEGORIES = ['Electronics', 'Clothing', 'Home', 'Books', 'Beauty', 'Sports'];

const DEFAULT_IMAGES = {
  Electronics: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format&fit=crop&q=60',
  Clothing: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&auto=format&fit=crop&q=60',
  Home: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=60',
  Books: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&auto=format&fit=crop&q=60',
  Beauty: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=60',
  Sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&auto=format&fit=crop&q=60'
};

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=60';

export const ProductFormModal = ({ isOpen, onClose, productToEdit = null }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    price: '',
    stock: '',
    description: '',
    imageUrl: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        category: productToEdit.category,
        price: productToEdit.price,
        stock: productToEdit.stock,
        description: productToEdit.description || '',
        imageUrl: productToEdit.imageUrl || ''
      });
    } else {
      setFormData({
        name: '',
        category: 'Electronics',
        price: '',
        stock: '',
        description: '',
        imageUrl: ''
      });
    }
    setErrors({});
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    if (formData.stock === '' || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Stock quantity cannot be negative';
    }
    if (!formData.category) newErrors.category = 'Category is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    let finalImageUrl = formData.imageUrl.trim();
    if (!finalImageUrl) {
      finalImageUrl = DEFAULT_IMAGES[formData.category] || FALLBACK_IMAGE;
    }

    const submissionData = {
      ...formData,
      imageUrl: finalImageUrl,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
    };

    if (productToEdit) {
      dispatch(updateProductAsync({ ...submissionData, id: productToEdit.id }));
    } else {
      dispatch(addProductAsync(submissionData));
    }
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrapper">
            <div className="modal-icon-glow">
              <Sparkles size={18} className="glow-icon" />
            </div>
            <h2>{productToEdit ? 'Edit Product' : 'Add New Product'}</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Mechanical Gaming Keyboard"
              className={`form-input ${errors.name ? 'error' : ''}`}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category" className="form-label">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-input"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="price" className="form-label">Price ($) *</label>
              <input
                type="number"
                id="price"
                name="price"
                step="0.01"
                min="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="19.99"
                className={`form-input ${errors.price ? 'error' : ''}`}
              />
              {errors.price && <span className="error-text">{errors.price}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="stock" className="form-label">Stock Quantity *</label>
              <input
                type="number"
                id="stock"
                name="stock"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                placeholder="10"
                className={`form-input ${errors.stock ? 'error' : ''}`}
              />
              {errors.stock && <span className="error-text">{errors.stock}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl" className="form-label">Image URL (Optional)</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="form-input"
            />
            <span className="helper-text">
              Leave blank to use a category-based default image.
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Description (Optional)</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product features, specifications, or details..."
              className="form-textarea"
              rows="3"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {productToEdit ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
