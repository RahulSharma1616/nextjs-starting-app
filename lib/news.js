import { cache } from "react";

export const getAllNews = cache(async () => {
	const response = await fetch("http://localhost:8080/news", {
		next: {
			revalidate: 3600,
		},
	});

	await new Promise((resolve, _) =>
		setTimeout(() => {
			// console.log("==called");
			resolve();
		}, 2000),
	);

	if (!response.ok) {
		throw new Error("Failed to fetch news");
	}

	return await response.json();
});

export async function getLatestNews() {
	const news = await getAllNews();
	return news.slice(0, 3);
}

export async function getAvailableNewsYears() {
	const news = await getAllNews();

	return news
		.reduce((years, item) => {
			const year = new Date(item.date).getFullYear();

			if (!years.includes(year)) {
				years.push(year);
			}

			return years;
		}, [])
		.sort((a, b) => b - a);
}

export async function getAvailableNewsMonths(year) {
	const news = await getAllNews();

	return news
		.reduce((months, item) => {
			const newsYear = new Date(item.date).getFullYear();

			if (newsYear === +year) {
				const month = new Date(item.date).getMonth() + 1;

				if (!months.includes(month)) {
					months.push(month);
				}
			}

			return months;
		}, [])
		.sort((a, b) => b - a);
}

export async function getNewsForYear(year) {
	const news = await getAllNews();

	return news.filter((item) => new Date(item.date).getFullYear() === +year);
}

export async function getNewsForYearAndMonth(year, month) {
	const news = await getAllNews();

	return news.filter((item) => {
		const newsYear = new Date(item.date).getFullYear();
		const newsMonth = new Date(item.date).getMonth() + 1;

		return newsYear === +year && newsMonth === +month;
	});
}
