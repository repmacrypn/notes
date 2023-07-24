/* eslint-disable linebreak-style */
/* eslint-disable indent */

import { FC/* , useEffect */ } from 'react'
import { MantineProvider } from '@mantine/core'
import './App.css'
import { Header } from './components/header/Header'
import { NotesMain } from './components/notes/NotesMain'
/* import { useAppDispatch } from './hooks/hooks'
import { filterNotes } from './redux/notesSlice' */

const App: FC = () => {
  /*   const dispatch = useAppDispatch()
  
    useEffect(() => {
      return () => {
        dispatch(filterNotes([]))
      }
    }) */

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
