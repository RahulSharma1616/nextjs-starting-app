export default function Loading() {
	return (
		<div
			style={{
				position: "absolute",
				inset: 0,
				backgroundColor: "rgba(0, 0, 0, 0.4)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				zIndex: 100,
				backdropFilter: "blur(2px)",
			}}
		>
			<p
				style={{
					color: "white",
					fontSize: "1.25rem",
					fontWeight: "600",
				}}
			>
				Loading...
			</p>
		</div>
	);
}
