import Link from "next/link";
import classNames from "classnames/bind";
import styles from "./button.module.scss";

const cx = classNames.bind(styles);

export default function Button({ href, kind, variant, children, ...props }) {
	let className = cx({
		button: true,
		primary: kind === "primary",
		secondary: kind === "secondary",
		outline: variant === "outline",
		filled: variant === "filled",
	});
	if (href) {
		return (
			<Link className={className} href={href} {...props}>
				{children}
			</Link>
		);
	}
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
}
