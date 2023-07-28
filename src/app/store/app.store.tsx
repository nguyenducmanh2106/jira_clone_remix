import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './Slice/counterSlice';
import fieldSectionSlice from './Slice/fieldSectionSlice';

const store = configureStore({
    reducer: {
        counter: counterSlice,
        fieldSection: fieldSectionSlice,
    }
})

export default store;