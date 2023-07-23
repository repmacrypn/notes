import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { INote } from '../interfaces/interfaces'

interface INotesState {
    notes: INote[];
}

interface IEditNotesPayloadAction {
    id: string;
    hashtags: RegExpMatchArray | [];
    note: string;
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
        removeNote: (state, action: PayloadAction<string>) => {
            state.notes = state.notes.filter((noteObj: INote) => {
                return noteObj.id !== action.payload
            })
        },
        editNotes: (state, action: PayloadAction<IEditNotesPayloadAction>) => {
            const { hashtags, id, note } = action.payload

            state.notes = state.notes.map((noteObj: INote) => {
                if (noteObj.id === id) {
                    noteObj.hashtags = hashtags
                    noteObj.note = note
                }

                return noteObj
            })
        },
        filterNotes: (state, action: PayloadAction<string[]>) => {
            const curHashtags = action.payload

            curHashtags.length ?
                state.notes = state.notes.map((noteObj: INote) => {
                    for (let i = 0; i < curHashtags.length; i++) {
                        if (noteObj.hashtags.includes(curHashtags[i])) {
                            noteObj.isVisible = true
                            return noteObj
                        }
                    }

                    noteObj.isVisible = false
                    return noteObj
                }) :
                state.notes = state.notes.map((noteObj: INote) => {
                    noteObj.isVisible = true
                    return noteObj
                })
        },
    },
})

export const { addNote, removeNote, editNotes, filterNotes } = notesSlice.actions

export const selectNotes = (state: RootState) => state.notes.notes

export default notesSlice.reducer