import Header from "../components/Header";
import { getSession } from "next-auth/client";
import db from "../firebase";
import DocumentList from "../components/DocumentList";
import DocumentAdd from "../components/DocumentAdd";

export default function Home({ session, initialDocs }) {
	return (
		<>
			<Header image={session?.user?.image} />
			<DocumentAdd email={session.user.email} />
			<DocumentList initialDocs={initialDocs} user={session.user} />
		</>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);
	if (!session)
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	const docsSnapshot = await db
		.collection(`userDocs/${session.user.email}/docs`)
		.orderBy("timestamp", "desc")
		.get();

	const initialDocs = docsSnapshot.docs.map(doc => ({
		id: doc.id,
		...doc.data(),
		timestamp: doc.data().timestamp.toDate().toDateString(),
	}));
	return {
		props: { session, initialDocs },
	};
}
