import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import {configure} from 'mobx';
import * as serviceWorker from './serviceWorker';
import DevTools from 'mobx-react-devtools';
import {Header} from "./header/index";
import {Content} from "./content";
import {Footer} from "./footer";
import style from "./style.module.scss";
import {userStore} from "./store/index";

configure({enforceActions: 'observed'});

@observer
class App extends Component {

    render() {
        const {state: { user }} = this.props;

        return (
            <div className={style.app}>
                <DevTools />

                <Header user={user}/>
                <Content state={userStore}/>
                <Footer />
            </div>
        );
    }
}

ReactDOM.render(<App state={userStore} />, document.getElementById('root'));

serviceWorker.unregister();
