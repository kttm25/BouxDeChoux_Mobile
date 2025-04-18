
export default class HttpService {
    static api_url: string = "https://10.17.142.196:7164/api";
    public static async getData(path: string, id:string ="", bodyParams: object) {
        const response = await fetch(`${this.api_url}/${path}/${id}`, {
            method: "GET",
            headers: {
                //Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        return data;
    }

    static async postData(path: string, id:string ="", bodyParams: object) {
        
        console.log(`${this.api_url}/${path}/${id}`)
        const response = await fetch(`${this.api_url}/${path}/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyParams),
        });
        console.log("response")
        if (!response.ok) {
            console.error("Error in POST request:", response.statusText);
            throw new Error("Network response was not ok");
        }
        
        const result = await response.json();
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