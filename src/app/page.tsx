import { NewsletterTable } from "@/components/newsletter-table";
import { newsletters } from "@/lib/data";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<NewsletterTable newsletters={newsletters} />
		</main>
	);
}
