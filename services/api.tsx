import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

// Fetch data from API
const getAllEmployeesFromAPI = async() => {
    await fetch("https://dummy.restapiexample.com/api/v1/employees", {
        method: "GET",})
        .then((response) => response.json())
        .then((json) => {
            //setEmployees(json.data)
        })
        .catch((error) => {
            console.error(error);
        });
}

export function useFetch(someArgument: string) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [token] = useCookies(["my-token"]);
  
    useEffect(() => {
      async function fetchData() {
        setLoading(true);
        //setError();
        if (someArgument === 'something') {
          /*const data = await API.getItems(token["my-token"]).catch((err) =>
            setError(err)
          );*/
        } else {
          // do something else
        }
        setData(data);
        setLoading(false);
      }
  
      fetchData();
    }, []);
    return [data, loading, error];
  }