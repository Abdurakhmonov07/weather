const details = document.querySelector(".data");
const info = document.querySelector(".fullInfo");

const field = document.querySelector(".field");
const btn = document.querySelector(".search-button");
const cityBtn = document.querySelectorAll(".city");

const showBlock = document.querySelector(".showBlock");
const errDisplay = document.querySelector(".city-name");
const clear = function () {
  details.innerHTML = "";
  info.innerHTML = "";
};

const loadResults = async function (name) {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=b5e79c41958c63461ec5a7f8468ccb7d`
    );

    const res = await data.json();

    return res;
  } catch (err) {
    throw err;
  }
};

const render = async function (name = "Jizzakh") {
  clear();

  const res = await loadResults(name);
  console.log(res);

  const date = new Date(res.dt * 1000);

  const markUpDetails = `
    <div>
              <h2>Weather details</h2>
            </div>
            <div style="margin-top: 15px">
              <h3>Clouds: <span>${res.clouds.all}%</span></h3>
            </div>
            <div>
              <h3>Visibility: <span>${res.visibility / 1000}km</span></h3>
            </div>
            <div>
              <h3>Humidity: <span>${res.main.humidity}%</span></h3>
            </div>
            <div>
              <h3>Wind: <span>${res.wind.speed}m/s</span></h3>
            </div>
  `;

  const minutes = "0" + date.getMinutes();
  const year = String(date.getFullYear());
  let src, bgImage;

  if (res.rain) {
    bgImage = "./images/rainy.jpeg";
    src = "./images/rain.jpg";
  } else if (
    res.weather[0].main === "Smoke" ||
    res.weather[0].main === "Mist"
  ) {
    src = "./images/mist.png";
    bgImage = "./images/mist-w.jpeg";
  } else if (res.weather[0].main === "Snow") {
    src = "./images/snowIcon.jpg";
    bgImage = "./images/snow.jpg";
  } else if (res.weather[0].main === "Clouds") {
    src = "./images/cloud.ico";
    bgImage = "./images/rainy.jpeg";
  } else {
    bgImage = "./images/sunny.jpg";
    src = "./images/sun.png";
  }

  showBlock.style = "background-image:url('')";
  showBlock.style = `background-image:url(${bgImage})`;

  const markUpInfo = `
      <div class="temperature">
              <h1>${Math.round(res.main.temp - 273.15)}°</h1>
            </div>
            <div class="cityData">
              <h2>${res.name}</h2>
              <p>${date.getHours()}:${minutes.slice(
    -2
  )}-${date.toLocaleDateString("en-US", {
    weekday: "short",
  })},${date.getDate()} ${date.toLocaleString("default", {
    month: "short",
  })}'${year.slice(-2)}</p>
              </div>
            <div class="weather">
              <img
                alt="weather"
                src="${src}"
                style="height: 40px; width: 40px"
              />
              <h3>${res.weather[0].description}</h3>
            </div>
  `;

  details.insertAdjacentHTML("afterbegin", markUpDetails);
  info.insertAdjacentHTML("afterbegin", markUpInfo);
};

const getQuery = function () {
  const query = field.value;
  field.value = "";
  return query;
};

//Searching a city implementation
const addHandlerSearch = function () {
  btn.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      render(getQuery());
    }
  });
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    render(getQuery());
  });
};

//---------------------

const cityOptionsRender = function () {
  cityBtn.forEach((city) => {
    city.addEventListener("click", function (e) {
      e.preventDefault();
      render(e.target.innerHTML);
    });
  });
};

const run = function () {
  render();
  addHandlerSearch();
  cityOptionsRender();
};
run();

//clear,Clouds,rain,sunny
