import { Avatar, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import kickIcon from '../../assets/icons/kick.svg';
import addIcon from '../../assets/icons/add.svg';
import { XMarkIcon } from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

interface Participants {
    id: number;
    firstname: string;
    lastname: string;
    profilePicture: string;
    status: string;
}

export default function TripManagePopUp() {

    const [ showOptions, setShowOptions ] = useState<boolean>(false);
    const [ showManageParticipants, setShowManageParticipants] = useState<boolean>(false);
    const [ showRemoveTrip, setShowRemoveTrip ] = useState<boolean>(false);
    const [ showKickParticipant, setshowKickParticipant ] = useState<boolean>(false);
    const [ selectedParticipant, setSelectedParticipant ] = useState<Participants | null>(null);

    const data: Participants[] = [
        {
            id: 1,
            firstname: "Patrick",
            lastname: "Mouratouglou",
            profilePicture: "https://docs.material-tailwind.com/img/face-3.jpg",
            status: "validated"
        },
        {
            id: 2,
            firstname: "Michelle",
            lastname: "Obama",
            profilePicture: "https://docs.material-tailwind.com/img/face-2.jpg",
            status: "validated"
        },
        {
            id: 3,
            firstname: "Antoine",
            lastname: "Dupont",
            profilePicture: "https://docs.material-tailwind.com/img/face-1.jpg",
            status: "pending"
        },
        {
            id: 4,
            firstname: "Novak",
            lastname: "Djokovic",
            profilePicture: "https://docs.material-tailwind.com/img/face-4.jpg",
            status: "pending"
        }
    ]

    function addParticipant(data: Participants) {
        console.log(`Participant ajouté : ${data.id + ' ' + data.firstname + ' ' + data.lastname}`);
    }

    function kickParticipant(data: Participants) {
        console.log(`Participant banni : ${data.id + ' ' + data.firstname + ' ' + data.lastname}`);
    }

    return (
        <>
            <div className="flex justify-end">
                <button className="bg-black text-white p-2 w-9 rounded-3xl aspect-ratio-1 opacity-75"
                    onClick={() => {
                        setShowOptions(!showOptions);
                        setShowManageParticipants(false);
                        setShowRemoveTrip(false);
                        setshowKickParticipant(false);
                    }}>
                    <EllipsisVerticalIcon />
                </button>
            </div>

            {
                showOptions ?
                    <div className="rounded-lg border border-black flex flex-col p-3 ms-7 mt-2 bg-gray-100 text-center md:mx-auto md:w-[50%] w-[90%]">
                        <button className="mb-3"
                            onClick={() => { setShowManageParticipants(!showManageParticipants); setShowOptions(!showOptions) }}>
                            Gestion des participants
                        </button>
                        <NavLink to={"/trip-edit"}>
                            <button className="mb-3">Modifier le trip</button>
                        </NavLink>
                        <button
                            onClick={() => { setShowRemoveTrip(!showRemoveTrip); setShowOptions(!showOptions) }}
                            className="font-bold text-red-900">
                            Supprimer le trip
                        </button>
                    </div>
                    : null
            }

            {
                showManageParticipants ? (
                    data ?
                        <div className="m-4 border border-black rounded-lg bg-gray-100 ms-7 mt-2 md:mx-auto md:w-[50%]">
                            <div className="flex justify-end m-4">
                                <button className="flex justify-end w-6 aspect-ratio-1"
                                    onClick={() => { setShowManageParticipants(false); setShowOptions(false) }}>
                                    <XMarkIcon />
                                </button>
                            </div>
                            <Typography variant="h3" className="font-title text-xl text-center mb-8 -mt-4">Participants</Typography>
                            {data.map((participant: Participants) => (
                                <div key={participant.id} className="flex flex-row items-center justify-between m-4 gap-6">
                                    <div className="flex flex-row items-center">
                                        <Avatar src={participant.profilePicture} alt={participant.firstname + ' ' + participant.lastname} />
                                        <p className="ms-2">{participant.firstname + ' ' + participant.lastname}</p>
                                    </div>
                                    <button 
                                        onClick={() => participant.status === "validated" ?
                                            (setshowKickParticipant(!showKickParticipant), setSelectedParticipant(participant), setShowManageParticipants(false))
                                            : (setSelectedParticipant(participant), selectedParticipant && addParticipant(participant))}>
                                        <img
                                            src={participant.status === "validated" ? kickIcon
                                                : addIcon} alt={participant.status === "validated" ? "Bannir" : "Ajouter"} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        : null
                ) : null
            }

            {
                showKickParticipant ?
                    <div className="m-4 border border-black rounded-lg bg-gray-100 ms-7 mt-2 md:mx-auto md:w-[50%]">
                        <div className="flex justify-end m-4">
                            <button className="flex justify-end w-6 aspect-ratio-1"
                                onClick={() => { setshowKickParticipant(false); setShowOptions(false) }}>
                                <XMarkIcon />
                            </button>
                        </div>
                        <Typography variant="h3" className="font-title text-xl text-center mb-8 -mt-4">Participants</Typography>
                        <p className="m-4 text-center">Voulez-vous vraiment exclure {selectedParticipant?.firstname + ' ' + selectedParticipant?.lastname} de votre trip?</p>
                        <div className="m-4 flex flex-row items-center justify-center">
                            <Avatar src={selectedParticipant?.profilePicture} alt={selectedParticipant?.firstname + ' ' + selectedParticipant?.lastname} />
                            <p className="ms-4">{selectedParticipant?.firstname + ' ' + selectedParticipant?.lastname}</p>
                        </div>
                        <div className="flex flex-row items-center justify-evenly p-6">
                            <Button
                                onClick={() => { setShowManageParticipants(!showManageParticipants); setshowKickParticipant(!showKickParticipant) }}>
                                Annuler
                            </Button>
                            <Button
                                onClick={() => { setShowManageParticipants(!showManageParticipants); setshowKickParticipant(!showKickParticipant); selectedParticipant && kickParticipant(selectedParticipant); }}
                                className="bg-red-900">
                                Confirmer
                            </Button>
                        </div>
                    </div>
                    : null
            }
        </>
    )
}

