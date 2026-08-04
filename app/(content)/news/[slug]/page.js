import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { getAllNews } from "@/lib/news";

export default function NewsDetailPage({ params }) {
	return (
		<article className="news-article">
			<Suspense fallback={<Loading />}>
				<FetchAndRenderNewsDetail params={params} />
			</Suspense>
		</article>
	);
}

async function FetchAndRenderNewsDetail({ params }) {
	const { slug } = await params;
	const news = await getAllNews();

	const newsItem = news.find((newsItem) => newsItem.slug === slug);

	if (!newsItem) {
		notFound();
	}
	return (
		<>
			<header>
				<Link
					href={`/news/${newsItem.slug}/image`}
					style={{
						display: "flex",
						justifyContent: "center",

						width: "80%",
						marginInline: "auto",
					}}
				>
					<Image
						src={`/images/news/${newsItem.image}`}
						alt={newsItem.title}
						width={300}
						height={400}
						style={{
							objectFit: "cover",
							width: "100%",
							height: "auto",
						}}
					/>
				</Link>
				<time dateTime={newsItem.date}>{newsItem.date}</time>
			</header>
			<p>{newsItem.content}</p>
		</>
	);
}
