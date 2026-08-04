import { Suspense } from "react";
import Loading from "@/app/loading";
import NewsList from "@/components/news-list";
import { getLatestNews } from "@/lib/news";

export default function Default() {
	return (
		<>
			<h1>Latest News</h1>
			<Suspense fallback={<Loading />}>
				<RenderNews />
			</Suspense>
		</>
	);
}

async function RenderNews() {
	const latestNews = await getLatestNews();

	return <NewsList news={latestNews} />;
}
