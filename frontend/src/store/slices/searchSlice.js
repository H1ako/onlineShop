import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { getUrlParam } from "../../libs/helpers";

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchQuery: '',
    },
    reducers: {
        updateQuery: (state, action) => {
            state.searchQuery = action.payload.query
        },

        updateQueryFromUrl: (state, action) => {
            const query = getUrlParam('query')

            state.searchQuery = query
        }
    }
})

export const useSearch = () => useSelector(state => state.searchReducer)

export const { updateQuery, updateQueryFromUrl } = searchSlice.actions

export const searchReducer = searchSlice.reducer
