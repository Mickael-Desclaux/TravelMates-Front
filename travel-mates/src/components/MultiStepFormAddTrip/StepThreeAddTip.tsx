import { Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import getDestinationImages from '../../api/Unsplash';
import { useFormikContext } from 'formik';

// Define the ImageType interface here
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

export default function StepThree() {
	const { values, setFieldValue, errors, touched } =
		useFormikContext<{
			urls: string[];
		}>();

	const query: string = 'Paris';

	// Fetch images from Unsplash API
	const { data, isLoading, isError } = useQuery({
		queryKey: ['images', query],
		queryFn: () => getDestinationImages(query),
		enabled: true,
	});

	// Handle selection/deselection of images
	function handleSelect(url: string) {
		const currentUrls = values.urls;
		if (currentUrls.includes(url)) {
			setFieldValue(
				'urls',
				currentUrls.filter(u => u !== url),
			);
		} else {
			setFieldValue('urls', [...currentUrls, url]);
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
				{/* Supprimé <form>, remplacé par un simple conteneur */}
				{isLoading && <span>Loading...</span>}
				{isError && <span>Erreur</span>}

				{touched.urls && errors.urls ? (
					<div className="text-red-900 text-center -mt-4 mb-6">
						{errors.urls}
					</div>
				) : null}

				<div className="grid gap-4 md:grid-cols-3 grid-rows-3">
					{data &&
						data.data.results.map((image: ImageType) => (
							<button
								type="button"
								key={image.id}
								className="relative ms-6 me-6"
								onClick={() => handleSelect(image.urls.small)}
							>
								<img
									src={image.urls.small}
									alt={image.alt_description}
									className={`rounded-lg h-full ${
										values.urls.includes(image.urls.small)
											? 'border-solid border-4 border-green'
											: ''
									}`}
								/>
								<span
									className="absolute bottom-2 right-2 bg-black text-white text-xs px-3 py-1 rounded-md"
									style={{ zIndex: 1 }}
								>
									Photo prise par{' '}
									<a href={image.user.links.html} className="underline">
										{image.user.first_name} {image.user.last_name}
									</a>{' '}
									sur{' '}
									<a href="https://unsplash.com" className="underline">
										Unsplash
									</a>
								</span>
							</button>
						))}
				</div>
			</div>
		</>
	);
}
