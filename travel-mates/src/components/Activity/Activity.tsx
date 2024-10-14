import { Typography } from "@material-tailwind/react";
import checkedIcon from '../../assets/activity/checked.svg';

interface ActivityProps {
    id: number;
    name: string;
    iconPath: string;
    isSelected: boolean;
    onToggle: () => void;
}

export default function Activity({ id, name, iconPath, isSelected, onToggle }: ActivityProps) {
    return (
        <div className="flex flex-col items-center align-middle">
            <button onClick={onToggle} className="p-2 rounded-lg transition-all"
                type="button" value={id}>
                {isSelected ? (
                    <img src={checkedIcon} alt="Check" />
                ) : (
                    <img src={iconPath} alt={name} />
                )}
                <Typography
                    variant="h2"
                    className="font-title text-lg">
                    {name}
                </Typography>
            </button>
        </div>
    );
}

