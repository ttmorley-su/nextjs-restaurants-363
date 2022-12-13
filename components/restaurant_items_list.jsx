import styles from "./restaurant_items_list.module.scss";

export default function RestaurantItemsList({ children, mode }) {
	return (
		<div className={styles.items} data-view-mode={mode}>
			{children}
		</div>
	);
}
