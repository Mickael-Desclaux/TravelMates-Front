import { Button, Input } from "@material-tailwind/react";
import searchIcon from '../../assets/icons/search.svg'
import { useFormik } from "formik";
import { useState } from "react";

export default function TripSearch() {

    // Fake data to test predictive input
    const suggestions: string[] = ["Oslo", "San-Paris", "San-Amsterdam", "San-Andreas", "San Jose", "San Francisco", "San Sebastian"];

    // Predictive suggestions
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

    const formik = useFormik({
        initialValues: { destination: "" },
        onSubmit: values => {
            try {
                Search(values.destination);
            } catch (error) {
                throw new Error(error as string);
            }
        }
    });

    // OnSubmit function
    function Search(destination: string) {
        console.log(destination);
    }

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

    // Close predictive suggestions tab when a suggestion is clicked
    const handleSuggestionClick = (suggestion: string) => {
        formik.setFieldValue("destination", suggestion);
        setFilteredSuggestions([]);
    };

    return (
        <>
            <form className="relative flex justify-evenly mt-8 mb-4" onSubmit={formik.handleSubmit}>
                <div className="relative">
                    <Input
                        label="Destination"
                        name="destination"
                        value={formik.values.destination}
                        onChange={handleInputChange}
                        crossOrigin={undefined}
                    />

                    {/* Predictive suggestions list */}
                    {filteredSuggestions.length > 0 && (
                        <ul className="absolute left-0 right-0 border border-gray-300 bg-white rounded shadow-lg z-10 max-h-40 overflow-auto">
                            {filteredSuggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="cursor-pointer hover:bg-gray-200 p-2"
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <Button className="bg-green" type="submit">
                    <img src={searchIcon} alt="Rechercher" />
                </Button>
            </form>
        </>
    )
}