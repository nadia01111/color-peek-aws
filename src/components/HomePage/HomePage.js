
import ColorPalette from "./ColorPalette";
import { createContext, useEffect, useState, useRef, useContext } from "react";
import axios from 'axios';
import { UsersContext } from "../Context/UsersContext";
import { ColorsContext } from "../Context/ColorsContext";
const { v4: uuidv4 } = require("uuid");

const HomePage = () => {
    const {colors, fetchColors, loading, btnRef} = useContext(ColorsContext);
  
    useEffect(() => {
        fetchColors();
            btnRef.current.focus();
        }, []);
console.log(colors?.colors);
    return (<>
 
        <ColorPalette colors={colors} loading={loading}/>
        </>
    )
}

export default HomePage;