import Content from "./content";
import styles from "./showcase.module.scss";

export default function Showcase({ children, image }) {
	return (
		<section className={styles.showcase}>
			<img loading="lazy" className={styles.image} src={image} alt="" />
			<div className={styles.overlay}>
				<Content>{children}</Content>
			</div>
		</section>
	);
}

