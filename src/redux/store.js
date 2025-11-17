import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import favoritesReducer from './favoritesSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    favorites: favoritesReducer,
  },
});

export default store;
