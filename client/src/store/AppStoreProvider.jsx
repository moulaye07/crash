import React from 'react'
import {  Provider } from 'react-redux'
import mainReducer from './reducers/mainReducer';
import { configureStore } from '@reduxjs/toolkit'

const Store= configureStore({
  reducer:{AppState:mainReducer},
})
function AppStoreProvider({children}) {

  return (
    <Provider store={Store}>{children}</Provider>
  )
}

export default AppStoreProvider;