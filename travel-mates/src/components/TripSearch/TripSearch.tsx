import { IconButton, Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import { useState } from "react";

interface TripSearchProps {
    onFilter: (destination: string, dates: string) => void;
}

export default function TripSearch({ onFilter }: TripSearchProps) {

    // Fake data to test predictive suggestions
    const suggestions: string[] = ["Oslo", "San-Paris", "San-Amsterdam", "San-Andreas", "San Jose", "San Francisco", "San Sebastian"];

    // Predictive suggestions
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

    const formik = useFormik({
        initialValues: {
            destination: "",
            dates: "",
        },
        onSubmit: values => {
            onFilter(values.destination, values.dates);
        }
    });

    // Handle change and update predictive suggestions
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(e);
        const inputValue = e.target.value;
        if (inputValue.length > 1) {
            const filtered = suggestions.filter(suggestion =>
                suggestion.toLowerCase().startsWith(inputValue.toLowerCase())).slice(0, 5);
            setFilteredSuggestions(filtered);
        } else {
            setFilteredSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        formik.setFieldValue("destination", suggestion);
        setFilteredSuggestions([]);
    };

    return (
        <form className="flex justify-center items-center mb-4 mt-8 gap-1 ms-4" onSubmit={formik.handleSubmit}>
            <div className="flex-1">
                <Input
                    label="Destination"
                    name="destination"
                    value={formik.values.destination}
                    onChange={handleInputChange}
                    size="md"
                    className="block w-full"
                    containerProps={{ className: "min-w-[180px]" }}
                    crossOrigin={undefined}
                />
                {filteredSuggestions.length > 0 && (
                    <ul className="absolute left-0 right-0 border border-gray-300 bg-white rounded shadow-lg z-10 max-h-40 overflow-auto">
                        {filteredSuggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="cursor-pointer hover:bg-gray-200 p-2 text-sm"
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="flex-1">
                <Input
                    label="Dates"
                    name="dates"
                    value={formik.values.dates}
                    onChange={formik.handleChange}
                    containerProps={{ className: "min-w-[128px]" }}
                    size="md"
                    className="block w-full"
                    crossOrigin={undefined}
                />
            </div>
            <div className="flex-1">
                <IconButton className="bg-green" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                    </svg>
                </IconButton>
            </div>
        </form>
    )
}
