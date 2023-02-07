import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { ColorsContext } from "./ColorsContext";
// import { response } from "express";
const { v4: uuidv4 } = require("uuid");
export const UsersContext = createContext(null);

    export const  UsersProvider = ({children}) => {
        const {isLoading,isAuthenticated,user,loginWithRedirect,logout} = useAuth0();
        const [currentUser, setCurrentUser]=useState(null);
        const currentPalette = JSON.parse(localStorage.getItem(`currentPalette`));
        const {colors, isSaved, setIsSaved} = useContext(ColorsContext);
        useEffect(() => {
            const addUserToMongo = async () => {
            
              if (isAuthenticated) {
                  await fetch("/api/user/create-user", {
                    method: "POST", 
                    headers: {"Content-Type": "application/json",},
                    body: JSON.stringify({
                        _id: uuidv4(), 
                        email: user.email,
                        nickname:user.nickname,
                        avatar:user.picture,
                        savedPalettes:[],
                        friends: []
                    })})
                    .then((res)=>res.json())
                    .then((data) => {
                        console.log(data.message)
                        setCurrentUser(data.data);
                    })
                }};
            addUserToMongo();
          }, [isAuthenticated]);
        
          const savePalette = () => {
            setIsSaved(!isSaved);
            if (currentUser) {
            fetch("/api/save-palette", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({_id:colors._id, currentPalette, currentUser, isSaved})
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.data);
                });
            }
        }

    return (
        <UsersContext.Provider
        value={{
            currentUser,
            savePalette,
            isSaved, 
            setIsSaved
            }}>
        {children}
        </UsersContext.Provider>
    )

    }

    

