import { useEffect, useState } from "react";

function SummaryCard({temp, description, icon, dt, userLang }) {
   const [weekday, setWeeekday] = useState()
   
    const convert = () => {
        const timeStamp = dt * 1000  ///milisaniye ile çarpıyoruz//
        let date = new Date(timeStamp)
        //alttaki apı undefined yazınca default olarak locale timezone göre yazar///
        let newDay = date.toLocaleDateString(userLang, {weekday: "long"});
        setWeeekday(newDay)
    }

    useEffect(() => {
        convert()
    }, [weekday])

    return (
        <div className="shadow-md shadow-slate-900/50 rounded dark:bg-slate-700 bg-cyan-100 text-slate-700 dark:text-slate-100 flex sm:flex-col sm:flex-1 items-center sm:justify-center sm:text-center">
            <div className="inline-block w-1/4">
            <img className="" src={require(`../../../assets/${icon}.svg`)} alt="weathericon"/>
            </div>
            <div className="inline-block">
            <h2 className="text-2xl">{weekday}</h2>
            <p>{description}</p>
            </div>
            <div className="inline-block ml-auto mr-3 sm:mx-auto">
            <h2 className="text-2xl">{temp}°</h2>
            </div>
        </div>       
    )
}

export default SummaryCard;