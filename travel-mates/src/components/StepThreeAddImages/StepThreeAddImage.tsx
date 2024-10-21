import { Button, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import getDestinationImages from "../../api/Unsplash";
import { useFormik } from "formik";
import { array, object } from "yup";

interface ImageType {
    id: string;
    alt_description: string;
    urls: {
        small: string;
    };
    user: {
        first_name: string;
        last_name: string;
        links: {
            html: string;
        }
    }
}

export default function AddImage() {
    const query: string = "Paris";

    const { data, isLoading, isError } = useQuery({
        queryKey: ["images", query],
        queryFn: () => getDestinationImages(query),
        enabled: true,
    });

    function handleSelect(url: string) {
        const currentUrls = formik.values.urls;
        if (currentUrls.includes(url)) {
            formik.setFieldValue("urls", currentUrls.filter(u => u !== url));
        } else {
            formik.setFieldValue("urls", [...currentUrls, url]);
        }
    }

    function AddImages(urls: string[]) {
        console.log(urls);
    }

    const formik = useFormik({
        initialValues: {
            urls: [] as string[]
        },
        validationSchema: object({
            urls: array().min(1, "Veuillez sélectionner au moins une image").max(3, "Veuillez sélectionner 3 images maximum")
        }),
        onSubmit: values => {
            AddImages(values.urls);
        }
    })

    return (
        <>
            <Typography variant="h1" className="font-title text-2xl text-center mt-8 mb-8">Ajouter des images</Typography>
            <Typography variant="lead" className="text-lg text-center m-8">Sélectionnez jusqu'à 3 images pour illustrer votre trip :</Typography>
            <div className="flex justify-center">
                <form onSubmit={formik.handleSubmit}>
                    {isLoading && <span>Loading...</span>}
                    {isError && <span>Erreur</span>}

                    {formik.touched.urls && formik.errors.urls ? (
                        <div className="text-red-900 text-center -mt-4 mb-6">{formik.errors.urls}</div>
                    ) : null}

                    <div className="grid gap-4 md:grid-cols-3 grid-rows-3">
                        {
                            data && data.data.results.map((image: ImageType) => (
                                <button type="button" key={image.id} className="relative ms-6 me-6" onClick={() => handleSelect(image.urls.small)}>
                                    <img
                                        src={image.urls.small}
                                        alt={image.alt_description}
                                        className={`rounded-lg h-full ${formik.values.urls.includes(image.urls.small) ? "border-solid border-4 border-green" : ""}`}
                                    />
                                    <span
                                        className="absolute bottom-2 right-2 bg-black text-white text-xs px-3 py-1 rounded-md"
                                        style={{ zIndex: 1 }}
                                    >
                                        Photo prise par{" "}
                                        <a href={image.user.links.html} className="underline">
                                            {image.user.first_name} {image.user.last_name}
                                        </a>{" "}
                                        sur{" "}
                                        <a href="https://unsplash.com" className="underline">
                                            Unsplash
                                        </a>
                                    </span>
                                </button>
                            ))
                        }
                    </div>
                    <div className="flex justify-center">
                        <Button className="bg-green text-center m-8" type="submit">Valider et créer mon trip</Button>
                    </div>
                </form >
            </div>
        </>
    );
}
