import Header from "./Header/Header";
import Cards from "./Cards/Cards";
import Footer from "./Footer/Footer";
import Loading from "./Loading/Loading";
import { useState, useEffect } from "react";
import { WeatherProvider } from "../../context/WeatherContext";
import { UnitsProvider } from "../../context/UnitsContext";

function Main() {
  const defaultLocationValues = {
    lat: 40.6583361,
    lon: 29.2700004,
    city: "Yalova Merkez",
    country: "TR",
  };
 
  const [location, setLocation] = useState(JSON.parse(localStorage.getItem("location")) || defaultLocationValues);
 
  useEffect(() => {
    localStorage.setItem("location", JSON.stringify(location));
  }, [location]);

  var userLang = navigator.language || navigator.userLanguage; 
  const [isLoaded, setIsloaded] = useState(false);

  return (
    <div className="overflow-x-hidden text-gray dark:text-slate-100 dark:bg-slate-800 h-full w-screen md:h-screen">
      <WeatherProvider>
      <UnitsProvider>
        <Header
          location={location}
          setLocation={setLocation}
          isLoaded={isLoaded}
          setIsloaded={setIsloaded}
          userLang={userLang}
        />
        {isLoaded ? <Cards location={location} userLang={userLang}/> : <Loading />}
        </UnitsProvider>
      </WeatherProvider>
      <Footer />
    </div>
  );
}

export default Main;
