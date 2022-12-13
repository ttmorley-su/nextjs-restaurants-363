import Link from "next/link";
import Image from "next/image";
import Content from "./content";
import styles from "./header.module.scss";
import brandSvg from "../public/syracuse-restaurants-logo.svg";

export default function Header() {
	return (
		<header className={styles.nav}>
			<Content className={styles.content}>
				<Link href="/" className={styles.brand}>
					<Image {...brandSvg} />
				</Link>
			</Content>
		</header>
	);
}
