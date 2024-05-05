import clsx from "clsx";
import styles from "./Loader.module.scss";
import { isUndefined, omit } from "lodash";

export enum LoaderVariant {
    Small = "Small",
    Medium = "Medium",
    Large = "Large",
}

const getLoaderVariantClassName = (loaderVariant: LoaderVariant) => {
    switch (loaderVariant) {
        case LoaderVariant.Small:
            return styles.small;

        case LoaderVariant.Medium:
            return styles.medium;

        case LoaderVariant.Large:
            return styles.large;

        default:
            return styles.default;
    }
};

interface LoaderBaseProps {
    className?: string;
    loaderVariant?: LoaderVariant;
}

const LoaderBase = (props: LoaderBaseProps) => {
    const { className, loaderVariant = LoaderVariant.Medium } = props;

    return (
        <div className={styles.wrapper}>
            <span className={clsx(styles.spinner, getLoaderVariantClassName(loaderVariant), className)}></span>
        </div>
    );
};

type LoaderWithChildrenProps = LoaderBaseProps & {
    /** @default isUndefined(children) */
    isLoading?: boolean;
    children?: JSX.Element;
};

const LoaderWithChildren = (props: LoaderWithChildrenProps): JSX.Element => {
    const NextComponent = LoaderBase;
    type NextProps = Parameters<typeof NextComponent>[0];

    const { children, isLoading = isUndefined(children) } = props;

    const nextProps: NextProps = omit(props, ["isLoading", "children"]);

    return isLoading ? <NextComponent {...nextProps} /> : children ?? <></>;
};

const Loader = LoaderWithChildren;
export type LoaderProps = Parameters<typeof Loader>[0];

export default Loader;
