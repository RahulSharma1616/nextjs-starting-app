export default function Loading() {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100%",
			}}
		>
			<div className="loading">
				<span>.</span>
				<span>.</span>
				<span>.</span>
			</div>
		</div>
	);
}
