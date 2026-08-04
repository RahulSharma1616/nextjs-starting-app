import { Suspense } from "react";
import Loading from "@/app/loading";
import NewsList from "@/components/news-list";
import { getAllNews } from "@/lib/news";

export default function NewsPage() {
	return (
		<>
			<h1>News page</h1>
			<Suspense fallback={<Loading />}>
				<FetchAndRenderNews />
			</Suspense>
		</>
	);
}

async function FetchAndRenderNews() {
	const news = await getAllNews();

	return <NewsList news={news} />;
}
