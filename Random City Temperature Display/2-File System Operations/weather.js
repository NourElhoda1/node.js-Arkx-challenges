const fs = require('fs');
const fetch = require('node-fetch'); 

var cities = [];

fs.readFile('input.txt', 'utf8', async (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  var lines = data.trim().split('\n');

  for (let i = 0; i < lines.length; i++) { 
    cities.push(JSON.parse(lines[i]));
  }

  console.log(cities);

  function randomCity() {
    randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
  };

  async function fetchTemperature() { 
    try {
      const city = randomCity();
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current_weather=true`
      );
      const data = await response.json();
      const message = `Today's temperature in ${city.name}: ${data.current_weather.temperature} C`;
      const dir = fs.readdirSync(__dirname);

      console.log(message);

      for (let j = 0; j < dir.length; j++) {
        if (dir[j] === `${city.name}.txt`) {
          fs.unlinkSync(`${__dirname}/${city.name}.txt`);
        }
      }

      fs.writeFileSync(`${__dirname}/${city.name}.txt`, message); 

    } catch (err) {
      console.log(err);
    }
  };

  await fetchTemperature(); 

});
