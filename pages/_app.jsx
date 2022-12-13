import Footer from "@components/footer";
import Header from "@components/header";
import "@styles/main.scss";

export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<Header />
			<main>
				<Component {...pageProps} />
			</main>
			<Footer />
		</>
	);
}
