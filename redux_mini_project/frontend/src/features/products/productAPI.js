import { loadProductsFromStorage, saveProductsToStorage } from '../../services/localStorage';

// Initial dummy products if local storage is empty
const INITIAL_PRODUCTS = [
  {
    id: '1',
    name: 'Wireless Noise-Canceling Headphones',
    category: 'Electronics',
    price: 199.99,
    stock: 15,
    description: 'Experience premium sound quality with active noise cancellation and 40-hour battery life.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
  },
  {
    id: '2',
    name: 'Minimalist Leather Backpack',
    category: 'Clothing',
    price: 89.50,
    stock: 8,
    description: 'Water-resistant, hand-crafted genuine leather backpack with a dedicated 15-inch laptop compartment.',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() // 4 days ago
  },
  {
    id: '3',
    name: 'Smart Fitness Watch',
    category: 'Electronics',
    price: 129.00,
    stock: 24,
    description: 'Track your workouts, heart rate, sleep quality, and receive smart notifications on the go.',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
  },
  {
    id: '4',
    name: 'Ceramic Pour-Over Coffee Maker',
    category: 'Home',
    price: 34.00,
    stock: 40,
    description: 'Artisanal ceramic dripper designed for brewing flavorful pour-over coffee at home.',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
  },
  {
    id: '5',
    name: 'Organic Cotton Hoodie',
    category: 'Clothing',
    price: 59.99,
    stock: 0,
    description: 'Super soft, premium organic cotton hoodie with a relaxed fit and front pouch pocket.',
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  },
  {
    id: '6',
    name: 'Ergonomic Office Chair',
    category: 'Home',
    price: 249.00,
    stock: 5,
    description: 'Fully adjustable lumbar support, 3D armrests, and breathable mesh back for ultimate comfort.',
    imageUrl: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    createdAt: new Date().toISOString()
  }
];

// Helper to get products list (local storage or initial products)
const getStoredProducts = () => {
  const data = loadProductsFromStorage();
  if (!data) {
    saveProductsToStorage(INITIAL_PRODUCTS);
    return INITIAL_PRODUCTS;
  }
  return data;
};

// Simulate Network Delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const productAPI = {
  // Fetch all products
  async fetchProducts() {
    await delay(600);
    return [...getStoredProducts()];
  },

  // Add a new product
  async addProduct(product) {
    await delay(500);
    const products = getStoredProducts();
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      price: parseFloat(product.price) || 0,
      stock: parseInt(product.stock) || 0,
      createdAt: new Date().toISOString()
    };
    const updated = [newProduct, ...products];
    saveProductsToStorage(updated);
    return newProduct;
  },

  // Edit an existing product
  async updateProduct(product) {
    await delay(500);
    const products = getStoredProducts();
    const updated = products.map((p) =>
      p.id === product.id
        ? {
            ...p,
            ...product,
            price: parseFloat(product.price) || 0,
            stock: parseInt(product.stock) || 0
          }
        : p
    );
    saveProductsToStorage(updated);
    return updated.find((p) => p.id === product.id);
  },

  // Delete a product
  async deleteProduct(productId) {
    await delay(400);
    const products = getStoredProducts();
    const updated = products.filter((p) => p.id !== productId);
    saveProductsToStorage(updated);
    return productId;
  }
};
