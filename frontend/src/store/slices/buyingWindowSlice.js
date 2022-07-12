import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"

const buyingWindowSlice = createSlice({
  name: "buyingWindow",
  initialState: {
    productId: null,
    product: {},
    isVisible: false,
  },
  reducers: {
    closeWindow: (state) => {
      state.isVisible = false
    },
    openWindow: (state, action) => {
      state.productId = action.payload.productId
      state.isVisible = true
    },
    updateProduct: (state, action) => {
      state.product = action.payload.product
    },
    updateProductId: (state, action) => {
      state.productId = action.payload.productId
    },
  },
})

export const useBuyingWindow = () =>
  useSelector((state) => state.buyingWindowReducer)

export const { closeWindow, openWindow, updateProduct, updateProductId } =
  buyingWindowSlice.actions

export const buyingWindowReducer = buyingWindowSlice.reducer
