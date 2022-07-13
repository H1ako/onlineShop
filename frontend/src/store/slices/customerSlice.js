import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        customer: {},
        signInwindowIsVisible: false
    },
    reducers: {
        updateCustomer: (state, action) => {
            state.customer = action.payload.customer
        },
        openSignInWindow: (state) => {
            state.signInwindowIsVisible = true
        },
        closeSignInWindow: (state) => {
            state.signInwindowIsVisible = false
        }
    }
})

export const useCustomer = () => useSelector(state => state.customerReducer)

export const { updateCustomer, openSignInWindow, closeSignInWindow } = customerSlice.actions

export const customerReducer = customerSlice.reducer
