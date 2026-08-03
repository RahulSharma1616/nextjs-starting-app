"use client";
import { useRouter } from "next/navigation";

export default function ModalBackdrop() {
	const router = useRouter();

	//  navigating back programatically

	return (
		// biome-ignore lint/a11y/useSemanticElements: //
		<div
			role="button"
			tabIndex={0}
			className="modal-backdrop"
			onClick={router.back}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					router.back();
				}
			}}
		/>
	);
}
