import React, { useContext, useState , useRef, useEffect} from "react";
import { ColorsContext } from "../Context/ColorsContext";
import styled from "styled-components";

import { IoMdHeartEmpty,IoMdHeart } from "react-icons/io";
import { AiOutlineLock,AiOutlineUnlock , AiFillLock} from "react-icons/ai"
import { MdOutlineClear } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import ActionBar from "./ActionBar";


const ColorPalette = ({colors,loading}) => {

const {
    // colors, setColors,
    // type, setType,
    // loading, setLoading,
    
    iconSize,

     } = useContext(ColorsContext);

console.log(colors);
if (loading === false) {
    <div>loading</div>
}


    return (
    <Wrapper>
       <Wrap>  
        { colors?.colors?.map((color,index)=> {
           
            const name = color.substring(1);
            return (<React.Fragment key={color+index}>
            <Color color={color}>
                {/* <ActionBar color={color}/> */}
                <ColorName color={color}>{name}</ColorName>

                <StyeldIoIosAddCircleOutline   size={iconSize}/>

            </Color> 
                </React.Fragment>)

        })}
        </Wrap>
    </Wrapper>)
       
}


const StyeldIoIosAddCircleOutline = styled(IoIosAddCircleOutline)`
position: relative;
display: none;
`;

const SpaceBar = styled.button`
position: relative;
`;

const Wrapper = styled.div`
width: 100%;

`;
const Wrap = styled.div`
display: flex;
height: calc(100vh - 150px);
`;


const ColorName = styled.div`
font-size:24px;
font-weight: bold;
margin: 5px;
padding: 10px;
text-transform: uppercase;
letter-spacing: 0.03em;
border-radius: 10px;
:hover{

    border: 1px solid ${props => props.color ? props.color : "none"};
    background-color: white;
    opacity: 50%;
}
`;

const Color = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: ${props => props.color ? props.color : "none"};
width: 20%;
height: 100%;
top: 0px;
left: 0%;
transform: translate3d(0px, 0px, 0px);
`;




export default ColorPalette;