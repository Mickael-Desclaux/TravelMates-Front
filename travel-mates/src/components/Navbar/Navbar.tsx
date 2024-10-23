import homeIcon from "../../assets/icons/home.svg";
import mapIcon from "../../assets/icons/map.svg";
import newIcon from "../../assets/icons/new.svg";
import messageIcon from "../../assets/icons/message.svg";
import logInIcon from "../../assets/icons/login.svg";
import logoTravelMates from "../../assets/Logo/travelmates.png";
import { Button } from "@material-tailwind/react";

export default function NavbarComponent() {
  return (
    <>
      <nav>
        {/* Navbar mobile version */}
        <div className="md:hidden bg-white border-t border-gray-200 fixed z-20 bottom-0 w-full">
          {/* Mobile menu with icons, positioned at the bottom */} 
          <div className="py-6 sm:bottom-auto sm:top-0 sm:w-auto">
            <ul className="flex text-sm justify-around">
              <li>
                <a
                  href="#"
                  className="flex flex-col items-center text-gray-900 dark:text-white"
                  aria-current="page"
                >
                  <img src={homeIcon} alt="Accueil icône" className="w-10 h-10" />
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="/map"
                  className="flex flex-col items-center text-gray-900 dark:text-white"
                >
                  <img src={mapIcon} alt="Carte icône" className="w-10 h-10" />
                  Carte
                </a>
              </li>
              <li>
                <a
                  href="/trip-create"
                  className="flex flex-col items-center text-gray-900 dark:text-white"
                >
                  <img src={newIcon} alt="Ajouter un nouvel événement icône" className="w-10 h-10" />
                  Ajouter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex flex-col items-center text-gray-900 dark:text-white"
                >
                  <img src={messageIcon} alt="Message icône" className="w-10 h-10" />
                  Message
                </a>
              </li>
              <li>
                <a
                  href="/sign-in"
                  className="flex flex-col items-center text-gray-900 dark:text-white"
                >
                  <img src={logInIcon} alt="Connexion icône" className="w-10 h-10" />
                  Connexion
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Navbar desktop version */}
        <div className="hidden md:flex justify-between items-center w-full p-4 bg-white shadow-md fixed top-0 left-0">
          {/* TravelMates logo */}
          <div className="text-lg font-bold">
            <a href="/">
                <img src={logoTravelMates} alt="Logo Travel Mates" className="w-20" />
            </a>
          </div>

          {/* Menu items for desktop */}
          <ul className="flex space-x-8">
            <li className="hover:text-green font-bold cursor-pointer">
              <a href="/">Accueil</a>
            </li>
            <li className="hover:text-green font-bold cursor-pointer">
              <a href="#">Message</a>
            </li>
            <li className="hover:text-green font-bold cursor-pointer">
              <a href="/map">Carte</a>
            </li>
            <li className="hover:text-green font-bold cursor-pointer">
              <a href="/trip-create">Ajouter un événement</a>
            </li>
          </ul>

          {/* Action buttons (sign-up and sign-in) */}
          <div className="flex gap-4 items-center">
            <a
              href="/sign-up"
              className="text-md no-underline hover:text-green font-bold cursor-pointer whitespace-nowrap"
            >
              Créer un compte
            </a>

            <Button size="sm" className="bg-green items-center justify-center h-10">
              <a href="/sign-in">Connexion</a>
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}