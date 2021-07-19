import "tailwindcss/tailwind.css";
import "@material-tailwind/react/tailwind.css";
import { Provider } from "next-auth/client";
import Meta from "../components/Meta";
import "../styles.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		router.events.on("routeChangeStart", () => setLoading(true));
		router.events.on("routeChangeComplete", () => setLoading(false));

		return () => {
			router.events.off("routeChangeStart");
			router.events.off("routeChangeComplete");
		};
	}, []);
	return (
		<Provider session={pageProps.session}>
			<Meta />
			{loading && (
				<div className="absolute top-0 left-0 w-full z-50">
					<div className="overflow-hidden h-1 mb-4 text-xs flex rounded bg-blue-200">
						<div className="animate-progress shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
					</div>
				</div>
			)}
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
