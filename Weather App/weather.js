//https://openweathermap.org/api
//API key : 0dcad4cc66fc2e495757be1b55129e18
// If making a request from local host is not possible use this: https //cors-anywhere.herokuapp.com/ which acts as a proxy
// Use the proxy at the beginning of API link with ${}
//const apiKey = '0dcad4cc66fc2e495757be1b55129e18';

window.addEventListener("load", () => {
  let lat;
  let lon;
  const temperatureDegree = document.getElementById("temp-degree");
  const temperatureDescription = document.getElementById("temp-description");
  const locationTimezone = document.getElementById("timezone");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((showPosition) => {
      // console.log(showPosition);
      lat = showPosition.coords.latitude;
      lon = showPosition.coords.longitude;

      const apiKey = "0dcad4cc66fc2e495757be1b55129e18";
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const temperature = data.main.temp;
          const description = data.weather[0].description;
          const location = data.name;
          //   console.log(temperature);
          //   console.log(description);
          temperatureDegree.innerHTML = temperature + " °C";
          temperatureDescription.innerHTML = description;
          locationTimezone.innerHTML = location;
        });
    });
  }
});
