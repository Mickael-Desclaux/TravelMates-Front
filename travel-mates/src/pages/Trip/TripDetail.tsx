import { ThemeProvider, Carousel, Typography, Avatar, Button } from "@material-tailwind/react";
import genderIcon from '../../assets/icons/gender.svg';
import peoplesIcon from '../../assets/icons/peoples.svg';
import runIcon from '../../assets/icons/run.svg';
import './TripDetail.css';
import { useNavigate, useParams } from "react-router-dom";
import TripManagePopover from "../../components/TripPopover/TripPopover";
import { useEffect, useState } from "react";
import { GetTripById } from "../../api/Trips";
import TripWithParticipants, { Participant } from "../../interfaces/Trip";
import useAuthStore from "../../utils/AuthStore";
import { deleteTrip, join, leave } from "../../api/Trip";

const carouselTheme = {
    carousel: {
        defaultProps: {
            loop: true,
        },
    },
};

export default function TripDetail() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [trip, setTrip] = useState<TripWithParticipants>();
    const [conditionGender, setConditionGender] = useState<string>();
    const [conditionPhysical, setConditionPhysical] = useState<string>();

    const userId = useAuthStore(state => state.user_id);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const [isParticipant, setIsParticipant] = useState<boolean>(false);
    const [isRequestPending, setIsRequestPending] = useState<boolean>(false);
    const [confirmationMessage, setConfirmationMessage] = useState<string>("");
    const [showLeavingConfirmation, setShowLeavingConfirmation] = useState(false);

    async function removeTrip(id: number): Promise<void> {
        await deleteTrip(id);
        navigate({ pathname: "/" });
    }

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const data = await GetTripById(parseInt(id));
                    if (userId) {
                        setIsAdmin(data.owner_id === userId);
                        setIsParticipant(data.participants.some(participant => participant.user.id === userId && participant.status === "validated"));
                        setIsRequestPending(data.participants.some(participant => participant.user.id === userId && participant.status === "pending"));
                    }
                    setTrip(data);
                    switch (trip?.condition_gender) {
                        case "male":
                            setConditionGender("Hommes");
                            break;
                        case "female":
                            setConditionGender("Femmes");
                            break;
                        case "all":
                            setConditionGender("Tout le monde");
                            break;
                        default:
                            setConditionGender("Tout le monde");
                    }

                    switch (trip?.condition_physical) {
                        case "none":
                            setConditionPhysical("Aucune");
                            break;
                        case "normal":
                            setConditionPhysical("Normale");
                            break;
                        case "excellent":
                            setConditionPhysical("Excellente");
                            break;
                        default:
                            setConditionPhysical("Aucune");
                    }
                } catch (error) {
                    throw new Error(error as string)
                }
            }
        }
        fetchData();
    }, [id]);

    const handleParticipantsUpdate = (updatedParticipants: Participant[]) => {
        setTrip(prev => prev ? {
            ...prev,
            participants: updatedParticipants
        } : prev);
    };

    async function joinTrip(tripId: number): Promise<void> {
        try {
            await join(tripId);
            setIsRequestPending(true);
            setConfirmationMessage(`Votre demande pour rejoindre le trip de ${trip?.owner.profile.firstname} a bien été envoyée`);
        } catch (error) {
            throw error;
        }
    }

    async function leaveTrip(tripId: number): Promise<void> {
        try {
            await leave(tripId);
            setIsParticipant(false);
            setIsRequestPending(false);
            setShowLeavingConfirmation(false);
            setConfirmationMessage("Vous avez quitté le trip.");
        } catch (error) {
            console.error("Erreur lors de la tentative de quitter le trip :", error);
            setConfirmationMessage("Une erreur s'est produite lors de la tentative de quitter le trip.");
        }
    }


    return (
        <div className="md:mt-32 md:grid md:place-content-center mb-32">
            <div className="md:w-[50vw]">
                <div>
                    <ThemeProvider value={carouselTheme}>
                        <div className="relative">
                            {
                                isAdmin && (
                                    <div className="absolute top-8 right-4 md:right-60 z-20">
                                        <TripManagePopover
                                            tripId={+id!}
                                            removeTrip={removeTrip}
                                            participants={trip?.participants ?? []}
                                            onParticipantsUpdate={handleParticipantsUpdate}
                                        />
                                    </div>
                                )
                            }
                            <Carousel className="flex items-center max-h-[400px] mb-4 custom-carousel">
                                {
                                    trip ? (
                                        trip?.tripUnsplashImage.map((image, index: number) => (
                                            <img key={index} src={image.url} alt="Image" className="max-h-[400px] mx-auto" />
                                        ))): ""}
                            </Carousel>
                        </div>
                    </ThemeProvider>
                </div>
                <div className="flex flex-row items-center justify-between mt-2 m-4">
                    <Typography variant="h1" className="text-2xl font-title font-bold">{trip?.title ? trip.title : "Unknown"}</Typography>
                    <p className="border border-lg border-green rounded-lg p-1 text-green shadow-md font-bold">
                        {
                            trip ? trip?.budget_min + "€ - " + trip?.budget_max + "€" : ""
                        }
                    </p>
                </div>
                <div>
                    <Typography variant="h3" className="text-lg underline decoration-black m-4">
                        {trip?.destination + ' - du ' +
                            (trip?.date_from ? new Date(trip?.date_from).toLocaleDateString('fr-FR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: '2-digit'
                            }) : '') +
                            ' au ' +
                            (trip?.date_to ? new Date(trip?.date_to).toLocaleDateString('fr-FR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: '2-digit'
                            }) : '')
                        }
                    </Typography>
                </div>
                <div>
                    {
                        trip?.tripActivities.map((activity: { activity: string }, index: number) => (
                            <Avatar src={`/activity/${activity.activity.toLowerCase()}.svg`} key={index} alt={activity.activity} size="sm" className="ms-4"></Avatar>
                        ))
                    }
                </div>
                <div className="flex flex-row items-center m-4">
                    <Typography variant="h3" className="text-lg">Organisateur: </Typography>
                    <Avatar src={import.meta.env.VITE_API_BASE_URL + trip?.owner.profile.media.url} alt={trip?.owner.profile.firstname + ' ' + trip?.owner.profile.lastname} size="sm" className="ms-2 me-2"></Avatar>
                    <p>{trip?.owner.profile.firstname + ' ' + trip?.owner.profile.lastname}</p>
                </div>
                <div className="flex flex-row items-center -space-x-4 m-4">
                    <Typography variant="h3" className="text-lg me-6">Participants: </Typography>
                    {
                        trip && (
                            trip?.participants.map((participant: Participant) => (
                                <Avatar key={`avatar-${trip.id}-${participant.user.id}-${participant.status}`} src={import.meta.env.VITE_API_BASE_URL + participant.user.profile?.media?.url} alt={participant.user.profile.firstname + ' ' + participant.user.profile.lastname} size="sm" className="border-2 border-white hover:z-10 focus:z-10"></Avatar>
                            )))
                    }
                </div>
                <div className="m-4">
                    <Typography variant="h2" className="text-2xl mt-8">Description</Typography>
                    <Typography variant="lead" className="text-md mt-2">{trip?.description ? trip.description : "Unknown"}</Typography>
                </div>
                <div className="m-4">
                    <Typography variant="h2" className="text-2xl mt-8">Critères</Typography>
                    <div className="grid grid-cols-2 gap-2 items-center mt-4">
                        <div className="flex items-center">
                            <img src={genderIcon} alt="genre" className="me-4" />
                            <p className="font-bold">Je voyage avec</p>
                        </div>
                        <p className="border border-lg border-black rounded-lg p-2 font-bold text-right flex justify-center">
                            {conditionGender}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 items-center mt-4">
                        <div className="flex items-center">
                            <img src={peoplesIcon} alt="genre" className="me-4" />
                            <p className="font-bold">Âgés entre</p>
                        </div>
                        <p className="border border-lg border-black rounded-lg p-2 font-bold text-right flex justify-center">
                            {`${trip?.condition_age_min} - ${trip?.condition_age_max} ans`}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 items-center mt-4">
                        <div className="flex items-center">
                            <img src={runIcon} alt="genre" className="me-4" />
                            <p className="font-bold">Condition physique recommandée</p>
                        </div>
                        <p className="border border-lg border-black rounded-lg p-2 font-bold text-right flex justify-center">
                            {conditionPhysical}
                        </p>
                    </div>
                </div>
                <div className="flex justify-center mt-8">
                    {userId && trip && !isAdmin && (
                        showLeavingConfirmation ? (
                            <div>
                                <p>Êtes-vous sûr de vouloir quitter le trip ?</p>
                                <Button
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                    onClick={() => leaveTrip(trip.id)}
                                >
                                    Quitter le trip
                                </Button>
                                <Button
                                    className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded ml-2"
                                    onClick={() => setShowLeavingConfirmation(false)}
                                >
                                    Annuler
                                </Button>
                            </div>
                        ) : (
                            <Button
                                className={`px-4 py-2 rounded text-white ${isRequestPending
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : isParticipant
                                        ? "bg-red-500 hover:bg-red-600"
                                        : "bg-green hover:bg-green"
                                    }`}
                                onClick={() => isParticipant ? setShowLeavingConfirmation(true) : joinTrip(trip.id)}
                                disabled={isRequestPending}
                            >
                                {isRequestPending
                                    ? "Demande en attente"
                                    : isParticipant
                                        ? "Quitter le trip"
                                        : "Rejoindre le trip"}
                            </Button>
                        )
                    )}
                </div>
                {confirmationMessage && (
                    <div className="flex justify-center m-4 text-center">
                        <p className="text-green-600">{confirmationMessage}</p>
                    </div>
                )}
            </div>
        </div>
    )
}