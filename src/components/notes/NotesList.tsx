import s from './Notes.module.css'
import { Note } from './Note'
import { useAppSelector } from '../../hooks/hooks'
import { INote } from '../../interfaces/interfaces'
import { selectNotes } from '../../redux/notesSlice'
import { EmptyState } from '../empty state/EmptyState'

export const NotesList = () => {
    const notes = useAppSelector(selectNotes)

    const notesResult = notes.map((noteObj: INote) => {
        return (
            <Note
                key={noteObj.id}
                noteObj={noteObj}
            />
        )
    })

    return (
        <div className={s.todos}>
            {
                notesResult.length ?
                    notesResult :
                    <EmptyState />
            }
        </div>
    )
}