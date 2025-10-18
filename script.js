async function getLatLong(city) {
    try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.length === 0) return null;
        return [data[0].lat, data[0].lon];
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function fetchWeather(city) {
    const location = await getLatLong(city);
    if (!location) return null;
    const [lat, lon] = location;
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=47dbdf16739160bafc282ac496ddc6f0`);
        const data = await response.json();
        console.log(data)
        const temp=((data.main.temp)-273.15).toFixed(2);
        const place=data.name;
        const humidity=data.main.humidity;
        const feel_like=((data.main.feels_like)-273.15).toFixed(2);
        const wind_speed=data.wind.speed;
        const description=data.weather[0].main;
        const visibility1=(Number(data.visibility))/1000;

        const info=[temp,place,humidity,feel_like,wind_speed,description,visibility1];         
        return info

    } catch (err) {
        console.error(err);
        return null;
    }
}


async function update(city) {
    const info = await fetchWeather(city)
    const tempEl = document.querySelector(".temp");
    const palceEl = document.querySelector(".city");
    const humidityEl = document.querySelector(".humidity");
    const windSpeedEl = document.querySelector(".wind_speed");  
    const descriptionEl = document.querySelector(".condition");
    const feels_like=document.querySelector(".feels_like");
    const visibilityEl=document.querySelector(".visibility");
    const backImg=document.querySelector('.body')
    const backImgModel=document.querySelector('.card-right')
    
   


    tempEl.textContent = info[0] !== null ? `${info[0]} °C` : "Weather not available";
    palceEl.textContent = info[1] !== null ? `${info[1]}` : "Check the city again";
    humidityEl.textContent = info[2] !== null ? `Humidity: ${info[2]}%` : "Humidity not available";
    windSpeedEl.textContent = info[4] !== null ? `Wind Speed: ${info[4]} m/s` : "Wind speed not available";
    descriptionEl.textContent = info[5] !== null ? `${info[5]}` : "Description not available";
    feels_like.textContent=info[3]!== null ? `Feels Like :${info[3]} °C`: " temp is not available";
    visibilityEl.textContent=info[6]!==null? `Visiblity : ${info[6]} km` : "Value is not provided";
    
    switch (info[5]){
        case "Clear":
            backImg.style.backgroundImage='url("img/clear.jpg")';
            backImgModel.style.backgroundImage='url("img/clearModel.jpg")';
            break;
        case "Clouds":
            backImg.style.backgroundImage='url("img/clouds.jpg")'
            backImgModel.style.backgroundImage='url("img/cloudModel.jpg")';
            break;

    }
}


// Wait until DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".search-box");
    const input = document.querySelector(".search-input");
    update("addis abeba");
    

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent form submission / page refresh
        const city = input.value.trim();
        if (!city) return alert("Please enter a city!");

        update(city);
    });
});
function fetchTime(){
    const time= new Date();
    const hour= time.getHours();
    const min= time.getMinutes();
    const second=time.getSeconds();

    const updatetime=document.querySelector(".forecastlist")
    updatetime.innerHTML=`${hour} : ${min}:`;
    


    } 

fetchTime();




