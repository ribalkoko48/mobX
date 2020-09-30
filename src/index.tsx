import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { App } from 'pages/app';
import { ErrorBoundary } from 'components/error-boundary';
import { Notification } from 'components/notification';
import { ErrorNotification } from 'components/error-notification';
import { rateStore } from 'store/rates';
import { regionsStore } from 'store/regions';
import { ratePlanStore } from 'store/rate-plan';
import './global.scss';

configure({ enforceActions: 'observed' });

const storesObject = {
    rateStore,
    regionsStore,
    ratePlanStore,
};

ReactDOM.render(
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Provider {...storesObject}>
        <BrowserRouter>
            <ErrorBoundary>
                <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <App />
                </SnackbarProvider>
            </ErrorBoundary>
            <ErrorNotification />
            <Notification />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
