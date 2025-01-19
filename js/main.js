const btnFetch = document.querySelector("#search-btn");
const loader = document.querySelector("#loader");
const errorStatus = document.querySelector("#error-status");


btnFetch.addEventListener("click", () => {
    const location = document.querySelector("#search-box .container input").value;
    
    if (!location){
        errorMessage();
    };
    
   const url = `https://api.weatherapi.com/v1/current.json?key=4c9e7581c1954214b76201938251001&q=${location}&aqi=no`;

    loader.style.display = "block";

    fetch(url)
        .then(response => {
            if(response.ok){
                console.log(`succeed: ${response.status}`);
            }
            else{
                const errorStatus = document.querySelector("#error-status");
                errorStatus.style.display = "block";
                errorStatus.innerHTML = "Invalid location name.";
                console.log(`HTTPS Error: ${response.status}`);
                setTimeout(() => {
                    errorStatus.style.display = "none";
                }, 3000);
            }

            return response.json();
        })
        .then(data => {
            displayLocation(data);
        })
        .catch(error => {
            console.log(`Error fetching data:`, error);
        })
        .finally(() => {
            loader.style.display = "none";
        });

    const locationInput = document.querySelector("#search-box .container input");
    locationInput.value = "";
});


const displayLocation = (data) => {
    const locationName = document.querySelector("#location-name");
    locationName.innerHTML = `${data.location.name}, ${data.location.country}`;

    const locationTemperature = document.querySelector("#location-temperature");
    locationTemperature.innerHTML = `
    <i class="fa-solid fa-temperature-half"></i>
    ${data.current.temp_c} °C`;

    const locationWeatherIcon = document.querySelector("#condition-icon");
    locationWeatherIcon.src = `${data.current.condition.icon}`;

    const locationTime = document.querySelector("#condition-text");
    locationTime.innerHTML = `${data.current.condition.text}`;

    const humidity = document.querySelector("#humidity");
    humidity.innerHTML = `
    <i class="fa-solid fa-water"></i>
    ${data.current.humidity}% Humidity`;

    const windKmPH = document.querySelector("#wind-kph");
    windKmPH.innerHTML = `
    <i class="fa-solid fa-wind"></i>
    ${data.current.wind_kph} km/h`;
};


const errorMessage = () => {
    const errorBox = document.createElement("div");
    errorBox.classList.add("error-box");

    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container");

    const errorMessage = document.createElement("p");
    errorMessage.innerHTML = `
    <i class="fa-solid fa-triangle-exclamation"></i>
    Please write a location.`;
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

    messageContainer.appendChild(errorMessage);
    messageContainer.appendChild(closeBtn);

    errorBox.appendChild(messageContainer);
    const container = document.querySelector("main .container");
    container.appendChild(errorBox);

    closeBtn.addEventListener("click", () =>{
        container.removeChild(errorBox);
    })

    setTimeout(() => {
        container.removeChild(errorBox);
    }, 3000);
}