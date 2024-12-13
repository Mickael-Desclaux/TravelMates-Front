import { Popover, PopoverHandler, PopoverContent, List, ListItem } from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutApi } from "../../api/Auth";
import useAuthStore from "../../utils/AuthStore";
import { useState } from "react";

  export default function ProfilePopover() {
    const navigate = useNavigate();
    const [logoutError, setLogoutError] = useState<string | null>(null);

    const handleLogout = async () => {
      try {
        await logoutApi();
        localStorage.removeItem('authToken');
        useAuthStore.getState().clearAccessToken();
        navigate('/sign-in');
      } catch (error) {
        setLogoutError("Erreur lors de la déconnexion. Réessayez.");
      }
    };
 
    return (
     <Popover placement="bottom-end">
        {/* Button to go to the modal*/}
        <PopoverHandler>
            <button className="flex flex-col items-center justify-center w-8 h-8 rounded-full bg-gray-400 hover:bg-gray-500">
              <span className="w-1 h-1 bg-white rounded-full mb-1"></span>
              <span className="w-1 h-1 bg-white rounded-full mb-1"></span>
              <span className="w-1 h-1 bg-white rounded-full"></span>
            </button>
        </PopoverHandler>

        <PopoverContent className="w-70 bg-light-white rounded-lg">
          <List className="p-0">
            <NavLink to="/profile-edit" className="text-normal font-bold text-black">
              <ListItem className="bg-transparent hover:bg-gray-50">
                  Modifier mon profil
              </ListItem>
            </NavLink>
            <hr className="my-1 border-t border-gray-200" />
            <NavLink 
              to="/sign-in" 
              className="text-normal font-bold text-red-500"
              onClick={handleLogout}>
              <ListItem className="bg-transparent hover:text-red-500 hover:bg-gray-50">
                Déconnexion
              </ListItem>
            </NavLink>
          </List>
        </PopoverContent>
        {logoutError && <p className="text-red-500 mt-2"></p>}
      </Popover>
    );
  }