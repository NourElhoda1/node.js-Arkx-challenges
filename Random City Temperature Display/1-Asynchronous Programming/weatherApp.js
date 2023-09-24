const cities = require('./cities');

function selectRandomCity(cities) {
  const randomIndex = Math.floor(Math.random() * cities.length);
  return cities[randomIndex];
}

async function fetchTemperature() {
  const city = selectRandomCity(cities)
  const { name, lat, lng } = city;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${Number(lat)}&longitude=${Number(lng)}&current_weather=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const temperature = data.current_weather.temperature;
    console.log( `The temperature in ${name} is ${temperature} degree Celesius`);
  } catch (error) {
    console.log(error);
  }
}

fetchTemperature();