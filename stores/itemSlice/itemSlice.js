import { createSlice } from '@reduxjs/toolkit';

export const itemSlice = createSlice({
    name: 'item',
    initialState: {
        searchValue: '',
        search: false,
        openImage: false,
        openModal: false,
        image: '',
        images: [],
        indexImage: 0,
        title: '',
        myCart: []
    },
    reducers: {
        SET_search: (state, action) => {
            state.search = action.payload
        },
        SET_searchValue: (state, action) => {
            state.searchValue = action.payload
        },
        SET_title: (state, action) => {
            state.title = action.payload
        },
        SET_Image: (state, action) => {
            state.image = action.payload
        },
        SET_indexImage: (state, action) => {
            state.indexImage = action.payload
        },
        SET_Images: (state, action) => {
            state.images = action.payload
        },
        SET_openImage: (state, action) => {
            state.openModal = action.payload
            state.openImage = action.payload
        },
        SET_myCart: (state, action) => {
            state.myCart = action.payload
        },
        CLOSE_modal: (state) => {
            state.openImage = false
            state.openModal = false
        },
    },
});

export const { SET_search, SET_searchValue, SET_openImage, CLOSE_modal, SET_Image, SET_Images, SET_title, SET_indexImage, SET_myCart } = itemSlice.actions;

export default itemSlice.reducer;