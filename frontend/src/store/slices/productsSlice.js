import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        page: 1,
        count: null,
        tags: []
    },
    reducers: {
        updateProducts: (state, action) => {
            state.products = action.payload.products ?? state.products
            state.page = action.payload.page ?? state.page
            state.count = action.payload.count ?? state.count
        },

        updateTags: (state, action) => {
            const tag = action.payload.tag
            if (tag === undefined) return

            if (state.tags.includes(tag)) {
                const newTags = state.tags.filter(listTag => listTag !== tag)
                state.tags = newTags
            }
            else {
                state.tags = [tag, ...state.tags]
            }
        }
    }
})

export const useProducts = () => useSelector(state => state.productsReducer)

export const { updateProducts, updateTags } = productsSlice.actions

export const productsReducer = productsSlice.reducer
