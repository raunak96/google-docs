import Head from "next/head";
import PropTypes from "prop-types";

const Meta = ({ title, keywords, description }) => {
	return (
		<Head>
			<link
				rel="icon"
				href="https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico"
				type="image/x-icon"
			/>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1"
			/>
			<meta name="keywords" content={keywords.join(", ")} />
			<meta name="description" content={description} />
			<meta charSet="utf-8" />
			<meta property="og:title" content="Docsu: A Google docs clone" />
			<meta property="og:url" content="https://docsu.vercel.app/" />
			<meta property="og:ttl" content="604800" />
			<meta
				name="og:image"
				content="https://www.gstatic.com/images/branding/product/2x/docs_2020q4_48dp.png"
			/>
			<title>{title}</title>
		</Head>
	);
};
Meta.propTypes = {
	title: PropTypes.string.isRequired,
	keywords: PropTypes.array.isRequired,
	description: PropTypes.string.isRequired,
};
Meta.defaultProps = {
	title: "Google Docs",
	keywords: ["Web development", "NextJs", "SEO", "SSR", "TailwindCSS"],
	description:
		"Google Docs Clone with NextJs, Rich-Text-Editor, Firebase, NextAuth TailwindCss and Material Tailwind",
};

export default Meta;
