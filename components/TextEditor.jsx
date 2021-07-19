import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import debounce from "lodash/debounce";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import db from "../firebase";
import firebase from "firebase";

// Imported dynamically as this lib only available on browser and depends on windows obj, therefore dynamically loaded it with ssr false i.e this lib not imported during server side rendering
const Editor = dynamic(
	async () => {
		const { Editor } = await import("react-draft-wysiwyg");
		return Editor;
	},
	{
		ssr: false,
	}
);

const TextEditor = ({ docId, email, setIsSaved }) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());

	const [snapshot, isLoading] = useDocumentOnce(
		db.doc(`userDocs/${email}/docs/${docId}`)
	);

	useEffect(() => {
		if (snapshot?.data().editorState) {
			setEditorState(
				EditorState.createWithContent(
					convertFromRaw(snapshot.data().editorState)
				)
			);
		}
	}, [snapshot]);

	const editDocInDb = useMemo(
		() =>
			debounce(async editorState => {
				await db.doc(`userDocs/${email}/docs/${docId}`).set(
					{
						editorState: convertToRaw(
							editorState.getCurrentContent()
						),
						lastUpdated:
							firebase.firestore.FieldValue.serverTimestamp(),
					},
					{ merge: true }
				);
				setIsSaved("Saved");
			}, 3000),
		[]
	);

	const handleEditorStateChange = editorState => {
		setIsSaved("Saving ...");
		setEditorState(editorState);
		editDocInDb(editorState);
	};
	return (
		<div className="bg-[#F8F9FA] min-h-screen pb-16">
			{!isLoading && (
				<Editor
					editorState={editorState}
					onEditorStateChange={handleEditorStateChange}
					toolbarClassName="sticky top-0 z-50 !justify-center"
					editorClassName="bg-white mt-6 shadow-lg w-3/4 lg:w-3/5 mx-auto p-10 border mb-10 min-h-screen"
				/>
			)}
		</div>
	);
};

export default TextEditor;
