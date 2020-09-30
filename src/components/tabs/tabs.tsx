import React, { createRef, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { tabs } from 'constants/tabs';
import { ITabsItem } from 'constants/types';
import { fetchApi } from 'services';
import { Tab } from './components/tab';
import * as style from './tabs.module.scss';

interface IPropsTabs {
    match: { params: { tabName: string } };
    tabs: ITabsItem[];
    currentId: string;
}

interface IStateTabs {
    left: number;
    width: number;
}

export class Tabs extends PureComponent<IPropsTabs, IStateTabs> {
    resizeTimer = null;

    resizeActionDelay = 500;

    constructor(props: IPropsTabs) {
        super(props);

        tabs.forEach(({ id }) => {
            this[id] = createRef();
        });

        this.state = {
            left: 0,
            width: 0,
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.onResize, false);

        this.updateLinePosition();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize, false);
    }

    componentDidUpdate(prevProps: Readonly<IPropsTabs>) {
        const {
            match: {
                params: { tabName },
            },
        } = this.props;

        if (prevProps.match.params.tabName !== tabName) {
            this.updateLinePosition();
        }
    }

    onResize = () => {
        const { width } = this.state;

        if (width !== 0) {
            this.setState({
                width: 0,
            });
        }

        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(this.updateLinePosition, this.resizeActionDelay);
    };

    updateLinePosition = () => {
        const {
            match: {
                params: { tabName },
            },
        } = this.props;

        if (this[tabName]) {
            const { offsetLeft = 0, clientWidth = 0 } = this[tabName].current;

            this.setState({
                left: offsetLeft,
                width: clientWidth,
            });
        }
    };

    render() {
        const {
            match: {
                params: { tabName },
            },
        } = this.props;
        const { left, width } = this.state;

        return (
            <div className={style.tabs}>
                {tabs.map((tab) =>
                    tab.href ? (
                        <div key={tab.label} ref={this[tab.id]} className={style.tabWrapper}>
                            <Link to={tab.href} href={tab.href} className={style.link}>
                                <Tab
                                    currentId={tabName}
                                    label={tab.label}
                                    id={tab.id}
                                    onClick={tab.onClick}
                                    disabled={tab.disabled}
                                />
                            </Link>
                        </div>
                    ) : (
                        <div key={tab.label} ref={this[tab.id]} className={style.tabWrapper}>
                            <Tab
                                currentId={tabName}
                                label={tab.label}
                                id={tab.id}
                                onClick={tab.onClick}
                                disabled={tab.disabled}
                            />
                        </div>
                    )
                )}
                <div style={{ left, width }} className={style.line} />
            </div>
        );
    }
}
