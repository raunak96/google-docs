import Icon from "@material-tailwind/react/Icon";
import { useCollection } from "react-firebase-hooks/firestore";
import db from "../firebase";
import DocumentRow from "./DocumentRow";

const DocumentList = ({ initialDocs, user }) => {
	const [snapshot] = useCollection(
		db
			.collection("userDocs")
			.doc(user.email)
			.collection("docs")
			.orderBy("timestamp", "desc")
	);
	return (
		<section className="bg-white px-7 sm:!px-10 py-5">
			<div className="max-w-3xl mx-auto grid grid-cols-12 items-center gap-x-4 text-sm text-gray-700">
				<h2 className="col-span-7 md:!col-span-8 font-semibold">
					My Documents
				</h2>
				<p className="col-span-3">Date Created</p>
				<Icon
					name="folder"
					size="3xl"
					color="gray"
					className="col-span-2 md:!col-span-1"
				/>
				<hr className="col-span-12 my-2 w-full bg-gray-400" />
				{snapshot
					? snapshot?.docs?.map(doc => (
							<DocumentRow
								key={doc.id}
								doc={{
									id: doc.id,
									...doc.data(),
									timestamp: doc
										.data()
										.timestamp?.toDate()
										?.toDateString(),
									lastUpdated: doc
										.data()
										.lastUpdated?.toDate()
										?.toDateString(),
								}}
								user={user}
							/>
					  ))
					: initialDocs.map(doc => (
							<DocumentRow
								key={doc.id}
								doc={{
									...doc,
								}}
								user={user}
							/>
					  ))}
			</div>
		</section>
	);
};

export default DocumentList;
