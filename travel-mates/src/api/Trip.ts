import type { TripConditions } from "../interfaces/TripConditions";

export default function addTripConditions(body: TripConditions) {
    try {
        console.log(body);
        return body;
    } catch (error) {
        throw new Error(error as string);
    }
}
