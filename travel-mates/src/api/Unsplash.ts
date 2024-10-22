import axios from "axios";

const clientId = import.meta.env.VITE_UNSPLASH_API_KEY;
const baseUrl: string = "https://api.unsplash.com";

const orientation: string = "landscape";
const resultPerPage: number = 9;

export default async function getDestinationImages(query: string,) {
    try {
        const response = await axios.get(`${baseUrl}/search/photos`, {
            params: {
                query: query + ' city',
                orientation: orientation,
                client_id: clientId,
                per_page: resultPerPage,
            }
        });
        return response;
    } catch (error) {
        throw new Error(error as string);
    }
}
