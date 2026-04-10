import "./styles.css";
import { getLocation } from "./api.js";
import { getGif} from "./api.js";



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


async function displayGif() {
    try {
        const gif = await getGif("sunny");
        console.log("GIF:", gif);
        console.log("GIF url:", gif.images?.original?.url);

        const img = document.getElementById("gif-display");

        if(!img) return;

        const gifUrl = gif.images?.original?.url;

        if (!gifUrl) {
            throw new Error("No GIF URL returned from Giphy");

        }
        img.src = gifUrl;
        img.alt = gif.title || "Weather GIF";

        } catch (error) {
        console.error("Error displaying GIF:", error);

    }
}

displayGif();