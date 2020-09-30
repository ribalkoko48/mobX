import React, { PureComponent } from 'react';
import cn from 'classnames';
import { emptyData } from '../../constants';
import * as style from './loading-text.module.scss';

type TProps = {
    className?: string;
    isLoading: boolean;
};

export class LoadingText extends PureComponent<TProps> {
    render() {
        const { className, isLoading, children = emptyData } = this.props;

        return isLoading ? (
            <span className={cn(style.wrapper, className)}>{children}</span>
        ) : (
            children
        );
    }
}
