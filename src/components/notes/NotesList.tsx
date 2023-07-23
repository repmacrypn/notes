import { useState } from 'react'
import { MultiSelect } from '@mantine/core'
import s from './Notes.module.css'
import { Note } from './Note'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { INote } from '../../interfaces/interfaces'
import { filterNotes, selectNotes } from '../../redux/notesSlice'
import { EmptyState } from '../empty state/EmptyState'
import { NotesContext } from '../../context/context'

//максы что я могу оптимизировать так это селект и кнопку внизу чтобы не перерендеривалась

export const NotesList = () => {
    const dispatch = useAppDispatch()
    const notes = useAppSelector(selectNotes)
    const [selectValue, setSelectValue] = useState<string[]>([])

    const selectData = notes
        .map((noteObj: INote) => noteObj.hashtags)
        .reduce((previousValue: string[], currentValue: string[]) => {
            return previousValue.concat(currentValue)
        }, [])

    const selectedDataResult = Array.from(new Set(selectData))

    const filterNotesOnClick = () => {
        dispatch(filterNotes(selectValue))
    }

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
        <div className={s.notesListWrapper}>
            <NotesContext.Provider value={{ notes, setSelectValue }}>
                <div>
                    {notesResult}
                </div>
            </NotesContext.Provider>
            <MultiSelect
                placeholder="Pick one"
                value={selectValue}
                onChange={setSelectValue}
                data={selectedDataResult}
                clearable
                maxSelectedValues={3}
                variant="filled"
            />
            <button onClick={filterNotesOnClick}>
                filter
            </button>
        </div >
    )
}