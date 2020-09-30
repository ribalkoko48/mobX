import * as React from 'react';
import { toast, ToastContainer } from 'react-toastify';
// import * as style from './notification-modal.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const CONTAINER_ID = 'success';

export function onShowNotification(successText: string, onClose?: () => void) {
    toast(<div>{successText}</div>, {
        containerId: CONTAINER_ID,
        // progressClassName: style.progress,
        onClose: onClose || null,
    });
}

export const Notification = () => (
    <ToastContainer
        enableMultiContainer
        position="top-right"
        // hideProgressBar
        closeOnClick
        // className={style.wrapper}
        containerId={CONTAINER_ID}
    />
);
