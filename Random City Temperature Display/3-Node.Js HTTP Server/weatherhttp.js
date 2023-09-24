const http = require('http');
const server = require('server');
const axios = require('axios');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if(pathname === '/weather'){
        const cityName = parsedUrl.query.city;
        if(!cityName){
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('City Not Found In The Query Parameter.');
        }else{
            const apiKey = 'API_KEY';
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

            axios.get(weatherUrl)
        .then(response => {
          const temperature = response.data.main.temp;
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(`The temperature in ${cityName} is ${temperature}°C.`);
        })

        .catch(error => {
            console.error(error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('An error occurred while fetching the weather data.');
          });
        }
    }else{
        res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found.');
    }
})
server.listen(8000, () => {
    console.log('Server is listening on port 3000');
});