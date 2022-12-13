import Content from "./content";
import classNames from "classnames";
import styles from "./section.module.scss";

export default function Section({ className, children, id, ...rest }) {
	return (
		<section id={id} className={classNames(styles.section, className)} {...rest}>
			<Content>{children}</Content>
		</section>
	);
}
