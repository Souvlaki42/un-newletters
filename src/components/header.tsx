import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export const Header = () => {
	return (
		<header className="container mx-auto my-8 flex justify-between items-center">
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				<Link href={"/"}>Un-newsletters</Link>
			</h1>
			<ThemeToggle />
		</header>
	);
};
