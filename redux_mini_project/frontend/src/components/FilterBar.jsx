import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchQuery,
  setSelectedCategory,
  setStockFilter,
  setSortBy,
  setPriceRange,
  clearFilters
} from '../features/products/productSlice';
import { Search, Filter, RotateCcw, SlidersHorizontal } from 'lucide-react';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Home', 'Books', 'Beauty', 'Sports'];

export const FilterBar = () => {
  const dispatch = useDispatch();
  const {
    searchQuery,
    selectedCategory,
    minPrice,
    maxPrice,
    stockFilter,
    sortBy
  } = useSelector((state) => state.products);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleCategoryChange = (e) => {
    dispatch(setSelectedCategory(e.target.value));
  };

  const handleStockFilterChange = (e) => {
    dispatch(setStockFilter(e.target.value));
  };

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  const handleMinPriceChange = (e) => {
    dispatch(setPriceRange({ min: e.target.value, max: maxPrice }));
  };

  const handleMaxPriceChange = (e) => {
    dispatch(setPriceRange({ min: minPrice, max: e.target.value }));
  };

  const handleReset = () => {
    dispatch(clearFilters());
  };

  const isFilterActive =
    searchQuery !== '' ||
    selectedCategory !== 'All' ||
    minPrice !== '' ||
    maxPrice !== '' ||
    stockFilter !== 'All' ||
    sortBy !== 'newest';

  return (
    <div className="filter-bar-wrapper">
      <div className="search-box">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          placeholder="Search products by name, category..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div className="filters-container">
        <div className="filter-group">
          <label className="filter-label">Category</label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="filter-select"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Stock Status</label>
          <select
            value={stockFilter}
            onChange={handleStockFilterChange}
            className="filter-select"
          >
            <option value="All">All Inventory</option>
            <option value="InStock">In Stock</option>
            <option value="OutOfStock">Out of Stock</option>
          </select>
        </div>

        <div className="filter-group price-range-group">
          <label className="filter-label">Price Range ($)</label>
          <div className="price-inputs">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={handleMinPriceChange}
              className="price-input"
              min="0"
            />
            <span className="price-separator">-</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              className="price-input"
              min="0"
            />
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">Sort By</label>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="filter-select"
          >
            <option value="newest">Newest Added</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
          </select>
        </div>

        {isFilterActive && (
          <button onClick={handleReset} className="btn btn-secondary btn-reset">
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
