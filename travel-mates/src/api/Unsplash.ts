import axios from "axios";

const clientId = import.meta.env.VITE_UNSPLASH_API_KEY;
const baseUrl: string = "https://api.unsplash.com";

export default async function getDestinationImages(query: string, orientation: string = "landscape") {
    try {
        const response = await axios.get(`${baseUrl}/search/photos`, {
            params: {
                query,
                orientation,
                client_id: clientId,
                per_page: 9
            }
        });
        return response;
    } catch (error) {
        throw new Error(error as string);
    }
}
