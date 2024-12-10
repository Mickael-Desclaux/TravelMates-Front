import { Popover, PopoverHandler, PopoverContent, List, ListItem } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";

  export default function ProfilePopover() {
    const handleLogOut = () => {
      console.log("🤸🏾 🪩 👀 ~ Déconnexion effectué ", handleLogOut)
    }
 
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
              to="/" 
              className="text-normal font-bold text-red-500"
              onClick={handleLogOut}>
              <ListItem className="bg-transparent hover:text-red-500 hover:bg-gray-50">
                Déconnexion
              </ListItem>
            </NavLink>
          </List>
        </PopoverContent>
      </Popover>
    );
  }