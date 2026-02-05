
function  App () {
const fetchWeatherData = async () => {
//access the API key from the env file
const API_KEY =import.meta.env.VITE_WEATHER_API_KEY;
//console.log("API Key:", API_KEY);
const url = `https://api.openweathermap.org/data/2.5/weather?q=Kumasi&appid=${API_KEY}`;

if(!API_KEY) {
  console.error("API key is missing. Please set VITE_WEATHER_API_KEY in your .env file.");
  return;
}

const response = await fetch(url);
const data = await response.json();
console.log(data);

}
return ( 
  <>
    <h1>Weather App</h1>
   <button onClick={fetchWeatherData}>Get Weather Data</button>
  </>
)

}
export default App;