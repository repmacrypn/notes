import { ChangeEvent, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import s from './Notes.module.css'
import { NotesList } from './NotesList'
import { useAppDispatch } from '../../hooks/hooks'
import { addNote } from '../../redux/notesSlice'
import { INote } from '../../interfaces/interfaces'
import { CustomButton } from '../../styles/CustomButton'
import { CustomInput } from '../../styles/CustomInput'

export const NotesMain = () => {
    return (
        <div className={s.notesWrapper}>
            <NoteAdder />
            <NotesList />
        </div>
    )
}

export const NoteAdder = () => {
    const [noteValue, setNoteValue] = useState<string>('')

    const dispatch = useAppDispatch()

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setNoteValue(e.currentTarget.value)
    }

    const addNoteOnClick = (): void => {
        const regexp: RegExp = /(?<=(?<!\S)#)[A-Z]+/gi
        const hashtags: RegExpMatchArray | null = noteValue.match(regexp)

        const newTask: INote = { id: nanoid(), note: noteValue, hashtags: hashtags || [], isVisible: true }

        if (noteValue) {
            dispatch(addNote(newTask))
            setNoteValue('')
        }
    }

    return (
        <div className={`${s.noteWrapper} ${s.addNoteWrapper}`}>
            <CustomInput
                value={noteValue}
                handleChange={handleChange}
                placeholder='Enter new note...'
                variant='filled'
            />
            <CustomButton
                text='add note'
                handleClick={addNoteOnClick}
            />
        </div>
    )
}