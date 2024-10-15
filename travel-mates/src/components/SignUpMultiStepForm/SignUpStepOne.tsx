import { Typography } from "@material-tailwind/react";
import { Field, ErrorMessage } from "formik";

export default function SignUpStepOne() {
    return (
        <>
            <div className="mx-auto mt-8 max-w-[24rem] text-left">
                <div className="mb-6">
                    <label htmlFor="email">
                        <Typography
                            variant="h6"
                            className="mb-2 block font-large text-black-900"
                        >
                            Email
                        </Typography>
                    </label>
                    <Field
                        id="email"
                        color="gray"
                        type="email"
                        name="email"
                        placeholder="Votre email"
                        className="w-full mb-2 bg-transparent placeholder:text-slate-400 text-gray-900 text-sm border border-gray-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500" />
                </div>
                <div className="mb-6">
                    <label htmlFor="password">
                        <Typography
                            variant="h6"
                            className="mb-2 block font-large text-gray-900"
                        >
                            Mot de passe
                        </Typography>
                    </label>
                    <Field
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Choisir un mot de passe"
                        className="w-full mb-2 bg-transparent placeholder:text-slate-400 text-gray-900 text-sm border border-gray-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500" />
                </div>
                <div className="mb-2">
                    <label htmlFor="password">
                        <Typography
                            variant="h6"
                            className="mb-2 block font-large text-gray-900"
                        >
                            Confirmer votre mot de passe
                        </Typography>
                    </label>
                    <Field
                        id="confirmedPassword"
                        type="password"
                        name="confirmedPassword"
                        placeholder="Confirmer votre mot de passe"
                        className="w-full mb-2 bg-transparent placeholder:text-slate-400 text-gray-900 text-sm border border-gray-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300"
                    />
                    <ErrorMessage name="confirmedPassword" component="div" className="text-red-500" />
                </div>
            </div>
        </>
    );
}