// fetch all the weather api requests and returns data for a particular location

const API_KEY = process.env.API_KEY;

const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

export async function getLocation  (location)  {
    
    try {

        if (!API_KEY) {
            throw new Error("API key is not defined. Please set the API_KEY environment variable.");
        }

        const encodedLocation = encodeURIComponent(location);
        const url = `${BASE_URL}${encodedLocation}?key=${API_KEY}`;


        const response =  await fetch(url);

        if(!response.ok) {
            throw new Error(`Error fetching weather data: ${response.status} ${response.statusText}`);

        }

        const data = await response.json();

        return data;

    }catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
}
}

