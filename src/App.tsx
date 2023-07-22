/* eslint-disable linebreak-style */
/* eslint-disable indent */

import { FC } from 'react'
import { MantineProvider } from '@mantine/core'
import './App.css'
import { Header } from './components/header/Header'
import { NotesMain } from './components/notes/NotesMain'

const App: FC = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div className='appWrapper'>
        <Header />
        <NotesMain />
      </div>
    </MantineProvider>
  )
}

export default App
