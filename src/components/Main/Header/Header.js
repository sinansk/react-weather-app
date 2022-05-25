import { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "../../../context/ThemeContext";
import { useWeather } from "../../../context/WeatherContext";
import { useUnits } from "../../../context/UnitsContext";


function Header({ location, setLocation, setIsloaded, userLang }) {
  const { theme, setTheme } = useTheme();
  const { setWeather } = useWeather();
  const { units, setUnits} = useUnits()

  useEffect(() => {
    requestWeather();
  }, [location]);

  const [form, setForm] = useState("");
  const onChangeInput = (e) => {
    setForm(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (form === "") {
      return false;
    }
    requestCoords();
  };

  async function requestCoords() {
    let q = form;
    console.log(q);
    let API = process.env.REACT_APP_API_KEY;
    let searchURL =
      "http://api.openweathermap.org/geo/1.0/direct?q=" + q + "&appid=" + API;
    const response = await axios(searchURL);
    setLocation({
      lat: response.data[0].lat,
      lon: response.data[0].lon,
      city: response.data[0].name,
      country: response.data[0].country,
    });
  }
  function handleUnits() {
    setUnits(units === "metric" ? "imperial" : "metric");
  }

  useEffect(() => {
    requestWeather();
  }, [units])

  async function requestWeather() {
    let API = process.env.REACT_APP_API_KEY;
    let searchURL =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      location.lat +
      "&lon=" +
      location.lon +
      "&units=" +
      units +
      "&exclude=minutely,hourly&lang=" +
      userLang +
      "&appid=" +
      API;
    const response = await axios(searchURL);
    setWeather(response.data);
    setIsloaded(true);
  }

  function toggleDark() {
    setTheme(theme === "dark" ? "light" : "dark");
  }


  return (
    <div className="py-2 md:flex md:items-center md:justify-between w-11/12 mx-auto">
    <div className="flex items-center justify-center" >
      <button
          id="theme-toggle"
          type="button"
          className="mr-2 dark:text-slate-100 text-yellow-300 bg-transparent dark:hover:bg-slate-700 hover:bg-cyan-400 focus:outline-none ring-1 ring-cyan-100  dark:ring-slate-100 rounded-lg text-sm p-2.5"
          onClick={toggleDark}
        >
          <svg
            id="theme-toggle-dark-icon"
            className={"w-5 h-5 " + (theme !== "dark" ? "hidden" : "")}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
          </svg>
          <svg
            id="theme-toggle-light-icon"
            className={"w-5 h-5 " + (theme !== "dark" ? "" : "hidden")}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
           
          >
            <path
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <button
          id="units-toggle"
          type="button"
          className="flex justify-center items-center w-10 h-10 dark:text-slate-100 text-yellow-300 bg-transparent dark:hover:bg-slate-700 hover:bg-cyan-400 focus:outline-none ring-1 ring-cyan-100  dark:ring-slate-100 rounded-lg text-sm p-2.5"
          onClick={handleUnits}
        >
          <span
            id="toggle-unit-celcius"
            className={"text-xl " + (units === "metric" ? "" : "hidden")}
          >
            ℃
          </span>
          <span
            id="toggle-unit-fahren"
            className={"text-xl " + (units !== "metric" ? "" : "hidden")}
          >
            ℉
          </span>
        </button>
      </div>
    
    <div className="w-full md:w-1/2 mx-auto">
      <form
        className="text-gray-900 flex items-center justify-center my-2"
        onSubmit={onSubmit}
      >
        <input
          className="rounded p-2 w-full"
          placeholder="Search..."
          type="text"
          onChange={onChangeInput}
          value={form.value}
        ></input>
        <button className="flex items-center justify-center pl-2 ">
          <svg
            className="w-6 h-6 text-gray-100"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
          </svg>
        </button>
      </form>
      </div>
    </div>
  );
}

export default Header;
