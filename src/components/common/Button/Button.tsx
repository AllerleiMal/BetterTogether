import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Button.module.scss";
import Loader, { LoaderVariant } from "../Loader/Loader";

export enum ButtonVariant {
    Yellow = "Yellow",
    YellowOutlined = "YellowOutlined",
    Green = "Green",
    Blue = "Blue",
    Red = "Red",
    Black = "Black",
    GreySquare = "GreySquare",
    Outlined = "Outlined",
    Transparent = "Transparent",
}

const getButtonVariantClassName = (buttonVariant: ButtonVariant) => {
    switch (buttonVariant) {
        case ButtonVariant.Yellow:
            return styles.yellow;

        case ButtonVariant.YellowOutlined:
            return styles.yellowOutlined;

        case ButtonVariant.Green:
            return styles.green;

        case ButtonVariant.Blue:
            return styles.blue;

        case ButtonVariant.Red:
            return styles.red;

        case ButtonVariant.Black:
            return styles.black;

        case ButtonVariant.GreySquare:
            return styles.greySquare;

        case ButtonVariant.Outlined:
            return styles.outlined;

        case ButtonVariant.Transparent:
            return styles.transparent;

        default:
            return styles.outlined;
    }
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title?: string;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    buttonVariant?: ButtonVariant;
    beforeIcon?: string | JSX.Element;
    afterIcon?: string | JSX.Element;
    className?: string;
    children?: ReactNode;
    isProcessing?: boolean;
    isProcessingReplace?: boolean;
    isBlackProcessing?: boolean;
}

const Button = ({
    onClick,
    disabled,
    title = "Button",
    buttonVariant = ButtonVariant.Outlined,
    className,
    beforeIcon,
    afterIcon,
    children,
    type = "button",
    isProcessing,
    isProcessingReplace = false,
    isBlackProcessing = true,
}: ButtonProps) => {
    return (
        <button
            type={type}
            className={clsx(styles.button, getButtonVariantClassName(buttonVariant), className)}
            onClick={onClick}
            disabled={disabled}
        >
            {(!isProcessing || (isProcessing && !isProcessingReplace)) && (
                <>
                    {beforeIcon}
                    {children}
                    <p className={styles.buttonText}>{title}</p>
                    {afterIcon}
                </>
            )}

            {isProcessing && (
                <Loader
                    className={clsx(styles.loader, isBlackProcessing && styles.loaderBlack)}
                    loaderVariant={LoaderVariant.Small}
                />
            )}
        </button>
    );
};

export default Button;
