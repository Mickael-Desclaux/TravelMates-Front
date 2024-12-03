import { IconButton, Input } from "@material-tailwind/react";
import { useFormik } from "formik"

interface ChatSearchProps {
    onFilter: (title: string) => void;
}

export default function ChatSearch({ onFilter }: ChatSearchProps) {

    const formik = useFormik({
        initialValues: {title: ""},
        onSubmit: (values) => {
            onFilter(values.title);
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-row items-center">
            <Input
                label="Rechercher une conversation"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                size="lg"
                className="block"
                crossOrigin={undefined}
            />
            <div>
                <IconButton className="bg-green ms-4" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                    </svg>
                </IconButton>
            </div>
        </form>
    )
}