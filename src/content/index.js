import React from 'react';
import {observer} from 'mobx-react'
import style from './content.module.scss';

function ContentComp(props) {
    return (
        <div className={style.content}>
            <div className={style.buttons}>
                {`${props.state.userFullData}`}
                <button onClick={() => props.state.setAge(1)}>возраст +1</button>
                {`${props.state.user}`}
                <button onClick={() => props.state.setUser('Michail')}>Имя</button>
            </div>
        </div>
    )
}

export const Content = observer(ContentComp);
