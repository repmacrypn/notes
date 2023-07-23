import { ChangeEvent, useState, useRef, useEffect } from 'react'
import { Edit } from 'tabler-icons-react'
import s from './Notes.module.css'
import { INote } from '../../interfaces/interfaces'
import { useAppDispatch } from '../../hooks/hooks'
import { editNotes, filterNotes, removeNote } from '../../redux/notesSlice'
import { useNotesContext } from '../../context/context'
import { CustomInput } from '../../styles/CustomInput'
//вынести функцию в утилиты
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
            <span key={i}>
                {hashtag}{' '}
            </span>
        )
    })

    if (editNum) {
        noteItem = (
            <div className={`${s.notesItemsWrapper} ${s.noteInput}`}>
                <CustomInput
                    value={noteEditValue}
                    handleChange={handleItemChange}
                    placeholder='Edit note...'
                    variant='unstyled'
                    inputRef={inputRef}
                />
                {/* <input
                    className={s.addTodoInput}
                    ref={inputRef}
                    value={noteEditValue}
                    onChange={handleItemChange}
                /> */}
                <button onClick={handleStopEditOnClick}>
                    done
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
            <div className={s.note}>
                {noteItem}
            </div>
            <div className={s.hashtags}>
                <span className={s.hashtagsTitle}>
                    hashtags:{' '}
                </span>
                {
                    hashtags.length ?
                        hashtags : 'not found'
                }
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
    const { notes, setSelectValue } = useNotesContext()

    const removeTaskOnClick = (id: string): void => {
        dispatch(removeNote(id))
        const visibleNotes = notes.filter((noteObj: INote) => noteObj.isVisible)
        if (visibleNotes.length === 1) {
            dispatch(filterNotes([]))
            setSelectValue([])
        }
    }

    return (
        <div className={s.notesItemsWrapper}>
            <div className={s.notesItemValue}>
                {itemValue || 'hah that\'s empty'}
            </div>
            <div className={s.editNotesButtons}>
                <button
                    className={`${s.notesButton} ${s.editNoteButton}`}
                    onClick={() => setEditNum(note.id)}
                >
                    edit{' '}
                    <Edit className={s.icon} viewBox="0 -3.5 24 24" size={16} />
                </button>
                <button
                    className={s.notesButton}
                    onClick={() => removeTaskOnClick(note.id)}
                >
                    X
                </button>
            </div>
        </div>
    )
}