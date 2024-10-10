import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { Trip } from '../interfaces/TripProps';

// Importing SVG icons
import adventureIcon from '../assets/activity/adventure.svg';
import cultureIcon from '../assets/activity/culture.svg';
import familyIcon from '../assets/activity/family.svg';
import gastronomyIcon from '../assets/activity/gastronomy.svg';
import leisureIcon from '../assets/activity/leisure.svg';
import natureIcon from '../assets/activity/nature.svg';
import partyIcon from '../assets/activity/party-and-bar.svg';
import relaxationIcon from '../assets/activity/relaxation.svg';
import sportIcon from '../assets/activity/sport.svg';

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

	// Mapping activity types to SVG icons
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

	// Limite de caractères pour tronquer le texte à 150 caractères
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

	// Fonction pour rediriger vers la page de détails
	const handleReadMore = () => {
		navigate(`/trip/${title}`);
	};

	// Diviser les activités pour gérer l'affichage en lignes
	const firstRowActivities = activities.slice(0, 3); // Les 3 premières activités
	const secondRowActivities = activities.slice(3); // Les 3 activités suivantes

	return (
		<Card
			className="w-full max-w-[30rem] shadow-lg rounded-lg flex flex-col justify-between"
			style={{ marginTop: '13px', minHeight: '128px' }}
		>
			<CardHeader floated={false} className="relative h-60 -mt-8 mx-4">
				<img
					src={media}
					alt="Trip Image"
					onError={e =>
						(e.currentTarget.src = 'https://via.placeholder.com/150')
					}
					className="w-full h-full object-cover rounded-lg"
				/>
				<span className="absolute top-2 left-2 bg-black text-white text-xs px-3 py-1 rounded-md">
					Recommended
				</span>
				<img
					src="https://randomuser.me/api/portraits/women/44.jpg"
					alt="Avatar"
					className="w-12 h-12 rounded-full absolute bottom-2 right-2 border-2 border-white object-cover"
				/>
			</CardHeader>

			<CardBody className="p-4 flex-grow">
				<div className="flex items-start justify-between">
					<div className="w-[70%]">
						<Typography
							variant="h5"
							color="blue-gray"
							className="mb-1 text-2xl"
						>
							{title.length > 45 ? title.slice(0, 45) : title}{' '}
							{/* Limitation à 45 caractères */}
						</Typography>
						<Typography color="gray" className="text-base">
							{destination}{' '}
							<span className="whitespace-nowrap">
								Du {new Date(dateFrom).toLocaleDateString()} au{' '}
								{new Date(dateTo).toLocaleDateString()}
							</span>
						</Typography>
					</div>

					{/* Activity icons layout */}
					<div className="w-[30%]">
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

			<CardFooter className="flex justify-end items-center p-4 mt-auto">
				<div className="border border-[#185C22] text-[#185C22] px-3 py-1 rounded-md font-bold">
					{budgetMin} - {budgetMax} €
				</div>
			</CardFooter>
		</Card>
	);
};

export default TripCardContainer;
