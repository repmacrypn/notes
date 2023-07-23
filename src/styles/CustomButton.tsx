import { Button } from '@mantine/core'

interface ICustomAddButtonProps {
    handleClick(): void;
    text: string;
}

export const CustomButton = ({ handleClick, text }: ICustomAddButtonProps) => {
    return (
        <Button
            onClick={handleClick}
            radius="md"
            size="md"
            styles={{
                root: {
                    font: 'normal 500 14px/20px Roboto, sans-serif',
                    backgroundColor: 'rgb(25, 136, 0)',
                    minWidth: 100,
                    width: 100,
                    height: 30,
                    margin: '10px 0',
                    padding: 0,
                    '&:hover': {
                        backgroundColor: 'rgb(40, 126, 32)',
                    },
                },
            }}
        >
            {text}
        </Button>
    )
}