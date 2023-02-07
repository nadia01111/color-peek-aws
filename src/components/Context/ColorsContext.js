import { createContext, useEffect, useState, useRef, useContext } from "react";
import axios from 'axios';
import { UsersContext } from "./UsersContext";
export const ColorsContext = createContext(null);
const { v4: uuidv4 } = require("uuid");


    export const  ColorsContextProvider = ({children}) => {
        // to make sure all icons are same size
            const [iconSize, setIconSize] = useState("24px");
        //variabels for generating random palette
            const [colors, setColors] = useState(null);
            const [loading, setLoading] = useState(false);
       
            const [status, setStatus] = useState("loading");
        //hook for focusing on GeneratePalette button on load
            const btnRef = useRef(null);
     ///if plalette saved or not
            const [isSaved, setIsSaved] = useState(false);
        /// generates the random palette on HomePage using API
            const fetchColors = async function getColors () {
                setIsSaved(false);
                const response = await fetch('/api/randome-palette');
                const fetchedColors = await response.json();
                const check = fetchedColors.data.every(color => typeof color === 'string');
                console.log("check", check);
                if (check && fetchedColors.data.length>0) {
                    console.log("before pass", fetchedColors.data);
                    console.log("pass")
                    setColors({_id:uuidv4(), colors: fetchedColors.data});
                    localStorage.setItem("currentPalette", JSON.stringify(fetchedColors.data));
                    setLoading(true);
                } else {
                    console.log("error");
                    getColors();
                } };
    //  useEffect(() => {
    //     fetchColors();
    //     btnRef.current.focus();
    //     }, []);
console.log(colors);

 
    return (
        <ColorsContext.Provider
        value={{
            colors,setColors,
            loading, setLoading,
            iconSize, setIconSize,
            btnRef,fetchColors,
            status,
            isSaved, setIsSaved
            }}>
        {children}
        </ColorsContext.Provider>
    )

    }

    

