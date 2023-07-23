import { TextInput } from '@mantine/core'
import { ChangeEvent, RefObject } from 'react'

interface ICustomInputProps {
    value: string;
    variant: string;
    placeholder: string;
    // eslint-disable-next-line no-unused-vars
    handleChange(e: ChangeEvent<HTMLInputElement>): void
    inputRef?: RefObject<HTMLInputElement> | null
}

export const CustomInput = ({ value, handleChange, variant, placeholder, inputRef = null }: ICustomInputProps) => {
    return (
        <TextInput
            ref={inputRef}
            placeholder={placeholder}
            radius='md'
            size='md'
            variant={variant}
            value={value}
            onChange={handleChange}
            styles={{
                input: {
                    font: 'normal 400 14px/20px Roboto, sans-serif',
                    maxHeight: 30,
                    minHeight: 0,
                },
                root: {
                    width: '100%',
                },
            }}
        />
    )
}