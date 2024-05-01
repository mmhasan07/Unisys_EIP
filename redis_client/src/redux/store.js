import { configureStore } from '@reduxjs/toolkit'
import countReducer from './slices/countSlice'
import arrayReducer from './slices/arraySlice'

export const store = configureStore({
//   reducer: {
//     countReducer:countReducer,
//     ArrayReducer:ArrayReducer,
//   },
  reducer: {
    countReducer,
    arrayReducer,
  },
})
