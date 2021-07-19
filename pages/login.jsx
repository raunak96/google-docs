import Button from "@material-tailwind/react/Button";
import { getProviders, getSession, signIn } from "next-auth/client";
import Image from "next/image";
import Meta from "../components/Meta";

const Login = ({ providers }) => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center">
			<Meta title="Login | Google Docs" />
			<Image
				src="/app-logo.png"
				height="300"
				width="550"
				objectFit="contain"
			/>
			{Object.values(providers).map(provider => (
				<Button
					key={provider.id}
					color="blue"
					buttonType="filled"
					size="lg"
					rounded={true}
					ripple="light"
					onClick={() => signIn(provider.id)}
					className="mt-4">
					Login with {provider.name}
				</Button>
			))}
		</div>
	);
};

export default Login;

export async function getServerSideProps(context) {
	const session = await getSession(context);
	if (session) return { redirect: { destination: "/" } };

	const providers = await getProviders();
	return {
		props: { providers },
	};
}
