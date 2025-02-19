import { useEffect, useState } from "react";
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    List,
    ListItem,
    Avatar,
    Button,
    Typography
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { Participant } from "../../interfaces/Trip";
import kickIcon from '/icons/kick.svg';
import addIcon from '/icons/add.svg';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { banParticipant, validateParticipant } from "../../api/Trip";

interface TripManagePopoverProps {
    tripId: number;
    removeTrip: (id: number) => void;
    participants: Participant[];
    onParticipantsUpdate?: (updatedParticipants: Participant[]) => void;
}

export default function TripManagePopover({ removeTrip, tripId, participants, onParticipantsUpdate }: TripManagePopoverProps) {

    const [view, setView] = useState<'menu' | 'participants' | 'confirmKick' | 'confirmDelete'>('menu');
    const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
    const [localParticipants, setLocalParticipants] = useState<Participant[]>(participants);

    useEffect(() => {
        setLocalParticipants(participants);
    }, [participants]);

    async function addParticipant(tripId: number, participantId: number) {
        try {
            const updatedParticipants = await validateParticipant(tripId, participantId);
            setLocalParticipants(updatedParticipants);
            onParticipantsUpdate?.(updatedParticipants);
            setView('participants');
        } catch (error) {
            throw error;
        }
    }

    async function kickParticipant(tripId: number, participantId: number) {
        try {
            const updatedParticipants = await banParticipant(tripId, participantId);
            setLocalParticipants(updatedParticipants);
            onParticipantsUpdate?.(updatedParticipants);
            setView('participants');
        } catch (error) {
            throw error;
        }
    }

    const MainMenu = () => (
        <List className="p-0">
            <ListItem
                className="text-black font-bold bg-light-white"
                onClick={() => setView('participants')}
            >
                Gestion des participants
            </ListItem>
            <hr className="my-1 border-t border-gray-200" />
            <NavLink to={`/trip-edit/${tripId}`} className="text-normal font-bold text-black">
                <ListItem className="text-black font-bold">
                    Modifier le trip
                </ListItem>
            </NavLink>
            <hr className="my-1 border-t border-gray-200" />
            <ListItem
                className="font-bold text-red-500 hover:text-red-900"
                onClick={() => setView('confirmDelete')}
            >
                Supprimer le trip
            </ListItem>
        </List>
    );

    const ParticipantsList = () => (
        <div className="p-2">
            <button
                onClick={() => setView('menu')}
                className="flex items-center text-sm text-black mb-4 hover:text-gray-800"
            >
                <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <Typography variant="h3" className="mb-4 text-black font-title font-bold text-lg">Participants</Typography>
            {localParticipants && localParticipants.length > 0 ? (
                localParticipants.map((participant: Participant, index: number) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50">
                        <div className="flex items-center">
                            <Avatar key={index} src={import.meta.env.VITE_API_BASE_URL + participant.user.profile.media.url} alt={`${participant.user.profile.firstname} ${participant.user.profile.lastname}`} size="sm" />
                            <span className="ml-2 text-black">{participant.user.profile.firstname} {participant.user.profile.lastname}</span>
                        </div>
                        <Button
                            variant="text"
                            size="sm"
                            color={participant.status === "validated" ? "red" : "green"}
                            onClick={() => {
                                if (participant.status === "validated") {
                                    setSelectedParticipant(participant);
                                    setView('confirmKick');
                                } else {
                                    addParticipant(tripId, participant.user.id);
                                }
                            }}
                        >
                            <img
                                src={participant.status === "validated" ? kickIcon : addIcon}
                                alt={participant.status === "validated" ? "Bannir" : "Ajouter"}
                            />
                        </Button>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">Aucun participant pour le moment</p>
            )}
        </div>
    );

    const ConfirmKick = () => (
        <div className="p-4 text-center">
            <button
                onClick={() => setView('participants')}
                className="flex items-center text-sm text-black mb-4 hover:text-gray-800"
            >
                <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <Typography variant="h3" className="mb-4 text-black text-lg font-title font-bold">Confirmer l'exclusion</Typography>
            <div className="flex items-center justify-center mb-4">
                <Avatar
                    src={import.meta.env.VITE_API_BASE_URL + selectedParticipant?.user.profile.media.url}
                    alt={`${selectedParticipant?.user.profile.firstname} ${selectedParticipant?.user.profile.lastname}`}
                    size="lg"
                />
            </div>
            <p className="mb-4 text-black">Voulez-vous vraiment exclure {selectedParticipant?.user.profile.firstname} {selectedParticipant?.user.profile.lastname} ?</p>
            <div className="flex justify-center gap-4">
                <Button variant="text" color="black" className="bg-gray-300" onClick={() => setView('participants')}>
                    Annuler
                </Button>
                <Button
                    className="bg-red-800"
                    onClick={() => selectedParticipant && kickParticipant(tripId, selectedParticipant.user.id)}
                >
                    Confirmer
                </Button>
            </div>
        </div>
    );

    const ConfirmDelete = () => (
        <div className="p-4 text-center">
            <button
                onClick={() => setView('menu')}
                className="flex items-center text-sm text-black mb-4 hover:text-gray-800"
            >
                <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <Typography variant="h3" className="mb-4 text-lg font-title font-bold text-black">Supprimer le Trip</Typography>
            <p className="mb-4 text-black">Êtes-vous sûr de vouloir supprimer ce trip ?</p>
            <div className="flex justify-center gap-4">
                <Button variant="text" color="black" className="bg-gray-300" onClick={() => setView('menu')}>
                    Annuler
                </Button>
                <Button
                    className="bg-red-800"
                    onClick={() => removeTrip(tripId)}
                >
                    Confirmer
                </Button>
            </div>
        </div>
    );

    return (
        <Popover placement="bottom-end">
            <PopoverHandler>
                <button className="flex flex-col items-center justify-center w-8 h-8 rounded-full bg-gray-400 hover:bg-gray-500">
                    <span className="w-1 h-1 bg-white rounded-full mb-1"></span>
                    <span className="w-1 h-1 bg-white rounded-full mb-1"></span>
                    <span className="w-1 h-1 bg-white rounded-full"></span>
                </button>
            </PopoverHandler>
            <PopoverContent className="w-80">
                {view === 'menu' && <MainMenu />}
                {view === 'participants' && <ParticipantsList />}
                {view === 'confirmKick' && <ConfirmKick />}
                {view === 'confirmDelete' && <ConfirmDelete />}
            </PopoverContent>
        </Popover>
    );
}