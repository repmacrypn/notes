/* eslint-disable linebreak-style */
/* eslint-disable indent */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
/* import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist' */
import { store } from './redux/store.ts'
import App from './App.tsx'

/* const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
) */

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
