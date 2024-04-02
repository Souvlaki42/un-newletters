"use client";

import { type ChildrenProps } from "@/lib/utils";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { FC } from "react";
import NextTopLoader from "nextjs-toploader";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "./header";

export const ThemeProvider: FC<ThemeProviderProps> = ({
	children,
	...props
}) => {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export const Provider: FC<ChildrenProps> = ({ children }) => {
	return (
		<>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<NextTopLoader />
				<Header />
				<div className="container mx-auto">{children}</div>
				<SpeedInsights />
			</ThemeProvider>
		</>
	);
};
