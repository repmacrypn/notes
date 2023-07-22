import React from 'react'
import { INote } from '../interfaces/interfaces'

export const NotesContext = React.createContext<INote[]>([])

export const useNotesContext = () => React.useContext(NotesContext)