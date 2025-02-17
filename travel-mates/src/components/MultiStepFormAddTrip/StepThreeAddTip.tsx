import { Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import getDestinationImages from '../../api/Unsplash';
import { useFormikContext } from 'formik';

interface ImageType {
	id: string;
	alt_description: string;
	urls: {
		small: string;
	};
	user: {
		first_name: string;
		last_name: string;
		links: {
			html: string;
		};
	};
}

interface Media {
	url: string;
	authorFirstName: string;
	authorLastName: string;
	authorProfilePicture: string;
}

export default function StepThree() {
	const { values, setFieldValue, errors, touched } =
		useFormikContext<{
			medias: Media[];
			destination: string;
		}>();

	const query: string = values.destination;

	// Fetch images from Unsplash API
	const { data, isLoading } = useQuery({
		queryKey: ['images', query],
		queryFn: () => getDestinationImages(query),
		enabled: true,
	});

	function handleSelect(image: ImageType) {
		const currentMedias = values.medias || [];
		const mediaExists = currentMedias.some(media => media.url === image.urls.small);

		if (mediaExists) {
			// Remove the media if it already exists
			setFieldValue(
				'medias',
				currentMedias.filter(media => media.url !== image.urls.small)
			);
		} else {
			// Add the new media
			const newMedia = {
				url: image.urls.small,
				authorFirstName: image.user.first_name || 'John',
				authorLastName: image.user.last_name || 'Doe',
				authorProfilePicture: image.user.links.html,
			};
			setFieldValue('medias', [...currentMedias, newMedia]);
		}
	}

	return (
		<>
			<Typography
				variant="h1"
				className="font-title text-2xl text-center mt-8 mb-8"
			>
				Ajouter des images
			</Typography>
			<Typography variant="lead" className="text-lg text-center m-8">
				Sélectionnez jusqu'à 3 images pour illustrer votre trip :
			</Typography>
			<div className="flex justify-center">
				{isLoading && <span>Loading...</span>}

				<div className="grid gap-4 md:grid-cols-3 grid-rows-3">
					{data &&
						data.data.results.map((image: ImageType) => (
							<button
								type="button"
								key={image.id}
								className="relative ms-6 me-6 aspect-[4/3] overflow-hidden"
								onClick={() => handleSelect(image)}
							>
								<div className="relative w-full h-full">
									<img
										src={image.urls.small}
										alt={image.alt_description}
										className={`rounded-lg object-cover w-full h-full ${values.medias.some(media => media.url === image.urls.small)
												? 'border-solid border-4 border-green'
												: ''
											}`}
									/>
									<div
										className="absolute bottom-0 right-0 left-0 p-2 bg-black bg-opacity-50 text-white text-xs rounded-b-lg break-words"
									>
										Photo prise par{' '}
										<a href={image.user.links.html} className="underline decoration-white">
											{image.user.first_name} {image.user.last_name}
										</a>{' '}
										sur{' '}
										<a href="https://unsplash.com" className="underline decoration-white">
											Unsplash
										</a>
									</div>
								</div>
							</button>
						))}
				</div>
			</div>
			{touched.medias && errors.medias && (
				<div className="text-red-500 text-center mb-4">
					{typeof errors.medias === 'string' ? (
						errors.medias
					) : (
						Object.values(errors.medias).join(', ')
					)}
				</div>
			)}
		</>
	);
}
