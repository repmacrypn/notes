import { MultiSelect } from '@mantine/core'
import { nanoid } from '@reduxjs/toolkit'
import { ChangeEvent, useState } from 'react'
import s from './ChangeFields.module.css'
import { useAppDispatch } from '../../hooks/hooks'
import { INote } from '../../interfaces/interfaces'
import { filterNotes } from '../../redux/notesSlice'
import { CustomButton } from '../../styles/CustomButton'
import { addNote } from '../../redux/notesSlice'
import { CustomInput } from '../../styles/CustomInput'
import { getHashtags } from '../../utilites/getHashtags'

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
                placeholder='Pick one'
                value={selectValue}
                onChange={setSelectValue}
                data={selectedDataResult}
                clearable
                maxSelectedValues={3}
                variant='filled'
                styles={{
                    input: {
                        font: 'normal 500 16px/20px Roboto, sans-serif !important',
                        minHeight: 0,
                        maxHeight: 30,
                        borderRadius: 6,
                    },
                    searchInput: {
                        paddingBottom: 8,
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

export const NoteAdder = () => {
    const [noteValue, setNoteValue] = useState<string>('')

    const dispatch = useAppDispatch()

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setNoteValue(e.currentTarget.value)
    }

    const addNoteOnClick = (): void => {
        const hashtags = getHashtags(noteValue)
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