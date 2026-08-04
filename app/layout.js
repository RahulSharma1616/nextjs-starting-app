import "@/app/globals.css";
import { getAllNews } from "@/lib/news";

export const metadata = {
	title: "Next.js Page Routing & Rendering",
	description: "Learn how to route to different pages.",
};

export default function MarketingLayout({ children }) {
	getAllNews();

	return (
		<html lang="en" className="hydrated">
			<body>{children}</body>
		</html>
	);
}
