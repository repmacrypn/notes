import { ChangeEvent, useState } from 'react'
import { Group, Button, TextInput } from '@mantine/core'
import { nanoid } from '@reduxjs/toolkit'
import s from './Notes.module.css'
import { NotesList } from './NotesList'
import { useAppDispatch } from '../../hooks/hooks'
import { addNote } from '../../redux/notesSlice'
import { INote } from '../../interfaces/interfaces'

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
        <div>
            <Group position='center' noWrap spacing={5} grow>
                <TextInput
                    placeholder="Enter new note..."
                    radius="md"
                    size="md"
                    variant="filled"
                    value={noteValue}
                    onChange={handleChange}
                    styles={{
                        input: {
                            font: 'normal 400 16px/20px Roboto, sans-serif',
                        },
                    }}
                />
                <Button
                    onClick={addNoteOnClick}
                    radius="md" size="md"
                    uppercase
                    styles={{
                        root: {
                            font: 'normal 600 16px/20px Roboto, sans-serif',
                            backgroundColor: 'rgb(25, 136, 0)',
                            maxWidth: 122,
                            margin: '10px 0',
                            '&:hover': {
                                backgroundColor: 'rgb(40, 126, 32)',
                            },
                        },
                    }}
                >
                    add note
                </Button>
            </Group>
        </div>
    )
}