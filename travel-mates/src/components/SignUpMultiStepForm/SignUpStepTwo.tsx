import { Typography } from '@material-tailwind/react';
import { Field, ErrorMessage, useFormikContext } from 'formik';
import uploadIcon from '/icons/up-loading.png';
import CustomSelect from '../CustomSelect/CustomSelect';
import { useState } from 'react';
import { fetchSuggestions } from '../../api/Mapbox';
import { Suggestion } from '../../interfaces/FormInterfaces/FormInterfaces';
 
export default function SignUpStepTwo() { 

  const { setFieldValue } = useFormikContext();
  
  // Handle the file input change event to store the selected profile picture in Formik's form state
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    setFieldValue('profilePicture', selectedFile);
    e.preventDefault();
  };

  const fetchSuggestionsFromAPI = async (query: string) => {
		try {
			const suggestions = await fetchSuggestions(query.toUpperCase());
			const formattedSuggestions = suggestions.map(
				(suggestion: Suggestion) => ({
					name: suggestion.name,
					context: suggestion.context,
					country: suggestion.context.country,
					country_name: suggestion.context.country.name,
				}),
			);
			setSuggestions(formattedSuggestions);
		} catch (error) {
			console.error('Error fetching suggestions from Mapbox API:', error);
		}
	};

  const handleAddressChange = (value: string, setFieldValue: (field: string, value: string) => void) => {
		setFieldValue('address', value);

        if (value.trim() === '') {
            setSuggestions([]);
            return;
        }

        fetchSuggestionsFromAPI(value);
	}

  // List of gender options for the custom select dropdown
  const listOptionsGender = [
    'Femme',
    'Homme',
    'Autres'];

  // List of language options for the custom select dropdown (multi select)
  const listOptionsLanguage = [
    'Allemand',
    'Anglais',
    'Arabe',
    'Espagnol',
    'Français',
    'Grec',
    'Italien',
    'Mandarin',
    'Néerlandais',
    'Polonais',
    'Portugais',
    'Russe',
  ];

	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  return (
    <>
      <div className="mx-auto mt-8 max-w-[24rem] text-left">
        <Typography variant="h1" className="mb-4 text-center text-2xl font-title">
          Vos informations
        </Typography>
        <div className="mb-6">
          <label htmlFor="firstName">
            <Typography
              variant="h6"
              className="mb-2 block font-large text-black-900"
            >
              Prénom*
            </Typography>
          </label>
          <Field
            id="firstName"
            name="firstName"
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
          <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <div className="mb-6">
          <label htmlFor="lastName">
            <Typography
              variant="h6"
              className="mb-2 block font-large text-black-900"
            >
              Nom*
            </Typography>
          </label>
          <Field
            id="lastName"
            name="lastName"
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
          <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <div className="mb-6">
          <label htmlFor="birthDate">
            <Typography
              variant="h6"
              className="mb-2 block font-large text-black-900"
            >
              Date de naissance*
            </Typography>
          </label>
          <Field
            id="birthDate"
            name="birthDate"
            type="date"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
          <ErrorMessage name="birthDate" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <div className="mb-6">
          <label htmlFor="gender">
            <Typography
              variant="h6"
              className="mb-2 block font-large text-black-900"
            >
              Genre*
            </Typography>
          </label>
          <Field 
            name="gender"
            component={CustomSelect}
            options={listOptionsGender} 
          />
          <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <div className="mb-6">
          <label htmlFor="address">
            <Typography
              variant="h6"
              className="mb-2 block font-large text-black-900"
            >
              Adresse*
            </Typography>
          </label>
          <Field
            id="address"
            name="address"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAddressChange(e.target.value, setFieldValue)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
          <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
        </div>

        {suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-200 mt-1 w-full max-h-40 overflow-y-auto">
            {suggestions.map((suggestion: Suggestion, index: number) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setFieldValue(
                    'address',
                    suggestion.name +
                    ', ' +
                    suggestion.context.country.name,
                  );
                  setSuggestions([]);
                }}
              >
                {suggestion.name ? suggestion.name : 'Unknown'},{' '}
                {suggestion.context && suggestion.context.country
                  ? suggestion.context.country.name
                  : 'Unknown'}
              </li>
            ))}
          </ul>
        )}

        <div className="mb-6">
          <label htmlFor="language">
            <Typography
              variant="h6"
              className="mb-2 block font-large text-black-900"
            >
              Langue*
            </Typography>
          </label>
          <Field 
            name="language"
            component={CustomSelect}
            options={listOptionsLanguage}
            multiple={true}
          />
          <ErrorMessage name="language" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <div className="mb-2">
          <label htmlFor="profilePicture">
            <Typography
              variant="h6"
              className="mb-2 block font-large text-black-900"
            >
              Ajouter une photo de profil*
            </Typography>
          </label>
          <div className="relative">
            <input
              id="profilePicture"
              name="profilePicture"
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
            {/* Upload icon */}
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <img src={uploadIcon} alt="upload" className="w-4 h-4" />
            </div>
          </div>
          <ErrorMessage name="profilePicture" component="div" className="text-red-500 text-sm mt-1" />
        </div>
      </div>
    </>
  );
}