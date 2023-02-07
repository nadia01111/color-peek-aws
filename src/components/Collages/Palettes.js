import { useState, useEffect,useContext } from "react";
import styled, { keyframes } from "styled-components";
import SavePaletteBar from "./SavePaletteBar";
import { UsersContext } from "../Context/UsersContext";
import {BiLoaderCircle} from  "react-icons/bi";
// import { palettes } from "../../assets/palettes";

///component to render all saved pallets from all users. fetch  from mongo DB
const Palettes = () => {
  const {currentUser, savePalette, isSaved, setIsSaved} = useContext(UsersContext);
    const [palettes, setPalettes] = useState(null);
    const [status, setStatus] = useState("loading");
  
    useEffect(() => {
        fetch("/api/palettes")
          .then((res) => res.json())
          .then((data) => {
            setPalettes(data.data);
            setStatus("loaded");
          });
      }, []);

    if (status === "loading") {
      return <Icon>
          <BiLoaderCircle/>
      </Icon>
    }
    return (
    <Container>
      <h2>Trending color palettes</h2>
      <h3>Get inspired! </h3>
      <Wrapper>
        {palettes?.map((palette) => {
          return (
          <Wrap>
          <PaletteWrap key={palette._id}>
            {palette?.palette?.map((color,index) => {
              return <ColorWrap color={color} key={color+index}></ColorWrap>
            })}
          </PaletteWrap>
          {/* <div>{palette?.isLikedBy?.length}</div> */}
          <SavePaletteBar num ={palette?.isLikedBy?.length} paletteId={palette._id}/>
          </Wrap>
          )
        })}
       
        
      </Wrapper>
    </Container>
    )
}

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

const LikeBtn = styled.button`
font-size: 12px;
filter: grayscale(80%);
display: flex;
align-items: center;
width: 100px;
height: 20px;
border: none;
background-color: transparent;
margin-bottom:5px;
position: relative;
left:85%;
`;

const ColorWrap = styled.div`
background-color: ${props => props.color ? props.color : "none"};
box-shadow: inset rgb(0 0 0 / 5%) 0 1px, inset rgb(0 0 0 / 5%) 0 -1px;
width: calc(100%/5);
height: 100%;
overflow:none;
flex-grow: 1;
display:flex;
align-items: center;
justify-content: center;
text-align: center;
:hover{
  width:calc(100%/3)  ;
}
`;



const ColorName = styled.div`
overflow:none;
font-size:18px;
font-weight: bold;
text-transform: uppercase;
letter-spacing: 0.03em;
    transform: translate3d(-50%, -50%, 0) scale(0);
    opacity: 1;
    /* transition: none; */
:hover{
  flex-grow: 1;
}
`;
const PaletteWrap =styled.div`
width: 300px;
display: flex;
height: 100px;
border-radius: 15px;
margin: 5px;
overflow:hidden;
`;

const Container = styled.div`
padding:20px;
display: flex;
flex-direction: column;
width:100vw;
align-items: center;

`;
const Wrap = styled.div`


`;
const Wrapper = styled.div`
padding: 10px;
width:inherit ;
display: flex;
flex-wrap:wrap;
align-items: center;
justify-content: center;
`;

export default Palettes;