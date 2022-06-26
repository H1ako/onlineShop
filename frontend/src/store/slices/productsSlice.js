import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
    },
    reducers: {
        updateProducts: (state, action) => {
            state.products = action.payload.products
        }
    }
})

export const useProducts = () => useSelector(state => state.productsReducer)

export const { updateProducts } = productsSlice.actions

export const productsReducer = productsSlice.reducer
