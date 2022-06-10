import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {},
    devTools: process.env.STATE !== 'production'
})