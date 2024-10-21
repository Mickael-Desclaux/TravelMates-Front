import { Typography } from '@material-tailwind/react';
import { Field, ErrorMessage, useFormikContext } from 'formik';
import uploadIcon from '../../assets/icons/up-loading.png';
import CustomSelect from '../CustomSelect/CustomSelect';
 
export default function SignUpStepTwo() { 

  const { setFieldValue } = useFormikContext();
  
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    setFieldValue('profilePicture', selectedFile);
    e.preventDefault();
    console.log(selectedFile);
  };

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
              Prénom
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
              Nom
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
              Date de naissance
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
              Genre
            </Typography>
          </label>
          <Field name="gender" component={CustomSelect} />
          <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <div className="mb-6">
          <label htmlFor="address">
            <Typography
              variant="h6"
              className="mb-2 block font-large text-black-900"
            >
              Adresse
            </Typography>
          </label>
          <Field
            id="address"
            name="address"
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
          <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <div className="mb-2">
          <label htmlFor="profilePicture">
            <Typography
              variant="h6"
              className="mb-2 block font-large text-black-900"
            >
              Ajouter une photo de profile
            </Typography>
          </label>
          <div className="relative">
          <input
            id="profilePicture"
            name="profilePicture"
            type="file"
            onChange={ handleFileChange }
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