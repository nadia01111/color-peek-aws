import styled, { keyframes } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../Context/UsersContext";
import { ColorsContext } from "../Context/ColorsContext";
import { useParams } from "react-router-dom";
import {BiLoaderCircle} from  "react-icons/bi";

const UserFeed = ({savedPalettes}) => {
    const [paletttesLikedByUser, setPaletttesLikedByUser] = useState([])
    const {currentUser} = useContext(UsersContext);
    const [status, setStatus] = useState("loading");
    const id = useParams();
  
   
    
    useEffect(() =>{
        fetch(`/api/fetch-my-palettes/${id.userID}`, {
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.data);
            setPaletttesLikedByUser(data.data);
            setStatus("loaded")
        });
    
    },[savedPalettes])
    console.log(paletttesLikedByUser);
    if (status === "loading") {
        return <Icon>
            <BiLoaderCircle/>
        </Icon>
      }

    return (
    <Container>
        {paletttesLikedByUser?.map((obj,index)=> {
            return <PaletteWrap key={index}>{obj.palette.map((color, index) => {
                return <Color color={color} key={color+index}></Color>
            })}</PaletteWrap>
            
        })}
    </Container>

    )
}

const Container = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-around;
`

const PaletteWrap = styled.div`
width: 250px;
height: 100px;
display: flex;
border-radius: 12px;
overflow:hidden;
margin: 10px 15px 10px 15px;

`;
const Color = styled.div`
background-color: ${props => props.color ? props.color : "none"};
width: calc(100%/5);
height:100%;
:hover{
  width:calc(100%/3)  ;
}
`;

const turning = keyframes`
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    `;
const Icon = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  top: 49%;
  left: 49%;
  animation: ${turning} 1000ms infinite linear;
`;
export default UserFeed;