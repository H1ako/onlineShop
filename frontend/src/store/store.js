import { configureStore } from '@reduxjs/toolkit'
import { searchReducer } from './slices/searchSlice'
import { productsReducer } from './slices/productsSlice'
import { customerReducer } from './slices/customerSlice'

export const store = configureStore({
    reducer: { searchReducer, productsReducer, customerReducer },
    devTools: process.env.STATE !== 'production'
})