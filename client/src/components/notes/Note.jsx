import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState, useEffect } from "react";

const Note = ({ note }) => {
	const [natalChartData, setNatalChartData] = useState(null);

	useEffect(() => {
		const fetchSavedCharts = async () => {
			try {
				const response = await axios.get(
					"http://localhost:3000/api/saved-charts"
				);
				const savedCharts = response.data;

				const matchingChart = savedCharts.find(
					(chart) => chart._id === note.natalChart
				);
				if (matchingChart) {
					setNatalChartData(matchingChart);
				}
			} catch (error) {
				console.error("Failed to fetch saved charts:", error);
			}
		};

		if (note.natalChart) {
			fetchSavedCharts();
		}
	}, [note]);

	const {
		title,
		content,
		userTags = [],
		chartTags = [],
		updatedAt,
		category,
		natalChart,
	} = note;

	return (
		<div className='bg-neutral p-4 text-base-100 rounded-box relative'>
			<FontAwesomeIcon
				icon={faEllipsisV}
				className='absolute top-4 right-4 text-gray-400 cursor-pointer'
			/>
			<h2 className='font-bold'>{title}</h2>
			<div className='h-32 max-h-32 overflow-hidden'>
				<p>{content}</p>
			</div>
			<div className='flex gap-1'>
				{natalChartData && (
					<span className='badge badge-ghost text-xs opacity-75 overflow-hidden whitespace-nowrap truncate'>
						{natalChartData.chartName}
					</span>
				)}
				{userTags.map(
					(tag, index) =>
						tag.trim() !== "" && (
							<span
								className='badge badge-ghost badge-outline text-xs opacity-75 overflow-hidden whitespace-nowrap truncate'
								key={index}
							>
								{tag}
							</span>
						)
				)}
			</div>
			<div>
				<p className='text-xs opacity-75'>
					Last edited: {new Date(updatedAt).toLocaleString()}
				</p>
			</div>
			<div
				className={`absolute bottom-4 right-4 rounded-full w-3 h-3 ${
					category === "positive"
						? "bg-success"
						: category === "neutral"
						? "bg-warning"
						: category === "negative"
						? "bg-error"
						: "bg-gray-300"
				}`}
			></div>{" "}
			{/* new div for category color */}
		</div>
	);
};

export default Note;
