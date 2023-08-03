import { configureStore } from '@reduxjs/toolkit'
import fieldSectionSlice from './Slice/fieldSectionSlice';

const store = configureStore({
    reducer: {
        fieldSection: fieldSectionSlice,
    }
})

export default store;