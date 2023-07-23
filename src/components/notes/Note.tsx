import { ChangeEvent, useState, useRef, useEffect } from 'react'
import s from './Notes.module.css'
import { INote } from '../../interfaces/interfaces'
import { useAppDispatch } from '../../hooks/hooks'
import { editNotes, removeNote } from '../../redux/notesSlice'

interface INoteProps {
    noteObj: INote;
}

export const Note = ({ noteObj }: INoteProps) => {
    const dispatch = useAppDispatch()

    const [editNum, setEditNum] = useState<string | null>(null)
    const [noteEditValue, setNoteEditValue] = useState<string>(noteObj.note)

    const inputRef = useRef<HTMLInputElement>(null)
    let noteItem: React.ReactElement<HTMLInputElement>

    const handleItemChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setNoteEditValue(e.currentTarget.value)
    }

    const handleStopEditOnClick = () => {
        const regexp: RegExp = /(?<=(?<!\S)#)[A-Z]+/gi
        const hashtags: RegExpMatchArray | null = noteEditValue.match(regexp)

        dispatch(editNotes({ id: noteObj.id, hashtags: hashtags || [], note: noteObj.note }))
        setEditNum(null)
    }

    const hashtags = noteObj.hashtags.map((hashtag: string, i) => {
        return (
            <span key={i}>{hashtag}{' '}</span>
        )
    })

    if (editNum) {
        noteItem = (
            <div>
                <input
                    className={s.addTodoInput}
                    ref={inputRef}
                    value={noteEditValue}
                    onChange={handleItemChange}
                />
                <button onClick={handleStopEditOnClick}>
                    Done
                </button>
            </div>
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

    return (
        <div className={s[`isVisible${noteObj.isVisible}`]}>
            <div>
                {noteItem}
            </div>
            <div>
                {hashtags || 'No hashtags found'}
            </div>
        </div>
    )
}

interface NoteDivItemProps {
    note: INote;
    itemValue: string;
    // eslint-disable-next-line no-unused-vars
    setEditNum(id: string): void;
}

const NoteDivItem = ({ note, itemValue, setEditNum }: NoteDivItemProps) => {
    const dispatch = useAppDispatch()

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