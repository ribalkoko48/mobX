import React, { FC, MouseEvent } from 'react';
import cn from 'classnames';
import * as style from './tab.module.scss';

export type TCallbackTab = (target: {
    event: MouseEvent<HTMLDivElement>;
    label: string | number;
    id: string | number;
}) => void;

interface IPropsTab {
    currentId: string;
    id: string | number;
    label: string;
    onClick?: TCallbackTab;
    disabled?: boolean;
}

export const Tab: FC<IPropsTab> = ({ currentId, label, id, onClick, disabled }: IPropsTab) => (
    <div
        role="presentation"
        onClick={(event) => onClick && onClick({ event, label, id })}
        className={cn(
            style.tab,
            currentId === id && style.tabActive,
            disabled && style.tabDisabled
        )}>
        {label}
    </div>
);

Tab.defaultProps = {
    disabled: null,
    onClick: null,
};
