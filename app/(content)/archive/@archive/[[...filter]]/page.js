import Link from "next/link";
import { Suspense } from "react";
import Loading from "@/app/loading";
import NewsList from "@/components/news-list";
import {
	getAvailableNewsMonths,
	getAvailableNewsYears,
	getNewsForYear,
	getNewsForYearAndMonth,
} from "@/lib/news";

export default function FilteredNewsPage({ params }) {
	return (
		<>
			<header id="archive-header">
				<nav>
					<ul>
						<Suspense fallback={<Loading />}>
							<FetchAndRenderLinks params={params} />
						</Suspense>
					</ul>
				</nav>
			</header>
			<Suspense fallback={<Loading />}>
				<FetchAndRenderNews params={params} />
			</Suspense>
		</>
	);
}

async function FetchAndRenderLinks({ params }) {
	const { filter = [] } = await params;
	const [selectedYear, selectedMonth] = filter;

	let links = await getAvailableNewsYears();

	if (selectedYear && !selectedMonth) {
		links = await getAvailableNewsMonths(selectedYear);
	}

	if (selectedYear && selectedMonth) {
		links = [];
	}

	if (
		(selectedYear &&
			!(await getAvailableNewsYears()).includes(+selectedYear)) ||
		(selectedMonth &&
			!(await getAvailableNewsMonths(selectedYear)).includes(+selectedMonth))
	) {
		throw new Error("Invalid filter.");
	}

	return links.map((link) => {
		const href = selectedYear
			? `/archive/${selectedYear}/${link}`
			: `/archive/${link}`;

		return (
			<li key={link}>
				<Link href={href}>{link}</Link>
			</li>
		);
	});
}

async function FetchAndRenderNews({ params }) {
	const { filter = [] } = await params;
	const [selectedYear, selectedMonth] = filter;

	let news = [];
	let newsContent = <p>No news found for the selected period.</p>;

	if (selectedYear && !selectedMonth) {
		news = await getNewsForYear(selectedYear);
	}

	if (selectedYear && selectedMonth) {
		news = await getNewsForYearAndMonth(selectedYear, selectedMonth);
	}

	if (news && news.length > 0) {
		newsContent = <NewsList news={news} />;
	}

	return <>{newsContent}</>;
}
