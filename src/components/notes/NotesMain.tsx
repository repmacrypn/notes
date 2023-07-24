import s from './Notes.module.css'
import { NotesList } from './NotesList'
import { NoteAdder } from '../change fields/ChangeFields'
import { useState } from 'react'

export const NotesMain = () => {
    const [count, setCount] = useState<number>(1)
    return (
        <div className={s.notesWrapper}>
            <NoteAdder />
            <NotesList />
            <button onClick={() => setCount((prev: number) => prev + 1)}>
                count++
            </button>
            <div>
                {count}
            </div>
        </div>
    )
}