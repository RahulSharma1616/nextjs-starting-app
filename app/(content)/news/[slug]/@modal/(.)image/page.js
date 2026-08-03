import Image from "next/image";
import { notFound } from "next/navigation";
import { DUMMY_NEWS } from "@/dummy-news";
import ModalBackdrop from "./modal-backdrop";

export default async function InterceptedImagePage({ params }) {
	const newsItemSlug = (await params).slug;
	const newsItem = DUMMY_NEWS.find(
		(newsItem) => newsItem.slug === newsItemSlug,
	);

	if (!newsItem) {
		notFound();
	}

	return (
		<>
			<ModalBackdrop />

			<dialog className="modal" open>
				<div className="fullscreen-image">
					<Image
						src={`/images/news/${newsItem.image}`}
						alt={newsItem.title}
						fill
						sizes=""
					/>
				</div>
			</dialog>
		</>
	);
}
