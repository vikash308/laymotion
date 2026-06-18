import React from 'react';
import { useSelector } from 'react-redux';
import { selectProductMetrics } from '../features/products/productSlice';
import { Plus, Boxes, CheckCircle2, AlertOctagon, Wallet } from 'lucide-react';

export const Navbar = ({ onAddClick }) => {
  const { total, inStock, outOfStock, totalValue } = useSelector(selectProductMetrics);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(val);
  };

  return (
    <header className="app-header">
      <div className="header-top">
        <div className="logo-section">
          <div className="logo-icon-container">
            <Boxes className="logo-icon" size={28} />
          </div>
          <div className="logo-text">
            <h1>Stockly</h1>
            <p>Product Management Console</p>
          </div>
        </div>
        
        <button className="btn btn-primary btn-add" onClick={onAddClick}>
          <Plus size={18} />
          <span>Add Product</span>
        </button>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon-wrapper blue">
            <Boxes size={22} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Total Products</span>
            <span className="metric-value">{total}</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrapper green">
            <CheckCircle2 size={22} />
          </div>
          <div className="metric-info">
            <span className="metric-label">In Stock</span>
            <span className="metric-value">{inStock}</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrapper red">
            <AlertOctagon size={22} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Out of Stock</span>
            <span className="metric-value">{outOfStock}</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrapper gold">
            <Wallet size={22} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Total Inventory Value</span>
            <span className="metric-value">{formatCurrency(totalValue)}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
