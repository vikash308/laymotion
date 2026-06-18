import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productAPI } from './productAPI';
import { toast } from 'react-toastify';

// Async Thunks
export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await productAPI.fetchProducts();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch products');
    }
  }
);

export const addProductAsync = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      return await productAPI.addProduct(productData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add product');
    }
  }
);

export const updateProductAsync = createAsyncThunk(
  'products/updateProduct',
  async (productData, { rejectWithValue }) => {
    try {
      return await productAPI.updateProduct(productData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update product');
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      return await productAPI.deleteProduct(productId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete product');
    }
  }
);

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  
  // Filtering & Sorting State
  searchQuery: '',
  selectedCategory: 'All',
  minPrice: '',
  maxPrice: '',
  stockFilter: 'All', // 'All' | 'InStock' | 'OutOfStock'
  sortBy: 'newest' // 'newest' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setPriceRange(state, action) {
      const { min, max } = action.payload;
      state.minPrice = min;
      state.maxPrice = max;
    },
    setStockFilter(state, action) {
      state.stockFilter = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    clearFilters(state) {
      state.searchQuery = '';
      state.selectedCategory = 'All';
      state.minPrice = '';
      state.maxPrice = '';
      state.stockFilter = 'All';
      state.sortBy = 'newest';
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch products';
        toast.error(state.error);
      })
      
      // Add Product
      .addCase(addProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.unshift(action.payload);
        toast.success('Product added successfully!');
      })
      .addCase(addProductAsync.rejected, (state, action) => {
        state.status = 'succeeded';
        toast.error(action.payload || 'Failed to add product');
      })
      
      // Update Product
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        toast.success('Product updated successfully!');
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        state.status = 'succeeded';
        toast.error(action.payload || 'Failed to update product');
      })
      
      // Delete Product
      .addCase(deleteProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter((item) => item.id !== action.payload);
        toast.success('Product deleted successfully!');
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.status = 'succeeded';
        toast.error(action.payload || 'Failed to delete product');
      });
  }
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setPriceRange,
  setStockFilter,
  setSortBy,
  clearFilters
} = productSlice.actions;

// Selectors for Filtered Products
export const selectFilteredProducts = (state) => {
  const {
    items,
    searchQuery,
    selectedCategory,
    minPrice,
    maxPrice,
    stockFilter,
    sortBy
  } = state.products;

  let result = [...items];

  // 1. Search filter
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    result = result.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query))
    );
  }

  // 2. Category filter
  if (selectedCategory !== 'All') {
    result = result.filter(
      (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  // 3. Price Filter (min / max)
  if (minPrice !== '' && minPrice !== null) {
    result = result.filter((item) => item.price >= parseFloat(minPrice));
  }
  if (maxPrice !== '' && maxPrice !== null) {
    result = result.filter((item) => item.price <= parseFloat(maxPrice));
  }

  // 4. Stock Filter
  if (stockFilter === 'InStock') {
    result = result.filter((item) => item.stock > 0);
  } else if (stockFilter === 'OutOfStock') {
    result = result.filter((item) => item.stock === 0);
  }

  // 5. Sorting
  if (sortBy === 'newest') {
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sortBy === 'price-asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    result.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name-asc') {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'name-desc') {
    result.sort((a, b) => b.name.localeCompare(a.name));
  }

  return result;
};

// Selectors for metadata/metrics
export const selectProductMetrics = (state) => {
  const items = state.products.items;
  const total = items.length;
  const inStock = items.filter((item) => item.stock > 0).length;
  const outOfStock = total - inStock;
  const totalValue = items.reduce((sum, item) => sum + item.price * item.stock, 0);

  return {
    total,
    inStock,
    outOfStock,
    totalValue
  };
};

export default productSlice.reducer;
