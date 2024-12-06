import { useState } from "react";
import { Field, ErrorMessage } from "formik";
import EyeClose from "../../assets/icons/eyes-close.svg";
import EyeOpen from "../../assets/icons/eyes-open.svg";

interface PasswordFieldProps {
  name: string;
  id: string;
  placeholder: string;
  label: string;
}

export const PasswordField = ({ name, id, placeholder, label }: PasswordFieldProps) => {
  const [isVisible, setVisible] = useState(false);

  const handleToggle = () => {
    setVisible(!isVisible);
  };

  return (
    <div className="mb-6 relative">
      <label htmlFor={id} className="mb-2">
        <span className="font-semibold">{label}</span>
      </label>
      <div className="relative w-full">
        <Field
          name={name}
          id={id}
          type={isVisible ? "text" : "password"}
          placeholder={placeholder}
          className="border p-2 mt-2 rounded w-full"
        />
        
        <button
          type="button"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          onClick={handleToggle}
        >
          <img
            src={isVisible ? EyeOpen : EyeClose}
            alt={isVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            className="w-5 h-5"
          />
        </button>
      </div>
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );
};
