import React from "react";
import clsx from "clsx";
import styles from "./Input.module.scss";

export enum InputVariant {
    YellowBorder = "YellowBorder",
    Second = "Second",
    Default = "Default",
}

const getInputVariantClassName = (inputVariant: InputVariant) => {
    switch (inputVariant) {
        case InputVariant.YellowBorder:
            return styles.yellowBorder;
        case InputVariant.Second:
            return styles.second;
        default:
            return styles.default;
    }
};

interface InputProps {
    label?: string;
    className?: string;
    errorText?: string;
    errorStyles?: string;
    placeholder?: string;
    inputVariant?: InputVariant;
    disabled?: boolean;
    inputProps?: React.HTMLProps<HTMLInputElement>;
}

const Input = ({
    label,
    className,
    inputProps,
    errorText,
    errorStyles,
    placeholder,
    inputVariant = InputVariant.Default,
    disabled,
}: InputProps) => {
    console.log(inputProps)
    return (
        <div className={clsx(styles.wrapper, className)}>
            {label && <label className={styles.inputLabel}>{label}</label>}
            <input
                className={clsx(
                    styles.inputInput,
                    getInputVariantClassName(inputVariant),
                    errorText && styles.errorBorder,
                )}
                disabled={disabled}
                {...inputProps}
                placeholder={placeholder}
            />
            {errorText && <p className={clsx(styles.requiredField, errorStyles)}>{<span>{errorText}</span>}</p>}
        </div>
    );
};

export default Input;
