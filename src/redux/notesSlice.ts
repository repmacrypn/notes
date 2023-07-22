import { INote } from './../interfaces/interfaces'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface INotesState {
    notes: INote[]
}

const initialState: INotesState = {
    notes: [],
}

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote: (state, action: PayloadAction<INote>) => {
            state.notes.push(action.payload)
        },
    },
})

export const { addNote } = notesSlice.actions

export const selectNotes = (state: RootState) => state.notes

export default notesSlice.reducer