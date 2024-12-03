import { useState } from 'react';
import { FieldProps } from 'formik';

interface CustomSelectProps extends FieldProps {
    options: string[];
    multiple?: boolean;
}

export default function CustomSelect({ field, form, options, multiple = false }: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false)

    // Toggle the dropdown open or closed
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Function to handle option selection
    const toggleOption = (option: string) => {
        if (multiple) {
            // Handle multiple selections by adding/removing the selected option
            const currentValues = field.value || [];
            const newValues = currentValues.includes(option)
                ? currentValues.filter((value: string) => value !== option)
                : [...currentValues, option];
            form.setFieldValue(field.name, newValues);
        } else {
            // Handle single selection and close the dropdown
            form.setFieldValue(field.name, option);
            setIsOpen(false)
        }
    }

    return (
      <div className="relative w-full">
          <div
              onClick={toggleDropdown}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm cursor-pointer"
          >
              {/* Display selected option or placeholder */}
                {multiple 
                    ? (field.value && field.value.length > 0 ? field.value.join(', ') : 'Sélectionner un ou plusieurs')
                    : field.value || 'Sélectionner'
                }

              {/* Icon arrow  */}
              <svg
                  className={`absolute right-3 top-3 h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
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
              <ul className="absolute top-full left-0 w-full max-h-60 overflow-y-auto bg-light-white border border-gray-300 rounded-md shadow-md z-10">
                 {/* Map through the options to display them in the dropdown */}
                 {options.map((option) => (
                 <li 
                    key={option}
                    className={`py-2 px-4 cursor-pointer hover:bg-gray-100 ${
                    multiple && field.value.includes(option) ? 'bg-gray-300' : ''
                    }`}
                    onClick={() => toggleOption(option)}
                 >
                    {option}
                  </li>
                 ))} 
              </ul>
          )}
      </div>
    );
}