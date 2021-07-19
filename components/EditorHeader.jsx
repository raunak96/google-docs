import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import moment from "moment";
import { signOut } from "next-auth/client";
import Image from "next/image";
import Link from "next/link";

const EditorHeader = ({ fileName, image, lastUpdated, isSaved }) => {
	return (
		<header className="flex justify-between items-center p-3 pb-1">
			<Link href="/">
				<a className="flex items-center mr-3">
					<Icon name="description" size="5xl" color="blue" />
				</a>
			</Link>
			<div className="flex-grow px-2">
				<div className="flex space-x-5">
					<h2 className="text-lg font-bold">{fileName}</h2>
					<div className="text-gray-500 flex items-center">
						{isSaved !== "Saving ..." ? (
							<img
								src="/saved.svg"
								alt="Save Icon"
								className="h-5 w-5"
							/>
						) : (
							<Icon name="cached" size="regular" />
						)}
						<p className="ml-2">{isSaved}</p>
					</div>
				</div>
				<div className="hidden md:!flex items-center space-x-1 text-gray-600 text-sm -ml-1 h-8">
					<p className="option">File</p>
					<p className="option">Edit</p>
					<p className="option">Insert</p>
					<p className="option">View</p>
					<p className="option">Format</p>
					<p className="option">Tools</p>
					{lastUpdated && (
						<p className="text-gray-500 underline ml-3">
							Last edit was {moment(lastUpdated).calendar()}
						</p>
					)}
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
