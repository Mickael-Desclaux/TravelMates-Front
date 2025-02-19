import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
} from '@material-tailwind/react';
import { NavLink } from 'react-router-dom';
import { Trip } from '../../interfaces/TripProps/TripProps';

const TripCardContainer: React.FC<Trip> = ({
	id,
	title,
	destination,
	date_from,
	date_to,
	description,
	budget_min,
	budget_max,
	tripUnsplashImage,
	tripActivities,
	owner
}) => {

	// Description is limited to 150 characters for display
	const maxDescriptionLength = 150;
	const truncatedDescription =
		description && description.length > maxDescriptionLength
			? description
				.substring(0, maxDescriptionLength)
				.trim()
				.split(' ')
				.slice(0, -1)
				.join(' ') + '...'
			: description;

	// Divide tripActivities into two rows for display
	const firstRowActivities = tripActivities.slice(0, 3); // First 3 tripActivities in the top row
	const secondRowActivities = tripActivities.slice(3); // Remaining tripActivities in the bottom row

	return (
		<Card className="w-full bg-light-white mt-6 max-w-[30rem] shadow-lg rounded-lg flex flex-col justify-between">
			{/* Card header containing the trip image */}
			<CardHeader floated={false} className="relative h-60 -mt-8 mx-4">
				<NavLink to={`/trip-detail/${id.toString()}`}>
					<img
						src={tripUnsplashImage[0]?.url}
						alt={title}
						className="w-full h-full object-cover rounded-lg" // Ensures image is fully displayed with rounded corners
					/>
				</NavLink>
				{/* Avatar image in the bottom right */}
				<img
					src={`${import.meta.env.VITE_API_BASE_URL}${owner.profile.media.url}`}
					alt="Photo de profile"
					className="w-12 h-12 rounded-full absolute bottom-2 right-2 border-2 border-white object-cover"
				/>
			</CardHeader>

			{/* Card body containing trip details and activities */}
			<CardBody className="p-4 flex-grow">
				<div className="flex items-start justify-between">
					{/* Title and destination section */}
					<div className="w-[70%]">
						<NavLink to={"/trip-detail"}>
							<Typography variant="h5" color="black" className="lg:w-4/5 mb-1 text-xl font-bold">
								{title.length > 45 ? title.slice(0, 45) : title}{' '}
							</Typography>
						</NavLink>
						<Typography variant="h6" className="font-normal text-gray-800 font-bold">
							{destination}{' '}
						</Typography>
						<Typography variant="h6" color="gray" className="text-gray-800 whitespace-nowrap font-bold">
							Du {new Date(date_from).toLocaleDateString()} au{' '}
							{new Date(date_to).toLocaleDateString()}
						</Typography>
					</div>

					{/* Activity icons section with two rows if necessary */}
					<div className="w-8">
						{/* First row of activity icons */}
						<div className="flex justify-end gap-1">
							{firstRowActivities.map((activity, index) => (
								<img
									key={index}
									src={`/activity/${activity.activity.toLowerCase()}.svg`}
									alt={activity.activity}
								/>
							))}
						</div>
						{/* Second row of activity icons */}
						<div className="flex justify-end gap-1 mt-1">
							{secondRowActivities.map((activity, index) => (
								<img
									key={index}
									src={`/activity/${activity.activity.toLowerCase()}.svg`}
									alt={activity.activity}
								/>
							))}
						</div>
					</div>
				</div>

				{/* Trip description with the "voir plus" link if necessary */}
				<Typography color="black" className="text-sm leading-relaxed mt-4 font-normal">
					{truncatedDescription}
					{description.length > maxDescriptionLength && (
						<NavLink
							className="text-blue-500 cursor-pointer" to={'/trip-detail'}>
							&nbsp;voir plus
						</NavLink>
					)}
				</Typography>
			</CardBody>

			{/* Card footer displaying budget range */}
			<CardFooter className="flex justify-end items-center p-4 mt-auto">
				<div className="border border-[#185C22] text-[#185C22] px-3 py-1 rounded-md font-bold shadow-md">
					{budget_min} - {budget_max} €
				</div>
			</CardFooter>
		</Card>
	);
};

export default TripCardContainer;
