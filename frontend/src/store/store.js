import { configureStore } from '@reduxjs/toolkit'
import { searchReducer } from './slices/searchSlice'
import { productsReducer } from './slices/productsSlice';

export const store = configureStore({
    reducer: { searchReducer, productsReducer },
    devTools: process.env.STATE !== 'production'
})