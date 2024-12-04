import { Typography } from "@material-tailwind/react";
import Arrow from "../../assets/icons/arrow.svg";

interface ProfileDeleteAccountProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ProfileDeleteAccount({ isOpen,  onClose, onConfirm }: ProfileDeleteAccountProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-light-white p-6 bottom-40 rounded-xl shadow-lg w-11/12 max-w-md relative">
        <Typography variant="h2" className="text-xl font-bold text-center">
          Supprimer mon compte
        </Typography>
        <p className="my-10 text-center">
          Voulez-vous vraiment supprimer
          <br /> votre compte définitivement ?
        </p>
        <div className="flex flex-col w-2/3 gap-4 mx-auto">
          <button
            onClick={onConfirm}
            className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Oui, supprimer mon compte
          </button>
          <button
            onClick={onClose}
            className="px-2 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Annuler
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <img src={Arrow} alt="Fermer la fenêtre" className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
