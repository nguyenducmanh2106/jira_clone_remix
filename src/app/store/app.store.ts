// import { configureStore } from '@reduxjs/toolkit'
import * as toolkitRaw from '@reduxjs/toolkit';
import fieldSectionSlice from './Slice/fieldSectionSlice';
const { createSlice, configureStore } = ((toolkitRaw as any).default ?? toolkitRaw) as typeof toolkitRaw;
const store = configureStore({
    reducer: {
        fieldSection: fieldSectionSlice,
    }
})

export default store;