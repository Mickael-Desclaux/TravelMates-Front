import { useState } from 'react';
import { FieldProps } from 'formik'; // Importer FieldProps pour connecter Formik

export default function CustomSelect({ field, form }: FieldProps) {
    const [isOpen, setIsOpen] = useState(false); // Gérer l'ouverture/fermeture du menu

    // Get selected option from Formik
    const selectedOption = field.value;

    // Function to toggle dropdown menu
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Function to select an option
    const selectOption = (option: string) => {
        form.setFieldValue(field.name, option);
        setIsOpen(false);
    };

    return (
      <div className="relative w-full max-w-[375px]">
          <div
              onClick={toggleDropdown}
              className={`block w-full p-2 border border-gray-300 rounded-md shadow-sm cursor-pointer relative ${form.errors[field.name] && form.touched[field.name] ? 'border-red-500' : ''
                  }`}
          >
              {/* Display selected option or placeholder */}
              {selectedOption || 'Sélectionner'}

              {/* Icon arrow  */}
              <svg
                  className={`absolute right-3 top-3 h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                  />
              </svg>
          </div>

          {/* Option list */}
          {isOpen && (
              <ul className="absolute top-[-120px] left-0 w-full bg-white border border-gray-300 rounded-md shadow-md z-10">
                  <li onClick={() => selectOption('Femme')} className="p-2 hover:bg-gray-100 cursor-pointer" >
                      Femme
                  </li>
                  <li onClick={() => selectOption('Homme')} className="p-2 hover:bg-gray-100 cursor-pointer" >
                      Homme
                  </li>
                  <li onClick={() => selectOption('Autre')} className="p-2 hover:bg-gray-100 cursor-pointer" >
                      Autre
                  </li>
              </ul>
          )}
      </div>
    );
}