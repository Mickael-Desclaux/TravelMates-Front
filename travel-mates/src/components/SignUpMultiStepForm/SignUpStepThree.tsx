import { Typography } from "@material-tailwind/react";
import ActivityPicker from "../ActivityPicker/ActivityPicker";

export default function SignUpStepThree() {
  return (
    <>
        <div className="mb-6 mx-auto mt-8 max-w-[24rem]">
            <Typography variant="h1" className="text-center text-2xl font-title">
                Dernière étape !
            </Typography>
            <Typography variant="h4" className="text-center text-2sm font-normal">
                Sélectionner vos activités préférées
            </Typography>
        </div>

        <ActivityPicker />
    </>
  )
}