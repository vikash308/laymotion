const STORAGE_KEY = 'laymotion_products';

export const loadProductsFromStorage = () => {
  try {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (err) {
    console.error('Error loading products from LocalStorage:', err);
    return undefined;
  }
};

export const saveProductsToStorage = (products) => {
  try {
    const serializedData = JSON.stringify(products);
    localStorage.setItem(STORAGE_KEY, serializedData);
  } catch (err) {
    console.error('Error saving products to LocalStorage:', err);
  }
};
