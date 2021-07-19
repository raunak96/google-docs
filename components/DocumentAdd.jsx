import { useState } from "react";
import ConfirmModal from "./Modal";
import db from "../firebase";
import firebase from "firebase";
import { useRouter } from "next/router";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Image from "next/image";

const DocumentAdd = ({ email }) => {
	const [inputValue, setInputValue] = useState("");
	const [isOpenModal, setIsOpenModal] = useState(false);

	const router = useRouter();

	const createDocument = async () => {
		if (inputValue.trim() === "") return;

		const doc = await db
			.collection("userDocs")
			.doc(email)
			.collection("docs")
			.add({
				fileName: inputValue,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			});
		closeModal();
		router.push(`/doc/${doc.id}`);
	};
	const closeModal = () => {
		setInputValue("");
		setIsOpenModal(false);
	};

	return (
		<>
			<ConfirmModal
				isOpen={isOpenModal}
				inputValue={inputValue}
				setInputValue={setInputValue}
				body=" To create a new document, please enter the name of the document here. We will do the rest for you."
				onSubmit={createDocument}
				onClose={closeModal}
			/>
			<section className="bg-[#f1f3f4] pb-10 px-7 sm:!px-10">
				<div className="max-w-3xl mx-auto">
					<div className="py-6 flex items-center justify-between">
						<h2 className="text-gray-800 text-lg">
							Start a new Document
						</h2>
						<Button
							color="gray"
							buttonType="outline"
							ripple="dark"
							iconOnly={true}
							className="border-0 hover:!bg-[#bdc1c6] rounded-full">
							<Icon name="more_vert" size="3xl" />
						</Button>
					</div>
					<div>
						<div
							className="relative h-40 w-32 sm:!h-52 sm:!w-40 cursor-pointer border rounded hover:border-blue-600"
							onClick={() => setIsOpenModal(true)}>
							<Image
								src="/blank-doc.png"
								layout="fill"
								className="rounded active:opacity-50"
							/>
						</div>
						<p className="ml-2 mt-2 font-medium text-sm text-gray-800">
							Blank
						</p>
					</div>
				</div>
			</section>
		</>
	);
};

export default DocumentAdd;
