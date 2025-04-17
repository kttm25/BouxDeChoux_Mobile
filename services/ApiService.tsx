//import { API_URL } from '@env';

export default class API {
    static async get(url: string, token: string) {
        try {
            const response = await fetch(`${"API_URL"}${url}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
}