// return  object with city name, country, temperature, weather description, icon, gif, local time and date


export function getWeatherData(location) {
    
    try {
        const fahrenheit = location.currentConditions.temp;
        const celsius = (((fahrenheit - 32) * 5) / 9).toFixed(1);

        return {
            
            city : location.address,
            tempF: location.currentConditions.temp,
            tempC: celsius,
            description : location.description,
            
            date : new Date(location.currentConditions.datetimeEpoch * 1000).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            sunrise: location.currentConditions.sunrise,
            sunset: location.currentConditions.sunset,
            humidity: location.currentConditions.humidity,
            windspeed: location.currentConditions.windspeed,
            conditions: location.currentConditions.conditions,
            timezone : location.timezone,
            address : location.resolvedAddress
        }



    } catch (error) {
        console.error("Error getting weather data:", error);
        throw error;
    }   


}



