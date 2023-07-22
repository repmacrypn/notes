import { Notes } from 'tabler-icons-react'
import s from './Header.module.css'

export const Header = () => {
    return (
        <header className={s.headerContainer}>
            <Notes size={32} />
            <div className={s.headerTitle}>
                Notes app
            </div>
        </header>
    )
}