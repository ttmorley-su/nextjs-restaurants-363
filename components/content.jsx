import classNames from "classnames";
import styles from "./content.module.scss";

export default function Content({ className, children }) {
	return <div className={classNames(styles.content, className)}>{children}</div>;
}
