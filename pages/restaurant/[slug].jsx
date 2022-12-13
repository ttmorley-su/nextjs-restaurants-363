import { getAllRestaurantSlugs, getRestaurant } from "@lib/api";
import Showcase from "@components/showcase";
import styles from "./[slug].module.scss";
import Content from "@components/content";
import Button from "@components/button";
import MenuItem from "@components/menu_item";

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
    console.log(props);
    let type = props.restaurantTypes?.nodes[0]?.name;
    let fields = props.restaurantFields ?? {};
	const menuItems = props.menuItems?.menuItems ?? [];
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
                            {menuItems.length ? 
								menuItems.map((item) => <MenuItem {...item.menuItem} />) 
								: <p>This restaurant doesn't seem to have any items...</p>
							}
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
                            <iframe
                                src={fields.map}
                                className={styles.map}
                                width="600" height="450" allowFullScreen="" loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"></iframe>
                            <div>
								{fields.address?.split("\n")?.map((text) => <p>{text}</p>)}
							</div>
                        </section>

                        <section>
                            <h2>Contact</h2>
							{fields.phoneNumber && <p><a href={`tel:${fields.phoneNumber}`}>{fields.phoneNumber}</a></p>}
							{fields.email && <p><a href={`mailto:${fields.email}`}>{fields.email}</a></p>}
                        </section>
                        <section>
                            <h2>Hours</h2>
                            <div className={styles.hour}><p>Sunday</p> <p>{fields.hoursSunday}</p></div>
                            <div className={styles.hour}><p>Monday</p> <p>{fields.hoursMonday}</p></div>
                            <div className={styles.hour}><p>Tuesday</p> <p>{fields.hoursTuesday}</p></div>
                            <div className={styles.hour}><p>Wednesday</p> <p>{fields.hoursWednesday}</p></div>
                            <div className={styles.hour}><p>Thursday</p> <p>{fields.hoursThursday}</p></div>
                            <div className={styles.hour}><p>Friday</p> <p>{fields.hoursFriday}</p></div>
                            <div className={styles.hour}><p>Saturday</p> <p>{fields.hoursSaturday}</p></div>
                        </section>
                    </aside>
                </div>
            </Content>
        </>
    )
}
