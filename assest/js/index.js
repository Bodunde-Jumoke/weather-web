const apiKey="bec7908b122f419e46c35ab78870ac7d";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector('.search input')
const searchBtn = document.querySelector('.search button')
const weatherIcon =document.querySelector('.weather-icon')
const errMsg = document.querySelector( '.errMsg')


function  checkWeather(city){
    fetch(apiUrl + city + `&appid=${apiKey}`)
    .then(response => {
        if (!response.ok){
            throw new Error('er')
        }
        return response.json()
        
    })
    .then(data => {
        errMsg.style.display = 'none'
        document.querySelector('.city').innerHTML = data.name
        document.querySelector('.temp').innerHTML =  Math.round(data.main.temp)+ '°C'
        document.querySelector('.percent').innerHTML = data.main.humidity + "%" 
        document.querySelector('.rate').innerHTML = data.wind.speed + " km/h"
    
    
        if (data.weather[0].main == 'Clouds'){
            weatherIcon.src= './assest/images/clouds.png';
        }
        else if(data.weather[0].main == 'Rain'){
            weatherIcon.src = "./assest/images/rain.png"
        }
        else if(data.weather[0].main == 'Drizzle'){
            weatherIcon.src = "./assest/images/drizzle.png"
        }
        else if(data.weather[0].main == 'Mist'){
            weatherIcon.src = "./assest/images/mist.png"
        }
        else if(data.weather[0].main == 'Clear'){
            weatherIcon.src = "./assest/images/clear.png"
        }
    })
    .catch(err => {
        showError("City not found, pls enter correct name");
    })


}
        
searchBox.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      searchBtn.click();
    }
  });
  
  const search = () => {
    const searchTerm = searchBox.value;
    // Check if the city name is empty
    if (!searchTerm) {
      showError("Please enter a city name.");
      return;
    }
    console.log(`Searching for: ${searchTerm}`);
    checkWeather(searchBox.value);
}
  searchBtn.addEventListener('click', search)


  function showError(message) {
    errMsg.textContent = message;
    errMsg.style.visibility = 'visible';
  }
  
  // Function to hide the error message
  function hideError() {
    errMsg.style.visibility = 'visible';
  }
