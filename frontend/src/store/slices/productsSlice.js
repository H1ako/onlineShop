import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        page: 1,
        count: null
    },
    reducers: {
        updateProducts: (state, action) => {
            state.products = action.payload.products ?? state.products
            state.page = action.payload.page ?? state.page
            state.count = action.payload.count ?? state.count
        }
    }
})

export const useProducts = () => useSelector(state => state.productsReducer)

export const { updateProducts } = productsSlice.actions

export const productsReducer = productsSlice.reducer
