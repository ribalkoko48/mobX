import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Tabs } from 'components/tabs/tabs';
import {
    RATES_TAB,
    SERVICES_TAB,
    SMS_ITEMS_TAB,
    SMS_TYPES_TAB,
    SERVICE_PACKAGES_TAB,
    BK_TAB,
    OTHER_DIRECTORIES_TAB,
} from 'constants/tabs';
import { RatePlans } from 'pages/rate-plans';
import './app.css';

/* import Services from './Services';
import SimCardsProductPositionsAndRegions from './SimCardsProductPositionsAndRegions'; */

const Services = () => <div>Services</div>;
const SimCardsProductPositionsAndRegions = () => <div>SimCardsProductPositionsAndRegions</div>;
const development = () => <div>В разработке</div>;

export function App() {
    return (
        <div className="app-wrapper">
            <Route path="/:tabName" component={Tabs} />
            <Switch>
                <Route path={`/${RATES_TAB}`} component={RatePlans} />
                <Route path={`/${SERVICES_TAB}`} component={Services} />
                <Route path={`/${SMS_ITEMS_TAB}`} component={SimCardsProductPositionsAndRegions} />
                <Route path={`/${SMS_TYPES_TAB}`} component={development} />
                <Route path={`/${SERVICE_PACKAGES_TAB}`} component={development} />
                <Route path={`/${BK_TAB}`} component={development} />
                <Route path={`/${OTHER_DIRECTORIES_TAB}`} component={development} />
                <Redirect to={RATES_TAB} />
            </Switch>
        </div>
    );
}
