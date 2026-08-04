import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { getAllNews } from "@/lib/news";

export default function ImagePage({ params }) {
	return (
		<div className="fullscreen-image">
			<Suspense fallback={<Loading />}>
				<FetchAndRenderImage params={params} />
			</Suspense>
		</div>
	);
}

async function FetchAndRenderImage({ params }) {
	const newsItemSlug = (await params).slug;
	const news = await getAllNews();
	const newsItem = news.find((newsItem) => newsItem.slug === newsItemSlug);

	if (!newsItem) {
		notFound();
	}

	return (
		<Image src={`/images/news/${newsItem.image}`} alt={newsItem.title} fill />
	);
}
