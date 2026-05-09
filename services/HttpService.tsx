import axios from "axios";
import { AppText } from "../constants/Constants";
import { NativeModules } from "react-native";

export default class HttpService {
    private static envApiUrl: string | undefined =
        (globalThis as any)?.process?.env?.API_URL 
    private static defaultApiUrl: string = "http://192.168.2.68:5018/api";
    static api_url: string = HttpService.normalizeApiUrl(
        HttpService.envApiUrl ?? HttpService.inferDevApiUrl() ?? HttpService.defaultApiUrl
    );

    private static inferDevApiUrl(): string | undefined {
        const scriptURL = NativeModules.SourceCode?.scriptURL;

        if (!scriptURL) {
            return undefined;
        }

        try {
            const { hostname } = new URL(scriptURL);
            return hostname ? `http://${hostname}:7164/api` : undefined;
        } catch {
            return undefined;
        }
    }

    private static normalizeApiUrl(url: string): string {
        const trimmedUrl = url.trim().replace(/\/+$/, "");
        return trimmedUrl.toLowerCase().endsWith("/api") ? trimmedUrl : `${trimmedUrl}/api`;
    }
    public static async getData(path: string, id:string ="", bodyParams: object) {
        const response = await fetch(`${this.api_url}/${path}/${id}`, {
            method: "GET",
            headers: {
                //Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        if (!response.ok) {
            console.log("Bad request :", response);
            throw new Error(response.statusText);
        }
        const data = await response.json();
        return data;
    }

    static async postData(path: string, id:string ="", bodyParams: object) {
        const response = await fetch(`${this.api_url}/${path}/${id}`, {
            method: "POST",
            headers: {
                //Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(bodyParams),
        });
        if (!response.ok) {
            if(response.status === 401) {
                console.log("Unauthorized access - 401:", response.status);
                
                const result = await response.json();
                throw new Error("Unauthorized");
            } 
            else if(response.status === 409) {
                console.log("Conflict - 409:", response.status);
                const result = await response.json();
                throw new Error("Conflict");
            }
            console.log("Bad request :", response);
            const result = await response.json();
            console.log("Error details:", result);
            alert(AppText.badRequest);
            return null;
        }
        const result = await response.json();
        console.log("Response :", result);
        return result;
    }

    static async putData(path: string, id:string ="", bodyParams: object) {
        const response = await fetch(`${this.api_url}/${path}/${id}`, {
            method: "PUT",
            headers: {
                //Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(bodyParams),
        });
        if (!response.ok) {
            if(response.status === 401) {
                console.log("Unauthorized access - 401:", response.status);
                
                const result = await response.json();
                throw new Error("Unauthorized");
            } 
            else if(response.status === 409) {
                console.log("Conflict - 409:", response.status);
                const result = await response.json();
                throw new Error("Conflict");
            }
            console.log("Bad request :", response);
            const result = await response.json();
            console.log("Error details:", result);
            alert(AppText.badRequest);
            return null;
        }
        const result = await response.json();
        console.log("Response :", result);
        return result;
    }

    static async deleteData(path: string, id:string ="", bodyParams: object = {}) {
        const response = await fetch(`${this.api_url}/${path}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(bodyParams),
        });

        if (!response.ok) {
            if(response.status === 401) {
                console.log("Unauthorized access - 401:", response.status);
                throw new Error("Unauthorized");
            }

            if(response.status === 409) {
                console.log("Conflict - 409:", response.status);
                throw new Error("Conflict");
            }

            console.log("Bad request :", response);
            throw new Error(response.statusText || "Delete failed");
        }

        const text = await response.text();
        if (!text) {
            return { success: true };
        }

        const result = JSON.parse(text);
        console.log("Response :", result);
        return result;
    }
    
    private static objToQueryString(obj: { [key: string]: any }): string {
        const keyValuePairs = [];
        for (const key in obj) {
          keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return keyValuePairs.join('&');
      }
}