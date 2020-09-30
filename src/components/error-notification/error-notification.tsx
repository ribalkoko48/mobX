import * as React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import * as style from './error-notification.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const CONTAINER_ID = 'error';

export function onShowError(successText: string, onClose?: () => void) {
    toast(<div className={style.text}>{successText}</div>, {
        containerId: CONTAINER_ID,
        onClose: onClose || null,
    });
}

export const ErrorNotification = () => (
    <ToastContainer
        className={style.wrapper}
        enableMultiContainer
        autoClose={false}
        hideProgressBar
        position="top-right"
        closeOnClick
        containerId={CONTAINER_ID}
    />
);
