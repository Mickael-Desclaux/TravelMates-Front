import followButton from "../../assets/icons/follow.svg";

export default function AddFriendButton() {
    return (
        <button className="flex flex-col items-center w-12 h-12 bg-green text-white font-normal font-semibold rounded-lg hover:bg-gray-600 transition-colors">
            <img src={followButton} className="w-6 h-6" alt="Ajouter un ami" />
            <div className="text-xs">
                Ajouter
            </div>
        </button>
    );
};