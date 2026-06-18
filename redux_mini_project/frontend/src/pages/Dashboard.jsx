import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductsAsync,
  selectFilteredProducts,
  clearFilters
} from '../features/products/productSlice';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import ProductCard from '../components/ProductCard';
import ProductFormModal from '../components/ProductFormModal';
import { AlertCircle, Plus, SlidersHorizontal } from 'lucide-react';

export const Dashboard = () => {
  const dispatch = useDispatch();
  
  // State from Redux
  const filteredProducts = useSelector(selectFilteredProducts);
  const { status, error, items } = useSelector((state) => state.products);
  
  // Local UI State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  const handleAddClick = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductToEdit(null);
  };

  // Helper to render skeleton cards
  const renderSkeletons = () => {
    return Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="skeleton-card">
        <div className="skeleton-image shine"></div>
        <div className="skeleton-content">
          <div className="skeleton-title shine"></div>
          <div className="skeleton-text shine"></div>
          <div className="skeleton-footer">
            <div className="skeleton-price shine"></div>
            <div className="skeleton-btn shine"></div>
          </div>
        </div>
      </div>
    ));
  };

  const totalProductsCount = items.length;
  const filteredProductsCount = filteredProducts.length;

  return (
    <div className="app-container">
      <Navbar onAddClick={handleAddClick} />
      
      <main className="app-main-content">
        <FilterBar />

        {status === 'failed' && (
          <div className="status-error-pane">
            <AlertCircle className="error-icon" size={48} />
            <h2>Something went wrong</h2>
            <p>{error}</p>
            <button
              onClick={() => dispatch(fetchProductsAsync())}
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        )}

        {status === 'loading' && totalProductsCount === 0 && (
          <div className="products-grid-section">
            <div className="grid-meta">
              <span className="grid-count shine-text">Loading catalog...</span>
            </div>
            <div className="products-grid">{renderSkeletons()}</div>
          </div>
        )}

        {status !== 'failed' && !(status === 'loading' && totalProductsCount === 0) && (
          <div className="products-grid-section">
            <div className="grid-meta">
              <span>
                Showing <strong>{filteredProductsCount}</strong> of{' '}
                <strong>{totalProductsCount}</strong> products
              </span>
            </div>

            {filteredProductsCount === 0 ? (
              <div className="empty-state-pane">
                <SlidersHorizontal className="empty-icon" size={48} />
                <h3>No Products Found</h3>
                <p>
                  {totalProductsCount === 0
                    ? "Your catalog is empty. Start by adding a new product!"
                    : "No products match the selected search terms or filters."}
                </p>
                <div className="empty-actions">
                  {totalProductsCount === 0 ? (
                    <button onClick={handleAddClick} className="btn btn-primary">
                      <Plus size={16} />
                      <span>Add Product</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => dispatch(clearFilters())}
                      className="btn btn-secondary"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onEditClick={handleEditClick}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        productToEdit={productToEdit}
      />
    </div>
  );
};

export default Dashboard;
