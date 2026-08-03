import Image from "next/image";
import { notFound } from "next/navigation";
import { DUMMY_NEWS } from "@/dummy-news";

export default async function ImagePage({ params }) {
	const newsItemSlug = (await params).slug;
	const newsItem = DUMMY_NEWS.find(
		(newsItem) => newsItem.slug === newsItemSlug,
	);

	if (!newsItem) {
		notFound();
	}

	return (
		<div className="fullscreen-image">
			<Image src={`/images/news/${newsItem.image}`} alt={newsItem.title} fill/>
		</div>
	);
}
