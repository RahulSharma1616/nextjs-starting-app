import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getAllNews } from "@/lib/news";
import ModalBackdrop from "./modal-backdrop";
import Loading from "@/app/loading";

export default function InterceptedImagePage({ params }) {
	return (
		<>
			<ModalBackdrop />

			<dialog className="modal" open>
				<div className="fullscreen-image">
					<Suspense fallback={<Loading />}>
						<FetchAndRenderImage params={params} />
					</Suspense>
				</div>
			</dialog>
		</>
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
		<Image
			src={`/images/news/${newsItem.image}`}
			alt={newsItem.title}
			fill
			sizes=""
		/>
	);
}
