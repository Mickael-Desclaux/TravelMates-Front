import homeIcon from "/icons/home.svg";
import mapIcon from "/icons/map.svg";
import newIcon from "/icons/new.svg";
import messageIcon from "/icons/message.svg";
import logInIcon from "/icons/login.svg";
import logoTravelMates from "/Logo/travelmates.png";
import { Button } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import LoginProfile from "../Auth/LoginProfile";
import useAuthStore from "../../utils/AuthStore";

export default function NavbarComponent() {
  const userId = useAuthStore(state => state.user_id);

  return (
    <>
      <nav>
        {/* Navbar mobile version */}
        <div className="md:hidden bg-white border-t border-gray-200 fixed z-20 bottom-0 w-full">
          {/* Mobile menu with icons, positioned at the bottom */} 
          <div className="py-6 sm:bottom-auto sm:top-0 sm:w-auto">
            <ul className="flex text-sm justify-around">
              <li>
                <NavLink
                  to={"/"}
                  className="flex flex-col items-center text-gray-900 dark:text-white"
                  aria-current="page"
                >
                  <img src={homeIcon} alt="Accueil icône" className="w-10 h-10" />
                  Accueil
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/map"}
                  className="flex flex-col items-center text-gray-900 dark:text-white"
                >
                  <img src={mapIcon} alt="Carte icône" className="w-10 h-10" />
                  Carte
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/trip-create"}
                  className="flex flex-col items-center text-gray-900 dark:text-white"
                >
                  <img src={newIcon} alt="Ajouter un nouvel événement icône" className="w-10 h-10" />
                  Ajouter
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/message"}
                  className="flex flex-col items-center text-gray-900 dark:text-white"
                >
                  <img src={messageIcon} alt="Message icône" className="w-10 h-10" />
                  Message
                </NavLink>
              </li>
              <li>
              {userId ? (
                <LoginProfile />
              ) : (
                <NavLink to={"/sign-in"} className="flex flex-col items-center text-gray-900 dark:text-white">
                  <img src={logInIcon} alt="Connexion icône" className="w-10 h-10" />
                  Connexion
                </NavLink>
              )}
              </li>
            </ul>
          </div>
        </div>

        {/* Navbar desktop version */}
        <div className="hidden md:flex justify-between items-center w-full p-4 bg-white shadow-md fixed z-20 top-0 left-0">
          {/* TravelMates logo */}
          <div className="text-lg font-bold">
            <NavLink to={"/"}>
                <img src={logoTravelMates} alt="Logo Travel Mates" className="w-20" />
            </NavLink>
          </div>

          {/* Menu items for desktop */}
          <ul className="flex space-x-8">
            <li className="hover:text-green font-bold cursor-pointer">
              <NavLink to={"/"}>Accueil</NavLink>
            </li>
            <li className="hover:text-green font-bold cursor-pointer">
              <NavLink to={"/message"}>Message</NavLink>
            </li>
            <li className="hover:text-green font-bold cursor-pointer">
              <NavLink to={"/map"}>Carte</NavLink>
            </li>
            <li className="hover:text-green font-bold cursor-pointer">
              <NavLink to={"/trip-create"}>Ajouter un Trip</NavLink>
            </li>
          </ul>

          {/* Action buttons (sign-up and sign-in) */}
          <div className="flex gap-4 items-center">
            {!userId && (
              <NavLink
              to={"/sign-up"}
              className="text-md no-underline hover:text-green font-bold cursor-pointer whitespace-nowrap"
              >
                Créer un compte
              </NavLink>
            )}
            {userId ? (
              <LoginProfile />
            ) : (
              <NavLink to={"/sign-in"}>
                <Button size="sm" className="bg-green items-center justify-center h-10">
                  Connexion
                </Button>
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
