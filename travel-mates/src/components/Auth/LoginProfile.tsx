import React, { useEffect, useState } from "react";
import { Typography, Button, Menu, MenuHandler, MenuList, MenuItem, Avatar } from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import useAuthStore from "../../utils/AuthStore";
import { logoutApi } from "../../api/Auth";
import { useNavigate } from "react-router-dom";
import { ProfileData } from '../../interfaces/ProfileInterface';
import { GetProfile } from "../../api/Profile";

export default function LoginProfile() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.user_id);
  
  const profileMenuItems = [
    {
      label: "Voir mon profil",
      route: `/profile/${userId}`
    },
    {
      label: "Voir mes trips",
      route: "/trip"
    },
    {
      label: "Déconnexion",
      route: "/sign-in"
    },
  ];

  useEffect(() => {
    const fetchLoginProfile = async () => {
      if (!userId) return;

      try {
        const data = await GetProfile(userId);
        setProfile(data)
      } catch (error) {
        throw new Error;
      }
    };

    fetchLoginProfile();
  }, [userId]);

  const handleLogoutProfileNavbar = async () => {
    try {
      await logoutApi();
      localStorage.removeItem('authToken');
      useAuthStore.getState().clearAccessToken();
      navigate('/sign-in');
    } catch (error) {
      setLogoutError("Erreur lors de la déconnexion. Réessayez.");
    }
  };

  const firstname = profile?.firstname || 'Utilisateur';
  const lastname = profile?.lastname || '';

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="md"
            alt={`${firstname} ${lastname}`.trim()}
            className="border border-gray-400 p-0.5"
            src={`${import.meta.env.VITE_API_BASE_URL}/${profile?.media?.url}`}
          />
          <Typography variant="h6" color="black" className="font-normal font-bold hidden lg:block capitalize">
            {firstname}
          </Typography>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </MenuHandler>

      <MenuList className="p-4">
        {profileMenuItems.map(({ label, route }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;

          const handleClick = () => {
            closeMenu();
            if (label === "Déconnexion") {
              handleLogoutProfileNavbar();
            } else if (route) {
              navigate(route);
            }
          };

          return (
            <MenuItem
              key={label}
              onClick={handleClick}
              className={`flex items-center gap-2 rounded ${isLastItem ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10" : ""
                }`}
            >
              <Typography as="span" variant="h6" className="font-normal font-bold" color={isLastItem ? "red" : "inherit"}>
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
      {logoutError && (
        <Typography variant="small" className="text-red-500 mt-2 text-center">
          {logoutError}
        </Typography>
      )}
    </Menu>
  );
}
