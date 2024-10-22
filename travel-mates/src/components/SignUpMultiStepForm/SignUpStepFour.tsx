import { Typography } from "@material-tailwind/react";

interface SignUpStepFourProps {
    email: string;
  }

export default function SignUpStepFour({ email }: SignUpStepFourProps) {

  return (
    <div className="mx-auto mt-8 max-w-[24rem]">
        <Typography variant="h1" className="text-center text-2xl font-title">
        Tu as un reçu un message<br />
        de confirmation !
        </Typography>
        <Typography variant="h4" className="mt-8 text-center text-2sm font-normal">
            Consulte ta boîte de réception, nous t'avons envoyé
            un lien pour confirmation à : <span className="font-semibold">{ email }</span>
        </Typography>
    </div>
  )
}