import React, { FC, ChangeEvent, useCallback } from 'react';
import cn from 'classnames';
import * as style from './input.module.scss';

interface IPropsInput {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onEnter?: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    disabled?: boolean;
    className?: string;
    placeholder?: string;
    icon?: JSX.Element;

    [key: string]: any;
}

export const Input: FC<IPropsInput> = (props: IPropsInput) => {
    const {
        className,
        onChange,
        onEnter,
        disabled,
        value,
        icon,
        placeholder,
        ...otherProps
    } = props;

    const handleOnEnter = useCallback(
        (event) => {
            if (event.key === 'Enter' && onEnter) {
                onEnter(event);
            }
        },
        [onEnter]
    );

    return (
        <div className={cn(style.wrapper, className)}>
            <input
                {...otherProps}
                className={cn(style.input, icon && style.inputWithIcon)}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                onChange={onChange}
                onKeyDown={handleOnEnter}
            />
            {icon && <div className={style.icon}>{icon}</div>}
        </div>
    );
};
