import { Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import { useState } from "react";
import { MapPin } from "../../interfaces/Pin";

interface PinSearchProps {
    suggestions: MapPin[];
    onSearch: (title: string) => void;
}

export default function PinSearch({suggestions, onSearch}: PinSearchProps) {

    const [filteredSuggestions, setFilteredSuggestions] = useState<MapPin[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(e);
        const inputValue = e.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (inputValue.length > 1) {
            const filtered = suggestions.filter(suggestion =>
                suggestion.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").startsWith(inputValue)
            ).slice(0, 5);
            setFilteredSuggestions(filtered);
        } else {
            setFilteredSuggestions([]);
        }
    };


    const handleSuggestionClick = (suggestion: MapPin) => {
        formik.setFieldValue("title", suggestion.title);
        formik.setFieldValue("longitude", suggestion.longitude);
        formik.setFieldValue("latitude", suggestion.latitude);
        setFilteredSuggestions([]);
    };


    const formik = useFormik({
        initialValues: {
            title: "",
            longitude: 0,
            latitude: 0,
        },
        onSubmit: values => {
            onSearch(values.title);
            setFilteredSuggestions([]);
        }
    })

    return (
        <>
            <form className="flex items-center" onSubmit={formik.handleSubmit}>
                <Input label="Lieu"
                    name="title"
                    onChange={handleInputChange}
                    value={formik.values.title}
                    className="block min-w-[150px] md:w-full bg-white relative"
                    containerProps={{ className: "min-w-full" }}
                    crossOrigin={undefined}
                />
                {filteredSuggestions.length > 0 && (
                    <ul className="absolute left-0 right-0 border border-gray-300 bg-white rounded shadow-lg z-10 max-h-40 overflow-auto top-full">
                        {filteredSuggestions.map((suggestion) => (
                            <li
                                key={suggestion.id}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="cursor-pointer hover:bg-gray-200 p-2 text-sm"
                            >
                                {suggestion.title}
                            </li>
                        ))}
                    </ul>
                )}
                <button className="bg-green ms-4 rounded-lg" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-[36px] aspect-ratio-1 p-2">
                        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                    </svg>
                </button>
            </form>
        </>
    )
}