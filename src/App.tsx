/* eslint-disable linebreak-style */
/* eslint-disable indent */

import { FC } from 'react'
import './App.css'
import { Header } from './components/header/Header'
import NotesMain from './components/notes/NotesMain'

const App: FC = () => {
  return (
    <div className='appWrapper'>
      <Header />
      <NotesMain />
    </div>
  )
}

export default App
