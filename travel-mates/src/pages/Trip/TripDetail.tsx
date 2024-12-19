import { ThemeProvider, Carousel, Typography, Avatar } from "@material-tailwind/react";
import genderIcon from '../../assets/icons/gender.svg';
import peoplesIcon from '../../assets/icons/peoples.svg';
import runIcon from '../../assets/icons/run.svg';
import './TripDetail.css';
import { useNavigate, useParams } from "react-router-dom";
import TripManagePopover from "../../components/TripPopover/TripPopover";
import { useEffect, useState } from "react";
import { GetTripById } from "../../api/Trips";
import TripWithParticipants, { Participant } from "../../interfaces/Trip";

const carouselTheme = {
    carousel: {
        defaultProps: {
            loop: true,
        },
    },
};

export default function TripDetail() {

    const navigate = useNavigate();
    const {id} = useParams();

    const [trip, setTrip] = useState<TripWithParticipants>();
    const [conditionGender, setConditionGender] = useState<string>();
    const [conditionPhysical, setConditionPhysical] = useState<string>();

    function removeTrip(id: number) {
        console.log(`Trip avec l'id ${id} supprimé`)
        navigate({ pathname: "/" });
    }

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const data = await GetTripById(parseInt(id));
                    console.log("🚀 ~ fetchData ~ data:", data)
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
                    }
                } catch (error) {
                    throw new Error(error as string)
                }
            }
        }
        fetchData();
    }, [id]);

    return (
        <>
            <div className="md:mt-32 md:grid md:place-content-center mb-32">
                <div className="md:w-[50vw]">
                    <div>
                        <ThemeProvider value={carouselTheme}>
                            <div className="relative">
                                <div className="absolute top-8 right-4 md:right-60 z-20">
                                    <TripManagePopover tripId={+id!} removeTrip={removeTrip} participants={trip?.participants ?? []} />
                                </div>
                                <Carousel className="flex items-center max-h-[400px] mb-4 custom-carousel">
                                    {
                                        trip ?
                                            trip?.tripUnsplashImage.map((image, index: number) => (
                                                <img key={index} src={image.url} alt="Image" className="max-h-[400px] mx-auto" />
                                            )) : ""}
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
                            trip?.tripActivities.map((activity: {activity: string}, index: number) => (
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
                            trip ?
                            trip?.participants.map((participant: Participant, index: number) => (
                                <Avatar key={index} src={import.meta.env.VITE_API_BASE_URL + participant.user.profile.media.url} alt={participant.user.profile.firstname + ' ' + participant.user.profile.lastname} size="sm" className="border-2 border-white hover:z-10 focus:z-10"></Avatar>
                            )) : ""
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

                </div>
            </div>
        </>
    )
}