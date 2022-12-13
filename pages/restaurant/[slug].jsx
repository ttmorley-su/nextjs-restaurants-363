import Button from "@components/button";
import Content from "@components/content";
import MenuItem from "@components/menu_item";
import Showcase from "@components/showcase";
import { getAllRestaurantSlugs, getRestaurant } from "@lib/api";
import styles from "./[slug].module.scss";

export async function getStaticPaths() {
	const paths = await getAllRestaurantSlugs();
	for (let i = 0, length = paths.length; i < length; i++) {
		paths[i] = { params: { slug: paths[i].node.slug } };
	}
	return { paths, fallback: false };
}

export async function getStaticProps(context) {
	const slug = context.params.slug;
	const props = await getRestaurant(slug);
	return { props };
}

export default function Restaurant(props) {
	let type = props.restaurantTypes?.nodes?.[0]?.name;
	let { contact, location, hours, menu } = props.restaurantInformation ?? {};
	const menuItems = menu?.menuItems ?? [];

	return (
		<>
			<Showcase image={props.featuredImage.node.mediaItemUrl} />
			<Content>
				<div className={styles.layout}>
					{/* Main Content */}
					<div>
						<section>
							<p className={styles.category}>{type}</p>
							<h1 className={styles.title}>{props.title}</h1>
							<p>{props.excerpt}</p>
						</section>

						<section>
							<h2>Menu</h2>
							{menuItems.length ? (
								menuItems.map((item, i) => (
									<MenuItem key={i} {...item.menuItem} />
								))
							) : (
								<p>This restaurant doesn&apos;t seem to have any items...</p>
							)}
						</section>
					</div>

					{/* Sidebar */}
					<aside>
						<section className={styles.buttons}>
							<Button kind="primary">Order Takeout</Button>
							<Button kind="primary">Make a Reservation</Button>
						</section>

						<section>
							<h2>Location</h2>
							<div>
								{location.streetAddress}
								<br />
								{location.city}, {location.state}, {location.zipCode}
							</div>
						</section>

						<section>
							<h2>Contact</h2>
							{contact.phoneNumber && (
								<p>
									<a
										className={styles.link}
										href={`tel:${contact.phoneNumber}`}
									>
										{contact.phoneNumber}
									</a>
								</p>
							)}
							{contact.emailAddress && (
								<p>
									<a
										className={styles.link}
										href={`mailto:${contact.emailAddress}`}
									>
										{contact.emailAddress}
									</a>
								</p>
							)}
						</section>
						<section>
							<h2>Hours</h2>
							<DayHours day="Sunday" hours={hours.sunday} />
							<DayHours day="Monday" hours={hours.monday} />
							<DayHours day="Tuesday" hours={hours.tuesday} />
							<DayHours day="Wednesday" hours={hours.wednesday} />
							<DayHours day="Thursday" hours={hours.thursday} />
							<DayHours day="Friday" hours={hours.friday} />
							<DayHours day="Saturday" hours={hours.saturday} />
						</section>
					</aside>
				</div>
			</Content>
		</>
	);
}

function DayHours({ day, hours }) {
	return (
		<div className={styles.hour}>
			<p>{day}</p>
			{hours.openTime ? (
				<p>
					{hours.openTime} - {hours.closeTime}
				</p>
			) : (
				<p>Closed</p>
			)}
		</div>
	);
}
