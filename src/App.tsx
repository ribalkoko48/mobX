import React from 'react';
import DevTools from 'mobx-react-devtools';
import {Header} from 'header/header';
import {Footer} from 'footer/footer';
import style from './app.module.scss';

const App = () => {
    return (
        <>
        <div className={style.content}>
            <Header />
            hello mobX
            <Footer />

        </div>
        <DevTools />
        </>
    );
}

export default App;
