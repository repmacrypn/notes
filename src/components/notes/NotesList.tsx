import { useState, memo } from 'react'
import { MultiSelect } from '@mantine/core'
import s from './Notes.module.css'
import { Note } from './Note'
import { EmptyState } from '../empty state/EmptyState'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { INote } from '../../interfaces/interfaces'
import { filterNotes, selectNotes } from '../../redux/notesSlice'
import { NotesContext } from '../../context/context'
import { CustomButton } from '../../styles/CustomButton'

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

interface ISelectNotesFieldProps {
    notes: INote[];
    selectValue: string[];
    // eslint-disable-next-line no-unused-vars
    setSelectValue(selectValue: string[]): void;
}

export const SelectNotesField = ({ notes, selectValue, setSelectValue }: ISelectNotesFieldProps) => {
    const dispatch = useAppDispatch()

    const selectData = notes
        .map((noteObj: INote) => noteObj.hashtags)
        .reduce((previousValue: string[], currentValue: string[]) => {
            return previousValue.concat(currentValue)
        }, [])

    const selectedDataResult = Array.from(new Set(selectData))

    const filterNotesOnClick = () => {
        dispatch(filterNotes(selectValue))
    }

    return (
        <div className={s.noteWrapper}>
            <MultiSelect
                placeholder="Pick one"
                value={selectValue}
                onChange={setSelectValue}
                data={selectedDataResult}
                clearable
                maxSelectedValues={3}
                variant="filled"
                styles={{
                    input: {
                        font: 'normal 500 16px/20px Roboto, sans-serif !important',
                        minHeight: 0,
                        maxHeight: 30,
                        paddingBottom: 6,
                        borderRadius: 6,
                    },
                    value: {
                        font: 'normal 400 14px/20px Roboto, sans-serif',
                        marginBottom: 8,
                    },
                    root: {
                        width: '100%',
                    },
                }}
            />
            <CustomButton
                text='filter'
                handleClick={filterNotesOnClick}
            />
        </div>
    )
}