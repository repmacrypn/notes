/* import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {
    persistReducer, FLUSH, REHYDRATE,
    PAUSE, PERSIST, PURGE, REGISTER,
} from 'redux-persist'
import notesReducer from './notesSlice'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, notesReducer)

export const store = configureStore({
    reducer: {
        notes: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch */

import { configureStore } from '@reduxjs/toolkit'
import notesReducer from './notesSlice'

export const store = configureStore({
    reducer: {
        notes: notesReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch