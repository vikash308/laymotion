import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProductAsync } from '../features/products/productSlice';
import { Edit3, Trash2, Calendar, AlertTriangle } from 'lucide-react';

export const ProductCard = ({ product, onEditClick }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );
    if (confirmDelete) {
      dispatch(deleteProductAsync(product.id));
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const isOutOfStock = product.stock === 0;

  return (
    <div className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
      <div className="card-image-wrapper">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="card-image"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=60';
          }}
        />
        <div className="card-category-badge">{product.category}</div>
        {isOutOfStock ? (
          <div className="stock-alert-badge out">Out of Stock</div>
        ) : (
          <div className="stock-alert-badge in">{product.stock} left</div>
        )}
      </div>

      <div className="card-body">
        <h3 className="card-title" title={product.name}>
          {product.name}
        </h3>
        
        <p className="card-description">
          {product.description || 'No description available for this product.'}
        </p>

        <div className="card-footer">
          <div className="price-tag">{formatPrice(product.price)}</div>
          <div className="card-date">
            <Calendar size={13} />
            <span>{formatDate(product.createdAt)}</span>
          </div>
        </div>

        <div className="card-actions">
          <button
            onClick={() => onEditClick(product)}
            className="btn-card-action btn-edit"
            title="Edit Product"
          >
            <Edit3 size={15} />
            <span>Edit</span>
          </button>
          <button
            onClick={handleDelete}
            className="btn-card-action btn-delete"
            title="Delete Product"
          >
            <Trash2 size={15} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
