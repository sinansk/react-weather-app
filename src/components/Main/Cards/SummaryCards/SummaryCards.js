import React, { useEffect } from "react";
import { useWeather } from "../../../../context/WeatherContext";
import SummaryCard from "./SummaryCard/SummaryCard"


function SummaryCards({userLang}) {
    const {weather} = useWeather()
    useEffect(() => {
        if (weather) {
        }
      }, [weather])
     
    return (
        <div>   
            <ul className="flex flex-col sm:grid sm:grid-cols-4 lg:grid-cols-8 gap-1 sm:gap-2 sm:h-full">
                {weather ? weather.daily.map((day, index) => (
                <SummaryCard  
                    key={index}
                    temp={Math.round(day.temp.day)}
                    description={day.weather[0].description}
                    icon={day.weather[0].icon}
                    dt={day.dt}
                    userLang={userLang}
                />
                )) : null}
            </ul>
        </div>
    )
}
export default SummaryCards;