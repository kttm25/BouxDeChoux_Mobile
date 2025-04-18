
import HttpService from "./HttpService";

export default class ApiService {
    static async Login(username: string, password: string) {
        const response = await HttpService.postData("auth/login", "", { username, password })
            .then((res) => {
                if (res.status === 200) {
                    console.log("Login successful:", res.data);
                    // Store the token in local storage or cookies if needed
                    return res.data;
                } else {
                    console.error("Login failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.error("Login error:", error.message);
                throw error;
            });
        return response;
    }
}