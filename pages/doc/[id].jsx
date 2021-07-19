import { getSession } from "next-auth/client";
import EditorHeader from "../../components/EditorHeader";
import Meta from "../../components/Meta";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import db from "../../firebase";
import TextEditor from "../../components/TextEditor";

const Doc = ({ session }) => {
	const router = useRouter();
	const [snapshot, isLoading] = useDocumentOnce(
		db.doc(`userDocs/${session.user.email}/docs/${router.query.id}`)
	);

	// Only owner of file will have access to fileName as it is queried using logged in user's email
	if (!isLoading && !snapshot?.data()?.fileName) router.replace("/");
	return (
		<div>
			<Meta
				title={
					snapshot
						? `${snapshot.data().fileName} - Google Docs`
						: `Google Docs`
				}
			/>
			<EditorHeader
				fileName={snapshot?.data()?.fileName ?? "Loading.."}
				image={session.user.image}
			/>
			<TextEditor docId={router.query.id} email={session.user.email} />
		</div>
	);
};

export default Doc;

export async function getServerSideProps(context) {
	const session = await getSession(context);
	if (!session) return { redirect: { destination: "/login" } };
	return {
		props: { session },
	};
}
