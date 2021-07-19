import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { signOut } from "next-auth/client";
import Image from "next/image";
import Link from "next/link";

const EditorHeader = ({ fileName, image }) => {
	return (
		<header className="flex justify-between items-center p-3 pb-1">
			<Link href="/">
				<a className="flex items-center mr-3">
					<Icon name="description" size="5xl" color="blue" />
				</a>
			</Link>
			<div className="flex-grow px-2">
				<h2>{fileName}</h2>
				<div className="hidden md:!flex items-center space-x-1 text-gray-600 text-sm -ml-1 h-8">
					<p className="option">File</p>
					<p className="option">Edit</p>
					<p className="option">Insert</p>
					<p className="option">View</p>
					<p className="option">Format</p>
					<p className="option">Tools</p>
				</div>
			</div>
			<div className="flex items-center">
				<Button
					color="blue"
					buttonType="filled"
					className="hidden md:inline-flex h-10 mr-4"
					size="regular"
					rounded={false}
					iconOnly={false}
					ripple="light">
					<Icon name="people" size="md" /> Share
				</Button>
				<Image
					src={image}
					alt="Picture of the user"
					width={35}
					height={35}
					className="cursor-pointer rounded-full ml-4"
					onClick={signOut}
				/>
			</div>
		</header>
	);
};

export default EditorHeader;
