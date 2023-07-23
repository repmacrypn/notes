import s from './Notes.module.css'
import { NotesList } from './NotesList'
import { NoteAdder } from '../change fields/ChangeFields'

export const NotesMain = () => {
    return (
        <div className={s.notesWrapper}>
            <NoteAdder />
            <NotesList />
        </div>
    )
}