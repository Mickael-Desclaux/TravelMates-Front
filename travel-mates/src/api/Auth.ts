import { Auth } from "../interfaces/Auth";

export default function HandleSignIn(body: Auth) {
    try {
        console.log(body);
        return body;
    } catch (error) {
        throw new Error(error as string)
    }
}