import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const Note = ({ note }) => {
	const {
		title,
		content,
		userTags = [],
		chartTags = [],
		updatedAt,
		category,
	} = note;
	return (
		<div className='bg-neutral p-4 text-base-100 rounded-box relative'>
			<FontAwesomeIcon
				icon={faEllipsisV}
				className='absolute top-4 right-4 text-gray-400 cursor-pointer'
			/>
			<h2 className='font-bold'>{title}</h2>
			<p>{content}</p>
			<div className='flex gap-1'>
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
