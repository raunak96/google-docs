import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { signOut } from "next-auth/client";
import Image from "next/image";
import Link from "next/link";

const Header = ({ image }) => {
	return (
		<header className="flex items-center sticky top-0 z-40 bg-white px-4 py-2 shadow-md">
			<Button
				color="gray"
				buttonType="outline"
				rounded={true}
				ripple="dark"
				className="!hidden md:!inline-block h-12 w-12 border-0 mr-4">
				<Icon name="menu" size="2xl" />
			</Button>
			<Link href="/">
				<a className="flex items-center">
					<Icon name="description" size="4xl" color="blue" />
				</a>
			</Link>
			<h1 className="hidden md:!inline-block ml-2 text-gray-700 text-xl">
				Docs
			</h1>

			<div className="mx-5 md:!mx-20 flex flex-1 items-center px-5 py-3 bg-gray-100 rounded-lg text-gray-600 focus-within:shadow-md focus-within:bg-white">
				<Icon name="search" size="2xl" color="gray" />
				<input
					type="text"
					placeholder="Search"
					className="bg-transparent outline-none pl-5 flex-1 text-base"
				/>
			</div>

			<Button
				color="gray"
				buttonType="outline"
				rounded={true}
				ripple="dark"
				className="!hidden md:!inline-block h-12 w-12 border-0 mx-5">
				<Icon name="apps" size="2xl" />
			</Button>

			<Image
				src={image}
				alt="Picture of the user"
				width={35}
				height={35}
				className="cursor-pointer rounded-full ml-2"
				onClick={signOut}
			/>
		</header>
	);
};

export default Header;
