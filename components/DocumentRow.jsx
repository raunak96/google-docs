import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useRouter } from "next/router";
import { useState } from "react";
import db from "../firebase";
import ConfirmModal from "./Modal";

const DocumentRow = ({ doc, user }) => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	const deleteDocument = async () => {
		await db.doc(`userDocs/${user.email}/docs/${doc.id}`).delete();
	};
	return (
		<>
			<ConfirmModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title="Delete the Document?"
				body="Remember once you delete the document its gone. We do not store any copy of the document that you delete, we simply delete it from our database."
				buttonText="Delete"
				onSubmit={deleteDocument}
				isWarning={true}
			/>
			<div
				className="col-span-12 grid grid-cols-12 gap-x-3 items-center py-3 mt-2 rounded-lg cursor-pointer hover:bg-gray-100"
				onClick={() => router.push(`/doc/${doc.id}`)}>
				<h1 className="col-span-7 ml-2 md:!col-span-8 font-semibold truncate">
					{doc.fileName}
				</h1>
				<p className="col-span-3">{doc.timestamp}</p>
				<Button
					color="gray"
					buttonType="link"
					size="regular"
					rounded={true}
					block={false}
					iconOnly={true}
					ripple="dark"
					onClick={e => {
						e.stopPropagation();
						setIsOpen(true);
					}}>
					<Icon name="delete" size="3xl" />
				</Button>
			</div>
		</>
	);
};

export default DocumentRow;
