import Image from "next/image";
import Link from "next/link";
import brandSvg from "../public/syracuse-restaurants-logo.svg";
import Content from "./content";
import styles from "./header.module.scss";

export default function Header() {
	return (
		<header className={styles.nav}>
			<Content className={styles.content}>
				<Link href="/" className={styles.brand}>
					<Image {...brandSvg} alt="Syracuse Restaurants logo" />
				</Link>
			</Content>
		</header>
	);
}
