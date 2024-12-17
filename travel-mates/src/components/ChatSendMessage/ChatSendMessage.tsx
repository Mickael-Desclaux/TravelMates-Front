import { IconButton, Input } from "@material-tailwind/react";
import { useFormik } from "formik"

interface SendMessageProp {
    sendMessage: (text: string) => void;
}

export default function ChatSendMessage({sendMessage}: SendMessageProp) {

    const formik = useFormik({
        initialValues: {text: ""},
        onSubmit: values => (
            sendMessage(values.text)
        )
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit} className="flex flex-row items-center">
                <Input
                    label="Envoyer un message"
                    name="text"
                    value={formik.values.text}
                    onChange={formik.handleChange}
                    size="lg"
                    className="block"
                    crossOrigin={undefined}
                />
                <div>
                    <IconButton className="bg-green ms-2" type="submit">
                        <svg width="32px" height="32px" viewBox="-2.5 -2.5 30.00 30.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FFFFFF"><g id="SVGRepo_bgCarrier" strokeWidth="0"><rect x="-2.5" y="-2.5" width="30.00" height="30.00" rx="3.6" fill="#185C22" strokeWidth="0"></rect></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.16109 12.9424L2.91109 12.4324C2.42109 12.3124 2.35109 11.6724 2.80109 11.4624L20.7111 3.55243C21.1811 3.34243 21.6711 3.81243 21.4411 4.25243L13.0111 21.2124C12.7811 21.6424 12.1211 21.5724 12.0011 21.1124L11.1711 13.2124L18.4411 6.41243" stroke="#FFFFFF" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </IconButton>
                </div>
            </form>
        </>
    )
}