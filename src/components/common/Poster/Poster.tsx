import { Avatar } from "@mui/material";
import styles from "./Poster.module.scss";

interface PosterProps {
    onClick: () => void;
}

const Poster = (props: PosterProps) => {
    const {
        onClick
    } = props;

    return <div className={styles.posterWrapper}>
        <Avatar 
            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.posters.cz%2Fharry-potter-philosopher-s-stone-v91827&psig=AOvVaw1I6OWG42UFcHDlzECQBpM6&ust=1713193583085000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIihh839wYUDFQAAAAAdAAAAABAE" 
            alt="poster"
            onClick={onClick}
        />
    </div>;
}