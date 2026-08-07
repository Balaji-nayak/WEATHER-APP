const apiKey = "fdf6df98764006b704b813f63aaadaca";

async function getWeather(cityName = null) {

    const city = cityName || document.getElementById("city").value;

    if(city==""){
        alert("Please enter a city name");
        return;
    }

    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response=await fetch(url);
    const data=await response.json();

    if(data.cod!=200){
        document.getElementById("weather").innerHTML="<h3>City Not Found!</h3>";
        return;
    }

    const sunrise=new Date(data.sys.sunrise*1000).toLocaleTimeString();
    const sunset=new Date(data.sys.sunset*1000).toLocaleTimeString();

    document.getElementById("weather").innerHTML=`

    <div class="weather-card">

    <h2>${data.name}</h2>

    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">

    <p>🌡 Temperature : ${data.main.temp} °C</p>

    <p>🤗 Feels Like : ${data.main.feels_like} °C</p>

    <p>☁ Weather : ${data.weather[0].description}</p>

    <p>💧 Humidity : ${data.main.humidity}%</p>

    <p>🌬 Wind : ${data.wind.speed} m/s</p>

    <p>👁 Visibility : ${data.visibility/1000} km</p>

    <p>🌅 Sunrise : ${sunrise}</p>

    <p>🌇 Sunset : ${sunset}</p>

    </div>

    `;
}

function getLocation(){

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(async(position)=>{

            const lat=position.coords.latitude;
            const lon=position.coords.longitude;

            const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            const response=await fetch(url);

            const data=await response.json();

            document.getElementById("city").value=data.name;

            getWeather(data.name);

        });

    }
}