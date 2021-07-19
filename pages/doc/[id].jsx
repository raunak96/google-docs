import { getSession } from "next-auth/client";
import EditorHeader from "../../components/EditorHeader";
import Meta from "../../components/Meta";
import { useDocument } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import db from "../../firebase";
import TextEditor from "../../components/TextEditor";
import { useState } from "react";

const Doc = ({ session }) => {
	const router = useRouter();
	const [isSaved, setIsSaved] = useState("");
	const [snapshot, isLoading] = useDocument(
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
				lastUpdated={
					snapshot?.data()?.lastUpdated?.toDate()?.getTime() ?? ""
				}
				image={session.user.image}
				isSaved={isSaved}
			/>
			<TextEditor
				docId={router.query.id}
				email={session.user.email}
				setIsSaved={setIsSaved}
			/>
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
