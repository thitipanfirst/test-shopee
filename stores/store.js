import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'
import ItemSlice from '@/stores/itemSlice/itemSlice'

export const store = configureStore({
    reducer: {
        itemSlice: ItemSlice,
    }
})

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
export const useAppDispatch = () => useDispatch();