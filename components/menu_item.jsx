import Image from "next/image";
import styles from "./menu_item.module.scss";

export default function MenuItem({ title, description, price, image }) {
	return (
		<article className={styles.item}>
			<Image
				className={styles.image}
				src={image.mediaItemUrl}
				alt={image.altText}
				width={image.mediaDetails.width}
				height={image.mediaDetails.height}
			/>
			<div className={styles.content}>
				<h3 className={styles.title}>{title}</h3>
				<p className={styles.price}>${price.toFixed(2)}</p>
				<p className={styles.description}>{description}</p>
			</div>
		</article>
	);
}
