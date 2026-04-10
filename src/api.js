// fetch all the api data for a particular location 
const API_KEY = process.env.API_KEY;

const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

export async function getLocation  (location)  { 

    const response =  await fetch(`${BASE_URL}${location}?key=${API_KEY}`);

    console.log("Response:", response);
    
    return response;
    
}


