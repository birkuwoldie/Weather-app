const notifyElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");

const weather = {};
    weather.temperature = { 
        unit : "celsius"
    }
function displayWeather(){
    iconElement.innerHTML=`<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML =`${weather.temperature.value}° <span>C</span>`;
    descElement.innerHTML =weather.description;
    locationElement.innerHTML =`${weather.city}, ${weather.country}`;
}
function celsiusToFahrenheit(temperature){
    return (temperature*9/5)+32;
}

tempElement.addEventListener("click", function(){
    if(weather.temperature.value===undefined)
       return;
    if(weather.temperature.unit==="celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }
    else {
        tempElement.innerHTML =`${weather.temperature.value}° <span>C</span>`;
        weather.temperature.unit = "celsius";
    }
});
if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else{
    notifyElement.style.display = "block";
    notifyElement.innerHTML = "<p> Browser Doesn't Support Geolocation.</p>";
}
   function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude)
   }  
   function showError(error){
    notifyElement.style.display = "block";
    notifyElement.innerHTML =`<p> ${error.message}</p>`;
   } 
   const kelvin= 273;
   const key ="958d8e4c9fa8b6ec8645792c72052f61";
   function getWeather(latitude,longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api)
        .then(function(response){
            let data = response.json();
             return data;
            })
        .then(function(data){
            weather.temperature.value =Math.floor(data.main.temp -kelvin);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
             })
        .then(function(){
            displayWeather()
        }) ;
 }             
