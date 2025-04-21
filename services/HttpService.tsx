import axios from "axios";
import { AppText } from "../constants/Constants";

export default class HttpService {
    static api_url: string = "http://192.168.40.22:7164/api";
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
    
    private static objToQueryString(obj: { [key: string]: any }): string {
        const keyValuePairs = [];
        for (const key in obj) {
          keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return keyValuePairs.join('&');
      }
}