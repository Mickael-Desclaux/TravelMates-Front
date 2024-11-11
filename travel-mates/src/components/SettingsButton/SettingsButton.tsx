import { NavLink } from "react-router-dom";

export default function SettingsButton() {
  return (
    <NavLink
      to={"/profile-edit"}
      className="flex flex-col items-center text-gray-900 dark:text-white"
      aria-current="page"
    >
      <button className="flex flex-col items-center justify-center w-8 h-8 rounded-full bg-gray-400 hover:bg-gray-500">
        <span className="w-1 h-1 bg-white rounded-full mb-1"></span>
        <span className="w-1 h-1 bg-white rounded-full mb-1"></span>
        <span className="w-1 h-1 bg-white rounded-full"></span>
      </button>
    </NavLink>
  );
}