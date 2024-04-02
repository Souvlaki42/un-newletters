import {
	Table,
	TableBody,
	// TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { type Newsletter } from "@/lib/data";
import { type FC } from "react";

export const NewsletterTable: FC<{ newsletters: Newsletter[] }> = ({
	newsletters,
}) => {
	return (
		<Table>
			{/* <TableCaption>A list of your newsletter subscriptions.</TableCaption> */}
			<TableHeader>
				<TableRow>
					<TableHead>Email</TableHead>
					<TableHead>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{newsletters.map((newsletter) => (
					<TableRow key={newsletter.id}>
						<TableCell>{newsletter.email}</TableCell>
						<TableCell>Unsubscribe</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
