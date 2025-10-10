let city_name = 'Moscow';
let api_key = 'e8f525c7dcc549ab9dc1f73bc66b80fc';
let api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}&units=metric`;

// Устаревший, но валидный способ
fetch(api_url)
    .then(response => response.json())
    .then(data => console.log("Температура в Москве:", data['main']['temp']))
    .catch(error => console.log(error))


async function fetchWeatherData() {
    try {
        let response = await fetch(api_url);
        if (!response.ok) {
            throw new Error(`http error, status: ${response.status} `)
        }
        let data = await response.json();
        console.log(`Температура в Москве: ${data['main']['temp']}`)
        return data;

    } catch (error) {
        console.error('Ошибка', error);
        throw error;
    }
}

fetchWeatherData();







