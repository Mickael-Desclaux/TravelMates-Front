import { ThemeProvider, Carousel, Typography, Avatar } from "@material-tailwind/react";
import Trip from "../../interfaces/Trip";
import adventureIcon from '../../assets/activity/adventure.svg';
import cultureIcon from '../../assets/activity/culture.svg';
import relaxationIcon from '../../assets/activity/relaxation.svg';
import sportIcon from '../../assets/activity/sport.svg';
import partyIcon from '../../assets/activity/party-and-bar.svg';
import genderIcon from '../../assets/icons/gender.svg';
import peoplesIcon from '../../assets/icons/peoples.svg';
import runIcon from '../../assets/icons/run.svg';
import './TripDetail.css';
import { Activity } from "../../interfaces/TripProps/TripProps";

const carouselTheme = {
    carousel: {
        defaultProps: {
            loop: true,
        },
    },
};

interface User {
    firstname: string;
    lastname: string;
    profilePicture: string;
}

const data: Trip = {
    owner: {
        firstname: "Micheline",
        lastname: "Michelin",
        profilePicture: "https://docs.material-tailwind.com/img/face-2.jpg",
    },
    users: [
        {
            firstname: "Marie",
            lastname: "Martin",
            profilePicture: "https://docs.material-tailwind.com/img/face-1.jpg"
        },
        {
            firstname: "Pierre",
            lastname: "Durand",
            profilePicture: "https://docs.material-tailwind.com/img/face-3.jpg"
        },
        {
            firstname: "Patrick",
            lastname: "Michel",
            profilePicture: "https://docs.material-tailwind.com/img/face-4.jpg"
        }
    ],
    title: "Voyage en Italie",
    destination: "Italie",
    dateFrom: new Date("2023-06-01"),
    dateTo: new Date("2023-06-15"),
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tortor iaculis purus convallis, 
    non porttitor est congue. Vivamus hendrerit mollis purus, tempor scelerisque risus faucibus sed. Nullam sagittis ante 
    quis erat porta, ac pulvinar ex accumsan. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras nec mauris iaculis, 
    tempus mi quis, rutrum lectus. Vivamus vel lacus pretium, mollis erat sit amet, luctus tellus. Aenean feugiat tortor in pellentesque 
    suscipit. Cras non viverra urna.`,
    conditionBudgetMin: 500,
    conditionBudgetMax: 1000,
    conditionGender: "Tout le monde",
    conditionAgeMin: "18",
    conditionAgeMax: "30",
    conditionPhysical: "Normal",
    conditionUserLimit: 10,
    medias:
        [
            "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
            "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
            "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
        ],
    activities: [
        { id: 1, type: 'Museum', icon: cultureIcon },
        { id: 2, type: 'Adventure', icon: adventureIcon },
        { id: 3, type: 'Détente', icon: relaxationIcon },
        { id: 5, type: 'Fête', icon: partyIcon },
        { id: 4, type: 'Sport', icon: sportIcon }],
}

export default function TripDetail() {

    return (
        <>
            <div className="md:mt-32 md:grid md:place-content-center mb-32">
                <div className="md:w-[60vw]">
                    <div>
                        <ThemeProvider value={carouselTheme}>
                            <Carousel className="flex items-center max-h-[400px] mb-4 custom-carousel">
                                {data.medias.map((image: string, index: number) => (
                                    <img key={index} src={image} alt="Image" className="max-h-[400px] mx-auto" />
                                ))}
                            </Carousel>
                        </ThemeProvider>
                    </div>
                    <div className="flex flex-row items-center justify-between mt-2 m-4">
                        <Typography variant="h1" className="text-2xl font-title font-bold">{data.title}</Typography>
                        <p className="border border-lg border-green rounded-lg p-1 text-green shadow-md font-bold">
                            {data.conditionBudgetMin + "€ - " + data.conditionBudgetMax + "€"}
                        </p>
                    </div>
                    <div>
                        <Typography variant="h3" className="text-lg underline m-4">
                            {data.destination + ' - ' + data.dateFrom.toLocaleDateString() + ' / ' + data.dateTo.toLocaleDateString()}
                        </Typography>
                    </div>
                    <div>
                        {
                            data.activities.map((activity: Activity, index: number) => (
                                <Avatar src={activity.icon} key={index} alt={activity.type} size="sm" className="ms-4"></Avatar>
                            ))
                        }
                    </div>
                    <div className="flex flex-row items-center m-4">
                        <Typography variant="h3" className="text-lg">Organisateur: </Typography>
                        <Avatar src={data.owner.profilePicture} alt={data.owner.firstname + ' ' + data.owner.lastname} size="sm" className="ms-2 me-2"></Avatar>
                        <p>{data.owner.firstname + ' ' + data.owner.lastname}</p>
                    </div>
                    <div className="flex flex-row items-center -space-x-4 m-4">
                        <Typography variant="h3" className="text-lg me-6">Participants: </Typography>
                        {
                            data.users.map((user: User, index: number) => (
                                <Avatar key={index} src={user.profilePicture} alt={data.owner.firstname + ' ' + data.owner.lastname} size="sm" className="border-2 border-white hover:z-10 focus:z-10"></Avatar>
                            ))
                        }
                    </div>
                    <div className="m-4">
                        <Typography variant="h2" className="text-2xl mt-8">Description</Typography>
                        <Typography variant="lead" className="text-md mt-2">{data.description}</Typography>
                    </div>
                    <div className="m-4">
                        <Typography variant="h2" className="text-2xl mt-8">Critères</Typography>
                        <div className="grid grid-cols-2 gap-4 items-center mt-4">
                            <div className="flex items-center">
                                <img src={genderIcon} alt="genre" className="me-4" />
                                <p className="font-bold">Je voyage avec</p>
                            </div>
                            <p className="me-4 border border-lg border-black rounded-lg p-2 font-bold text-right flex justify-center">{data.conditionGender}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 items-center mt-4">
                            <div className="flex items-center">
                                <img src={peoplesIcon} alt="genre" className="me-4" />
                                <p className="font-bold">Âgés entre</p>
                            </div>
                            <p className="me-4 border border-lg border-black rounded-lg p-2 font-bold text-right flex justify-center">{`${data.conditionAgeMin} - ${data.conditionAgeMax} ans`}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 items-center mt-4">
                            <div className="flex items-center">
                                <img src={runIcon} alt="genre" className="me-4" />
                                <p className="font-bold">Condition physique recommandée</p>
                            </div>
                            <p className="me-4 border border-lg border-black rounded-lg p-2 font-bold text-right flex justify-center">{data.conditionPhysical}</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}