import React from 'react'
import { INote } from '../interfaces/interfaces'

interface INotesContext {
    notes: INote[];
    // eslint-disable-next-line no-unused-vars
    setSelectValue(selectValue: string[]): void;
}

export const NotesContext = React.createContext<INotesContext>({
    notes: [],
    setSelectValue: () => { },
})

export const useNotesContext = () => React.useContext(NotesContext)