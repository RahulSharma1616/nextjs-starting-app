import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DUMMY_NEWS } from "@/dummy-news";

export default async function NewsDetailPage({ params }) {
	const { slug } = await params;
	const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === slug);

	if (!newsItem) {
		notFound();
	}

	return (
		<article className="news-article">
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
						}}
					/>
				</Link>
				<time dateTime={newsItem.date}>{newsItem.date}</time>
			</header>
			<p>{newsItem.content}</p>
		</article>
	);
}
