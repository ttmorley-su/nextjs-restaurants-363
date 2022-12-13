import Button from "@components/button";
import Image from "next/image";
import styles from "./restaurant_item.module.scss";

export default function RestaurantItem(props) {
	const { title, excerpt, restaurantTypes, slug, featuredImage } =
		props.data.node;
	let image = featuredImage?.node;
	return (
		<article className={styles.item}>
			{featuredImage && (
				<div className={styles.image}>
					<Image
						src={image.mediaItemUrl}
						width={image.mediaDetails.width}
						height={image.mediaDetails.height}
						alt={image.altText}
					/>
				</div>
			)}
			<div className={styles.content}>
				<div>
					<div className={styles.category}>
						{restaurantTypes.edges.map((type) => type.node.name).join(", ")}
					</div>
					<h3 className={styles.title}>{title}</h3>
				</div>
				<p className={styles.desc}>{excerpt}</p>
				<Button href={`/restaurant/${slug}`} kind="primary">
					View Restaurant
				</Button>
			</div>
		</article>
	);
}
