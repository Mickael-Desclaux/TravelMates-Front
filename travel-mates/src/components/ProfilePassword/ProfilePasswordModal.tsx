import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Typography } from "@material-tailwind/react";
import Arrow from "../../assets/icons/arrow.svg";
import { PasswordField } from "./PasswordField";
import { GetPasswordUser } from "../../api/User";
import { UpdatePasswordRequest } from "../../interfaces/Auth";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newPassword: string) => void;
}

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  if (!isOpen) return null;

  const fetchPasswordProfile = async (values: UpdatePasswordRequest) => {
    try {
      const PasswordChangeData = await GetPasswordUser(values);
      onClose();
      return PasswordChangeData;
    } catch (error) {
      throw new Error(error as string)
    }
  };

  const passwordValidationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Mot de passe actuel requis"),
    newPassword: Yup.string()
      .required("Nouveau mot de passe requis")
      .min(8, "Doit contenir au moins 8 caractères")
      .matches(/[a-z]/, "Au moins une minuscule")
      .matches(/[A-Z]/, "Au moins une majuscule")
      .matches(/\d/, "Au moins un chiffre")
      .matches(/[!?&#$*@]/, "Au moins un symbole (!?&#$*@)")
      .notOneOf([Yup.ref("currentPassword")], "Il doit être différent du mot de passe actuel"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Les mots de passe doivent correspondre")
      .required("Confirmation du mot de passe requise"),
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-light-white p-6 rounded-xl shadow-lg w-11/12 max-w-md relative">
        <Typography variant="h2" className="mb-6 text-xl font-bold text-center mb-6">
          Mot de passe
        </Typography>
        <Typography variant="h6" className="mb-12 text-center font-normal">
          Définissez un nouveau mot de passe fiable
        </Typography>
        
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={passwordValidationSchema}
          onSubmit={async (values, { resetForm }) => {
            await fetchPasswordProfile({
              currentPassword: values.currentPassword,
              newPassword: values.newPassword,
            });
            resetForm();
          }}
        >
          {({ values }) => {
            const passwordRequirements = {
              length: values.newPassword.length >= 8,
              lowercase: /[a-z]/.test(values.newPassword),
              uppercase: /[A-Z]/.test(values.newPassword),
              number: /\d/.test(values.newPassword),
              symbol: /[!?&#$*@]/.test(values.newPassword),
            };
            return (
              <Form>
                <div className="mb-2">
                  <PasswordField
                    name="currentPassword"
                    id="currentPassword"
                    placeholder="Mot de passe actuel"
                    label="Mot de passe actuel"
                  />
                </div>
                
                <div className="mb-2">
                  <PasswordField
                    name="newPassword"
                    id="newPassword"
                    placeholder="Nouveau mot de passe"
                    label="Nouveau mot de passe"
                  />
                </div>

                <div className="mb-2">
                  <PasswordField
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirmer le nouveau mot de passe"
                    label="Confirmer le nouveau mot de passe"
                  />
                </div>
                
                <div className="flex flex-col w-full my-6 gap-4 mx-auto">
                  <button
                    type="submit"
                    className="px-2 py-2 bg-green text-white rounded-md hover:bg-opacity-80"
                  >
                    Modifier mon mot de passe
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-2 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                  >
                    Annuler
                  </button>
                </div>
                
                <ul className="mb-4">
                  <Typography variant="h6" className="text-2sm font-bold text-black">
                    Votre mot de passe doit contenir :
                  </Typography>
                  {[
                    { label: "Plus de 8 caractères", isValid: passwordRequirements.length },
                    { label: "Au moins une minuscule", isValid: passwordRequirements.lowercase },
                    { label: "Au moins une majuscule", isValid: passwordRequirements.uppercase },
                    { label: "Au moins un chiffre", isValid: passwordRequirements.number },
                    { label: "Au minimum un symbole (!?&#$*@)", isValid: passwordRequirements.symbol },
                  ].map((requirement, index) => (
                    <li key={index} className={requirement.isValid ? "text-black" : "text-red-500"}>
                      {requirement.label}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={onClose}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  <img src={Arrow} alt="Fermer la fenêtre" className="w-8 h-8" />
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
