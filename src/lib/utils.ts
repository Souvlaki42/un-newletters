import { type ClassValue, clsx } from "clsx";
import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export type ChildrenProps = { children: ReactNode };

export type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
