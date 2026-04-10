import "./styles.css";
import { getLocation } from "./api.js";
console.log("Webpack is working!");



// 
async function displayLocation() {

    try {

        const data = await getLocation("New York");

        console.log("Weather Data:", data);
    
    } catch (error) {
        console.error("Error displaying location:", error);
    
    }

}
displayLocation();