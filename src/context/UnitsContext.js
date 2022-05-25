import { createContext, useState, useEffect, useContext } from "react";

const UnitsContext = createContext();

export const UnitsProvider = ( { children }) => {
    const [units, setUnits] = useState(localStorage.getItem("units") || "metric");

      useEffect(() => {
        localStorage.setItem("units", units)
      }, [units])
    
    const values = {
        units,
        setUnits
    };
    return (
        <UnitsContext.Provider value={values}>{children}</UnitsContext.Provider>
    );
}

export const useUnits = () => useContext(UnitsContext);