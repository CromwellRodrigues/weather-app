// fetch all the weather api requests and returns data for a particular location

const API_KEY = process.env.API_KEY;
const GIPHY_API_KEY = process.env.GIPHY_API_KEY;

const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

const GIPHY_URL = 'https://api.giphy.com/v1/gifs/translate'

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


export async function getGif(searchTerm) {
    if(!GIPHY_API_KEY) {
        throw new Error("Missing GIPHY API key");
    }

    const encodedTerm = encodeURIComponent(searchTerm);
    const url = `${GIPHY_URL}?api_key=${GIPHY_API_KEY}&s=${encodedTerm}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error fetching GIF: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();

        return json.data;


    } catch (error) {
        console.error("Error fetching GIF:", error);
        throw error;
    }   
}
