import { useState, memo } from 'react'
import s from './Notes.module.css'
import { Note } from './Note'
import { EmptyState } from '../empty state/EmptyState'
import { SelectNotesField } from '../change fields/ChangeFields'
import { useAppSelector } from '../../hooks/hooks'
import { INote } from '../../interfaces/interfaces'
import { selectNotes } from '../../redux/notesSlice'
import { NotesContext } from '../../context/context'

export const NotesList = () => {
    const notes = useAppSelector(selectNotes)
    const [selectValue, setSelectValue] = useState<string[]>([])

    return (
        <div className={s.notesListWrapper}>
            <NotesContext.Provider value={{ notes, setSelectValue }}>
                <NotesResult notes={notes} />
            </NotesContext.Provider>
            <SelectNotesField
                notes={notes}
                selectValue={selectValue}
                setSelectValue={setSelectValue}
            />
        </div >
    )
}

interface INotesResultProps {
    notes: INote[]
}

export const NotesResult = memo(({ notes }: INotesResultProps) => {
    const notesResult = notes.map((noteObj: INote) => {
        return (
            <Note
                key={noteObj.id}
                noteObj={noteObj}
            />
        )
    })

    if (!notesResult.length) return <EmptyState />

    return (
        <div>
            {notesResult}
        </div>
    )
})