import { useState, useEffect } from "react";
import { useUnits } from "../../../../context/UnitsContext";
import { useWeather } from "../../../../context/WeatherContext";

function Detail({ location }) {
  const { units } = useUnits();
  const { weather } = useWeather();
  const [time, setTime] = useState("");
  const [sunset, setSunset] = useState("");
  const [sunrise, setSunrise] = useState("");
  const convertSunrise = () => {
    const timeStamp = weather.current.sunrise * 1000; ///milisaniye ile çarpıyoruz//
    let date = new Date(timeStamp);
    //alttaki apı undefined yazınca default olarak locale timezone göre yazar///
    let newSunrise = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setSunrise(newSunrise);
  };
  const convertSunset = () => {
    const timeStamp = weather.current.sunset * 1000; ///milisaniye ile çarpıyoruz//
    let date = new Date(timeStamp);
    //alttaki apı undefined yazınca default olarak locale timezone göre yazar///
    let newSunset = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setSunset(newSunset);
  };
  const convertTime = () => {
    const timeStamp = weather.current.dt * 1000; ///milisaniye ile çarpıyoruz//
    let date = new Date(timeStamp);
    //alttaki apı undefined yazınca default olarak locale timezone göre yazar///
    let newTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setTime(newTime);
  };
  useEffect(() => {
    convertSunrise();
    convertSunset();
    convertTime();
  }, [weather]);

  return (
    <div className="shadow-md shadow-slate-900/50 rounded dark:bg-slate-700 bg-cyan-100 text-slate-700 dark:text-slate-200 h-max">
      <h2 className="text-center text-2xl ">
        {location.city}, {location.country}
      </h2>
      <div className="flex flex-col sm:flex-row">
        <div className="flex-col-auto text-center items-center sm:w-1/4">
          <div className="w-1/3 h-auto mx-auto">
            <img
              src={require(`../../assets/${weather.current.weather[0].icon}.svg`)}
              alt="weather-icon"
            />
          </div>
          <div className="w-full">
            <h2 className="text-3xl">{Math.round(weather.current.temp)}°</h2>
            <h2 className="text-2xl">
              {weather.current.weather[0].description}
            </h2>
            <h2 className="text-2xl">{time}</h2>
          </div>
        </div>
        <div className="flex flex-wrap sm:w-4/5">
          <div className="flex w-1/2 sm:w-1/4 h-auto items-center my-1">
            <img
              className="w-1/2 sm:w-1/4"
              src={require("../../assets/all/sunrise.svg").default}
              alt="weather-icon"
            />
            <div className="w-1/2">
              <p>Sunrise:</p>
              <p>{sunrise}</p>
            </div>
          </div>

          <div className="flex w-1/2 sm:w-1/4 h-auto items-center my-1">
            <img
              className="w-1/2 sm:w-1/4"
              src={require("../../assets/all/thermometer-warmer.svg").default}
              alt="weather-icon"
            />
            <div className="w-1/2">
              <p>Max-Temp:</p>
              <p>{Math.round(weather.daily[0].temp.max)}°</p>
            </div>
          </div>
          <div className="flex w-1/2 sm:w-1/4 h-auto items-center my-1">
            <img
              className="w-1/2 sm:w-1/4"
              src={require("../../assets/all/humidity.svg").default}
              alt="weather-icon"
            />
            <div className="w-1/2">
              <p>Humidity:</p>
              <p>{weather.current.humidity}%</p>
            </div>
          </div>
          <div className="flex w-1/2 sm:w-1/4 h-auto items-center my-1">
            <img
              className="w-1/2 sm:w-1/4"
              src={require("../../assets/all/windsock.svg").default}
              alt="weather-icon"
            />
            <div className="w-1/2">
              <p>Wind Speed:</p>
              <p>
                {Math.round(3.6 * weather.current.wind_speed)}
                {units === "metric" ? "km/h" : "mi/h"}
              </p>
            </div>
          </div>
          <div className="flex w-1/2 sm:w-1/4 h-auto items-center my-1">
            <img
              className="w-1/2 sm:w-1/4"
              src={require("../../assets/all/sunset.svg").default}
              alt="weather-icon"
            />
            <div className="w-1/2">
              <p>Sunset:</p>
              <p>{sunset}</p>
            </div>
          </div>
          <div className="flex w-1/2 sm:w-1/4 h-auto items-center my-1">
            <img
              className="w-1/2 sm:w-1/4"
              src={require("../../assets/all/thermometer-colder.svg").default}
              alt="weather-icon"
            />
            <div className="w-1/2">
              <p>Min-Temp:</p>
              <p>{Math.round(weather.daily[0].temp.min)}°</p>
            </div>
          </div>
          <div className="flex w-1/2 sm:w-1/4 h-auto items-center my-1">
            <img
              className="w-2/5 sm:w-1/4"
              src={require("../../assets/all/celsius.png")}
              alt="weather-icon"
            />
            <div className="w-1/2">
              <p>Feels-Like:</p>
              <p>{Math.round(weather.current.feels_like)}°</p>
            </div>
          </div>
          <div className="flex w-1/2 sm:w-1/4 h-auto items-center my-1">
            <img
              className="w-2/5 sm:w-1/4"
              style={{
                transform: `rotate(${180 + weather.current.wind_deg}deg)`,
              }}
              src={require("../../assets/all/compass.svg").default}
              alt="weather-icon"
            />
            <div className="w-1/2 ">
              <p>Wind Direction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
