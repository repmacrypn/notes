import { ChangeEvent, useState } from 'react'
import { Group, Button, TextInput } from '@mantine/core'
import s from './Notes.module.css'

export const NotesMain = () => {
    return (
        <div>
            <TaskAdder />
        </div>
    )
}

export const TaskAdder = () => {
    const [noteValue, setNoteValue] = useState<string>('')
    /* const [hashtagValue, setHashTagValue] = useState<string>('') */

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setNoteValue(e.currentTarget.value)
    }

    /* const addTaskOnClick = (): void => {
        const newTask = { id: nanoid(), note: noteValue, hashtagValue }
        if (noteValue) {
            setTodos([...todos, newTask])
            setNoteValue('')
            setHashTagValue()
        }
    } */

    return (
        <div className={s.notesWrapper}>
            <Group>
                <TextInput
                    placeholder="Enter new note...."
                    radius="md"
                    size="md"
                    variant="filled"
                    value={noteValue}
                    onChange={handleChange}
                />
                <Button
                    color="green"
                    radius="md" size="md"
                    uppercase
                >
                    add note
                </Button>
            </Group>
            {/* <input
                className={s.addTodoInput}
                value={taskValue}
                onChange={handleChange}
                placeholder='New task...'
                type='text'
            />
            <button
                className={`${s.todoButton} ${s.addTodoButton}`}
                onClick={addTaskOnClick}>
                Add task
            </button> */}
        </div>
    )
}