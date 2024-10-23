import { Button, Input, Typography, Textarea } from "@material-tailwind/react";
import ActivityPicker from "../../components/ActivityPicker/ActivityPicker";
import { Field, Form, Formik } from "formik";
import { Pin } from "../../interfaces/Pin";

export default function PinCreate() {

    const defaultValues: Pin = {
        title: "",
        description: "",
        medias: [],
        activities: []
    }

    function onSubmit(values: Pin) {
        console.log(values)
    }

    return (
        <>
            <Typography variant="h1" color="black" className="text-center mt-8 text-2xl font-title">
                Créer un marqueur
            </Typography>
            <Formik
                initialValues={defaultValues}
                onSubmit={onSubmit}
            >
                {({ isSubmitting, handleChange, setFieldValue, values }) => (
                    <Form>
                        <div className="flex justify-center">
                            <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                                <div className="mb-1 flex flex-col gap-6">
                                    <Typography variant="h6" className="-mb-3">
                                        Titre
                                    </Typography>
                                    <Field
                                        component={Input}
                                        name="title"
                                        id="title"
                                        value={values.title}
                                        onChange={handleChange}
                                        type="text"
                                        size="lg"
                                        placeholder="Tour Eiffel, Kilimandjaro, etc..."
                                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"/>
                                    <Typography variant="h6" className="-mb-3">
                                        Description
                                    </Typography>
                                    <Field
                                        component={Textarea}
                                        name="description"
                                        id="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        type="text"
                                        size="lg"
                                        placeholder="Décrivez le marqueur"
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}/>
                                    <Typography variant="h6" className="-mb-3">
                                        Images
                                    </Typography>
                                    <Field
                                        component={Input}
                                        value={values.medias}
                                        id="medias"
                                        type="file"
                                        size="lg"
                                        multiple
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const files = event.currentTarget.files;
                                            const fileArray = Array.from(files || []);
                                            setFieldValue("medias", fileArray);
                                        }}
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }} crossOrigin={undefined} />
                                    <Typography variant="h6" className="-mb-3">
                                        Activités
                                    </Typography>
                                    <ActivityPicker />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Button type="submit" size="lg" disabled={isSubmitting} className="bg-green -mb-3 mb-12">
                                Valider
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}