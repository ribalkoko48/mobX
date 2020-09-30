import React, { PureComponent } from 'react';
import * as style from './spinner.module.scss';

type TProps = {
    className?: string;
    size?: number;
}

export class Spinner extends PureComponent<TProps> {
    render() {
        const { className, size } = this.props;
        const spinnerSize = size
            ? { width: `${size}px`, height: `${size}px` }
            : undefined;

        return (
            <div className={className}>
                <div className={style.wrapper} style={spinnerSize}>&nbsp;</div>
            </div>
        );
    }
}
