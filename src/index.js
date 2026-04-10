import "./styles.css";
import { getLocation } from "./api.js";
console.log("Webpack is working!");



// 
async function displayLocation() {
    const response = await getLocation("New York");

    const data = await response.json();

    console.log("Weather Data:", data);
}

displayLocation();