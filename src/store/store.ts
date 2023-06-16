import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import relayReducer from './relaySlice'
import groupReducer from './groupSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    relay: relayReducer,
    group: groupReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch