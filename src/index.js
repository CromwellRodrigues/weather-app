import "./styles.css";
import { getLocation } from "./api.js";
import { getWeatherData } from "./weather.js";

const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const content = document.getElementById("content");

const default_city = "London, UK";


function setLoadingState(isLoading) {
    if(!searchBtn) return;

    searchBtn.disabled = isLoading;
    searchBtn.textContent = isLoading ? "Loading..." : "Search";
    searchBtn.classList.toggle("cursor-not-allowed", isLoading);
    searchBtn.classList.toggle("opacity-60", isLoading);

}

async function loadDefaultCity() {
    try {
        cityInput.value = default_city;
        await handleSearch();
    } catch (error) {
        console.error("Error loading default city:", error.message);
        content.innerHTML = `<p class="text-red-700 text-lg border border-sm">Error fetching weather data: ${error.message}</p>`;
    }
}

loadDefaultCity();

async function handleSearch () {
    const city = cityInput.value.trim();

    if(!city) {
        alert ("Please enter a city name");
        return
    }

    try {
        setLoadingState(true);
        content.innerHTML= `<p class="text-blue-100/80 text-center py-6 text-lg">Fetching weather data for ${city}...</p>`;

        const citySearch = await getLocation(city);
        console.log(citySearch);
        const weatherData = getWeatherData(citySearch);
        renderData(weatherData);


    }
    catch (error) { 
        console.error("Error handling search:", error.message);

        

        content.innerHTML = `<p class="text-red-500 bg-rose-200 p-10 border-2 border-rose-500 text-lg">Error fetching weather data. No city found. </p>`;
    }

    finally {
        setLoadingState(false);
    }
}




function renderData(data) { 
    content.innerHTML = `

        <section class="bg-indigo-950 backdrop-blur-md rounded w-full  mx-auto text-center shadow-2xl flex flex-col lg:flex-row lg:justify-between gap-6  text-blue-100 p-6 ">

            <div class="text-left lg:flex-[0.7] lg:pr-6 w-full ">
                <p class="text-lg mb-2 text-blue-100 uppercase">${data.conditions}</p> 
                <p class="text-lg mb-2 text-blue-100/70">${data.description}</p>
                <h2 class="text-3xl text-white/85 font-semibold mb-4 uppercase">${data.city}</h2>
                <h3 class="text-md text-white/85 font-semibold mb-4 uppercase"> ${data.address}, ${data.timezone}</h3>
                <p class="text-4xl mb-2 text-blue-100"> ${data.tempC}°C </p>
                <p class="text-4xl mb-2 text-blue-100/70"> ${data.tempF}°F </p>
            </div>
            
            <div class=" flex-[1.3] text-left  lg:pl-4">
                <p class="text-xs uppercase tracking-wide mb-2 text-blue-100 ">Humidity: 
                <span class="text-white/95 text-2xl font-bold">${data.humidity}%</span></p>
                <p class="text-xs uppercase tracking-wide mb-2">Wind Speed: <span class="text-white/95 text-2xl font-bold">${data.windspeed} km/h </span></p>
                <p class="text-xs uppercase tracking-wide mb-2">Sunrise: <span class="text-white/95 text-2xl font-bold">${data.sunrise}</span></p>
                <p class="text-xs uppercase tracking-wide mb-2">Sunset: <span class="text-white/95 text-2xl font-bold">${data.sunset}</span></p>
             
            </div>
        </section>
    `;




}


searchBtn?.addEventListener("click", handleSearch);
cityInput?.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});




