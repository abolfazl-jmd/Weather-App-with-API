const mainTime = document.querySelector(".time");
const title = document.querySelector(".title");
const searchInput = document.querySelector(".search-input");
const searchIcon = document.querySelector(".search-icon");
const weatherContainer = document.querySelector(".weather-wrapper");
const errorMsg = document.querySelector(".error-msg");

// Running the function when the page loaded
window.onload = () => {
  displayTime();

  // Setting the title animation
  //   console.log(title);
  let splitedTitle = title.textContent.split("");
  title.textContent = "";
  //   console.log(splitedTitle);

  //Showing the letters with span
  for (let i = 0; i < splitedTitle.length; i++) {
    title.innerHTML += `<span>${splitedTitle[i]}</span>`;
  }

  let char = 0;
  let timer = setInterval(onLoad, 150);

  function onLoad() {
    //getting all of the charachters
    const span = title.querySelectorAll("span")[char];
    span.classList.add("show");
    // we increase the counter to get ll the spans
    char++;
    // console.log(span);

    // we should avoid the interval to process more than our words length
    if (char === splitedTitle.length) {
      complete();
      return;
    }
  }

  function complete() {
    clearInterval(timer);
    timer = null;
  }
};

const date = new Date();

function displayTime() {
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let session = "A.M";

  //   Setting the consitions
  if (h >= 13) {
    h = h - 12;
    session = "P.M";
  }
  h = h < 10 ? `0${h}` : h;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  //   console.log(h, m, s);

  const time = `${h} : ${m} : ${s} ${session}`;
  //   console.log(time);

  //SETTING HTE INNER HTML OF OUR
  mainTime.innerHTML = time;
}

setInterval(() => {
  displayTime();
}, 1000);

// Getting the users Input

searchIcon.addEventListener("click", searchWeather);

function searchWeather() {
  const inputValue = searchInput.value;
  const apiKey = "caed38fe38d063bae5cc54ada3556bcf";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;

  //console.log(inputValue);

  //Now, we should send a reuest to the api and get the data
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);

      // getting the prometres that we need
      const description = data.weather[0].description;
      const tempretaure = data.main.temp;
      const cityName = data.name;
      const icon = data.weather[0].icon;
      let video;
      // Setting the if for different weathers to change the videos dynamically

      if (icon == "01d" || icon == "01n") {
        video = "sunny";
      } else if (
        icon == "02d" ||
        icon == "03d" ||
        icon == "04d" ||
        icon == "02n" ||
        icon == "03n" ||
        icon == "04n"
      ) {
        video = "cloudy";
      } else if (icon == "50d") {
        video == "Haze";
      } else if (icon == "13d") {
        video = "snowy";
      } else if (icon == "10d" || icon == "09d") {
        video = "rainy";
      } else if (icon == "11d") {
        video = "lightning";
      }

      // getting the date again and show it inside
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let dayName = days[date.getDay()];
      let year = date.getFullYear();
      let dayNum = date.getDate();
      //writing the html markup
      const markup = `<div class="weather-status">
      <video
        src="./assets/Videos/${video}.mp4"
        autoplay
        loop
        muted
        class="background-video"
      ></video>
      <div class="weather">
        <p class="weather-description">${description}</p>

        <h1 class="weather-temp">${tempretaure}°</h1>
      </div>

      <div class="weather-details">
        <div>
          <p class="date">${dayName} ${dayNum} ${year}</p>
        </div>
        <p class="city-name">${cityName}</p>
      </div>
    </div>`;

      //   console.log(cityName, tempretaure, description);

      //adding our markup to the wrapper
      weatherContainer.insertAdjacentHTML("afterbegin", markup);

      errorMsg.innerText = "";
    })
    .catch(() => {
      errorMsg.innerText = "Please enter a valid city or country!";
    });

  //setting the input text to none when the user clicked search button
  searchInput.value = "";
}

// Handling the same function with "ENTER" pressed in keyboard

searchInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    searchWeather();
  }
});
