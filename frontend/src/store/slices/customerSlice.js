import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        customer: {}
    },
    reducers: {
        updateCustomer: (state, action) => {
            state.customer = action.payload.customer
        },
    }
})

export const useCustomer = () => useSelector(state => state.customerReducer)

export const { updateCustomer } = customerSlice.actions

export const customerReducer = customerSlice.reducer
