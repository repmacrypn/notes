import { ChangeEvent, useState, useRef, useEffect } from 'react'
import s from './Notes.module.css'
import { INote } from '../../interfaces/interfaces'
import { useAppDispatch } from '../../hooks/hooks'
/* import { useNotesContext } from '../../context/context' */
import { removeNote } from '../../redux/notesSlice'

interface INoteProps {
    noteObj: INote;
}

export const Note = ({ noteObj }: INoteProps) => {
    const [editNum, setEditNum] = useState<string | null>(null)
    const [noteEditValue, setNoteEditValue] = useState<string>(noteObj.note)

    const inputRef = useRef<HTMLInputElement>(null)
    let noteItem: React.ReactElement<HTMLInputElement>

    const handleItemChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setNoteEditValue(e.currentTarget.value)
    }

    if (editNum) {
        noteItem = (
            <input
                className={s.addTodoInput}
                ref={inputRef}
                value={noteEditValue}
                onChange={handleItemChange}
                onBlur={() => setEditNum(null)}
            />
        )
    } else {
        noteItem = (
            <NoteDivItem
                note={noteObj}
                itemValue={noteEditValue}
                setEditNum={setEditNum}
            />
        )
    }

    useEffect(() => {
        inputRef.current?.focus()
    }, [noteItem])

    return <div>{noteItem}</div>
}

interface NoteDivItemProps {
    note: INote;
    itemValue: string;
    // eslint-disable-next-line no-unused-vars
    setEditNum(id: string): void;
}

const NoteDivItem = ({ note, itemValue, setEditNum }: NoteDivItemProps) => {
    const dispatch = useAppDispatch()
    /* const notes = useNotesContext() */

    const removeTaskOnClick = (id: string): void => {
        dispatch(removeNote(id))
    }

    return (
        <div className={s.todoItemsWrapper}>
            <div className={s.todoItemValue}>
                {itemValue}
            </div>
            <button onClick={() => setEditNum(note.id)} >
                edit
            </button>
            <button
                className={`${s.todoButton} ${s.removeTodoButton}`}
                onClick={() => removeTaskOnClick(note.id)}
            >
                X
            </button>
        </div>
    )
}