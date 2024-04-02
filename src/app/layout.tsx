import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/provider";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
	title: "Un-newsletters",
	description:
		"An app that aims to help users unsubscribe from all those useless newsletters that they were subscribed to by accident.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={roboto.className}>
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
