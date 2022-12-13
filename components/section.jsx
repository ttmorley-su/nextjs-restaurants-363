import Content from "./content";

export default function Section({ className, children, id, ...rest }) {
	return (
		<section id={id} className={className} {...rest}>
			<Content>{children}</Content>
		</section>
	);
}
