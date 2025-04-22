
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface ProductsState {
  items: Product[];
  selectedCategory: string | null;
}

const initialState: ProductsState = {
  items: [
    { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
    { id: 2, name: 'Smartphone', price: 699.99, category: 'Electronics' },
    { id: 3, name: 'Headphones', price: 199.99, category: 'Electronics' },
    { id: 4, name: 'Coffee Maker', price: 89.99, category: 'Kitchen' },
    { id: 5, name: 'Blender', price: 49.99, category: 'Kitchen' },
    { id: 6, name: 'Running Shoes', price: 129.99, category: 'Sports' },
  ],
  selectedCategory: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterByCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    addProduct: (state, action: PayloadAction<Omit<Product, 'id'>>) => {
      const newId = state.items.length > 0 
        ? Math.max(...state.items.map(item => item.id)) + 1 
        : 1;
      
      state.items.push({
        id: newId,
        ...action.payload,
      });
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { filterByCategory, addProduct, removeProduct } = productsSlice.actions;

export default productsSlice.reducer;
