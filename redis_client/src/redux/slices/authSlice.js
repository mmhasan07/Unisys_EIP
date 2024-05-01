import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn:false,
}

export const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1
    },
    decrement: (state) => {
      state.count -= 1
    },
    incrementByAmount: (state, action) => {
      state.count+= action.payload
    },
    setArr: (state, action) => {
        state.arr = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setArr } = counterSlice.actions

export default authSlice.reducer