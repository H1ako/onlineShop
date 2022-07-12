import { configureStore } from '@reduxjs/toolkit'
import { searchReducer } from './slices/searchSlice'
import { productsReducer } from './slices/productsSlice'
import { customerReducer } from './slices/customerSlice'
import { buyingWindowReducer } from './slices/buyingWindowSlice'

export const store = configureStore({
    reducer: { searchReducer, productsReducer, customerReducer, buyingWindowReducer },
    devTools: process.env.STATE !== 'production'
})