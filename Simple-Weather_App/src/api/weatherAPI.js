const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = import.meta.env.VITE_API_URL

export const getFullInfo = async (city) => {
  const response = await fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=3&aqi=yes&alerts=yes`
  )
  const data = await response.json()
  return data
}

export const getCurrentWeather = async (city) => {
  const response = await fetch(
    `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`
  );
  const data = await response.json();
  return data; 
};

export const getForecastWeather = async (city, days = 3) => {
  const response = await fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=${days}&aqi=yes&alerts=yes`
  );
  const data = await response.json();
  return data; 
};

export const getHourlyForecast = async (city) => {
  const data = await getForecastWeather(city, 1);
  return data.forecast.forecastday[0].hour;
};

export const getWindScore = async(city ) =>{
    const data = await getCurrentWeather(city)
    return data.current.wind_kph;
}