import React, { Component } from 'react';
import * as style from './error-boundary.module.scss';

interface IErrorBoundaryProps {
    children: React.ReactNode;
}

export class ErrorBoundary extends Component<IErrorBoundaryProps> {
    state = {
        isErrorContent: false,
        errorMessage: '',
    };

    componentDidCatch(error: Error) {
        if (error) {
            this.setState({
                isErrorContent: true,
                errorMessage: error,
            });
        }
    }

    render() {
        const { isErrorContent, errorMessage } = this.state;
        const { children } = this.props;

        return isErrorContent ? (
            <div className={style.wrapper}>{errorMessage}</div>
        ) : (
            children
        );
    }
}
