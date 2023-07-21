import s from './Header.module.css'

export const Header = () => {
    return (
        <header className={s.headerContainer}>
            <div className={s.headerTitle}>
                Notes app
            </div>
        </header>
    )
}