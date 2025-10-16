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
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = await response.json();
        return data.current_weather.temperature;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function updateWeather(city) {
    const temp = await fetchWeather(city);
    const tempEl = document.querySelector(".temp");
    tempEl.textContent = temp !== null ? `${temp} °C` : "Weather not available";
}

// Wait until DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".search-box");
    const input = document.querySelector(".search-input");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent form submission / page refresh
        const city = input.value.trim();
        if (!city) return alert("Please enter a city!");
        updateWeather(city);
    });
});
