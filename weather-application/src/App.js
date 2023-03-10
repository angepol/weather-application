import { useState, useEffect } from "react";

import "./App.css";

import countries from "i18n-iso-countries";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

function App() {
  // State
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState("Boston");
  const [state, setState] = useState("Boston");

  // API KEY AND URL
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  // Side effect
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl]);

  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const submitHandler = () => {
    setState(getState);
  };

  console.log({ apiData });
  // const formatTemp = (x) => {
  //   x.tofixed(2);
  // };

  const kelvinToFarenheit = (k) => {
    return (k - 273.15) * 1.8 + 32;
  };

  const formatTemp = (kelvinToFarenheit) => {
    return kelvinToFarenheit.toFixed(2);
  };

  return (
    <div className="App">
      <header className="d-flex justify-content-center align-items-center">
        <h2 className="title">Which Weather</h2>
      </header>
      <div className="container">
        <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
          <div className="location">
            <div class="col-auto">
              <label for="location-name" class="col-form-label">
                Enter Location:
              </label>
            </div>
          </div>
          <div className="col-auto">
            <input
              type="text"
              id="location-name"
              class="form-control"
              onChange={inputHandler}
              value={getState}
            />
          </div>
          <button className="btn btn-danger mt-2" onClick={submitHandler}>
            Search
          </button>
        </div>

        <div className="card mt-3 mx-auto" style={{ width: "60vw" }}>
          {apiData.main ? (
            <div class="card-body text-center">
              <img
                src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                alt="weather status icon"
                className="weather-icon"
              />

              <p className="h2">
                {formatTemp(kelvinToFarenheit(apiData.main.temp))}&deg; F
              </p>

              <p className="h5">
                <i className="fas fa-map-marker-alt"></i>{" "}
                <strong>{apiData.name}</strong>
              </p>

              <div className="row mt-4">
                <div className="col-md-6">
                  <p>
                    <i class="fas fa-temperature-low "></i>{" "}
                    <strong>
                      {formatTemp(kelvinToFarenheit(apiData.main.temp_min))}
                      &deg; F
                    </strong>
                  </p>
                  <p>
                    <i className="fas fa-temperature-high"></i>{" "}
                    <strong>
                      {formatTemp(kelvinToFarenheit(apiData.main.temp_max))}
                      &deg; F
                    </strong>
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    {" "}
                    <strong>{apiData.weather[0].description}</strong>
                  </p>
                  <p>
                    <strong>
                      {" "}
                      {countries.getName(apiData.sys.country, "en", {
                        select: "official",
                      })}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      </div>

      <div className="created">
        <code>
          Created by{" "}
          <a href="https://github.com/angepol" font-color="black" target="none">
            Angeline Polidano
          </a>{" "}
          using Open Weather API
        </code>
      </div>
    </div>
  );
}

export default App;
