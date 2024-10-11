import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { Trip } from '../../interfaces/TripProps/TripProps';

// Importing SVG icons for activities
import adventureIcon from '../../assets/activity/adventure.svg';
import cultureIcon from '../../assets/activity/culture.svg';
import familyIcon from '../../assets/activity/family.svg';
import gastronomyIcon from '../../assets/activity/gastronomy.svg';
import leisureIcon from '../../assets/activity/leisure.svg';
import natureIcon from '../../assets/activity/nature.svg';
import partyIcon from '../../assets/activity/party-and-bar.svg';
import relaxationIcon from '../../assets/activity/relaxation.svg';
import sportIcon from '../../assets/activity/sport.svg';

const TripCardContainer: React.FC<Trip> = ({
	title,
	destination,
	dateFrom,
	dateTo,
	description,
	budgetMin,
	budgetMax,
	media,
	activities,
}) => {
	const navigate = useNavigate();

	// Mapping activity types to their corresponding SVG icons
	const activityIcons: { [key: string]: string } = {
		adventure: adventureIcon,
		culture: cultureIcon,
		family: familyIcon,
		gastronomy: gastronomyIcon,
		leisure: leisureIcon,
		nature: natureIcon,
		party: partyIcon,
		relaxation: relaxationIcon,
		sport: sportIcon,
	};

	// Description is limited to 150 characters for display
	const maxDescriptionLength = 150;
	const truncatedDescription =
		description.length > maxDescriptionLength
			? description
					.substring(0, maxDescriptionLength)
					.trim()
					.split(' ')
					.slice(0, -1)
					.join(' ') + '...'
			: description;

	// Function to navigate to the trip details page
	const handleReadMore = () => {
		navigate(`/trip/${title}`);
	};

	// Divide activities into two rows for display
	const firstRowActivities = activities.slice(0, 3); // First 3 activities in the top row
	const secondRowActivities = activities.slice(3); // Remaining activities in the bottom row

	return (
		<Card
			className="w-full max-w-[30rem] shadow-lg rounded-lg flex flex-col justify-between"
			style={{ marginTop: '13px', minHeight: '128px' }} // Minimum card height is set
		>
			{/* Card header containing the trip image */}
			<CardHeader floated={false} className="relative h-60 -mt-8 mx-4">
				<img
					src={media}
					alt="Trip Image"
					onError={
						e => (e.currentTarget.src = 'https://via.placeholder.com/150') // Fallback image in case of an error
					}
					className="w-full h-full object-cover rounded-lg" // Ensures image is fully displayed with rounded corners
				/>
				<span className="absolute top-2 left-2 bg-black text-white text-xs px-3 py-1 rounded-md">
					Recommended
				</span>
				{/* Avatar image in the bottom right */}
				<img
					src="https://randomuser.me/api/portraits/women/44.jpg"
					alt="Avatar"
					className="w-12 h-12 rounded-full absolute bottom-2 right-2 border-2 border-white object-cover"
				/>
			</CardHeader>

			{/* Card body containing trip details and activities */}
			<CardBody className="p-4 flex-grow">
				<div className="flex items-start justify-between">
					{/* Title and destination section */}
					<div className="w-[70%]">
						<Typography
							variant="h5"
							color="blue-gray"
							className="mb-1 text-2xl"
						>
							{title.length > 45 ? title.slice(0, 45) : title}{' '}
							{/* Title is limited to 45 characters */}
						</Typography>
						<Typography color="gray" className="text-base">
							{destination}{' '}
							<span className="whitespace-nowrap">
								Du {new Date(dateFrom).toLocaleDateString()} au{' '}
								{new Date(dateTo).toLocaleDateString()}
							</span>
						</Typography>
					</div>

					{/* Activity icons section with two rows if necessary */}
					<div className="w-[30%]">
						{/* First row of activity icons */}
						<div className="flex justify-end gap-1">
							{firstRowActivities.map(activity => (
								<img
									key={activity.id}
									src={activityIcons[activity.type]}
									alt={activity.type}
									className="h-6"
								/>
							))}
						</div>
						{/* Second row of activity icons */}
						<div className="flex justify-end gap-1 mt-1">
							{secondRowActivities.map(activity => (
								<img
									key={activity.id}
									src={activityIcons[activity.type]}
									alt={activity.type}
									className="h-6"
								/>
							))}
						</div>
					</div>
				</div>

				{/* Trip description with the "voir plus" link if necessary */}
				<Typography color="gray" className="text-sm leading-relaxed mt-4">
					{truncatedDescription}
					{description.length > maxDescriptionLength && (
						<span
							className="text-blue-500 cursor-pointer"
							onClick={handleReadMore}
						>
							&nbsp;voir plus
						</span>
					)}
				</Typography>
			</CardBody>

			{/* Card footer displaying budget range */}
			<CardFooter className="flex justify-end items-center p-4 mt-auto">
				<div className="border border-[#185C22] text-[#185C22] px-3 py-1 rounded-md font-bold">
					{budgetMin} - {budgetMax} €
				</div>
			</CardFooter>
		</Card>
	);
};

export default TripCardContainer;
