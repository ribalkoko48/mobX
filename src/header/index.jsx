import * as React from 'react';
import style from './header.module.scss';

export const Header = ({ user }) => {
    return (
        <header className={style.header}>
            В шапке ставим пользователя {user}
        </header>
    )
};