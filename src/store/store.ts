import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import relayReducer from './relaySlice'
import groupReducer from './groupSlice'
import { listenerMiddleware } from './listenerMiddleware'

export const store = configureStore({
  reducer: {
    user: userReducer,
    relay: relayReducer,
    group: groupReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch