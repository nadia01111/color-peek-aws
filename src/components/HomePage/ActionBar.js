import { useContext, useState , useEffect} from "react";
import styled from "styled-components";
import { ColorsContext } from "../Context/ColorsContext";

import { IoMdHeartEmpty,IoMdHeart } from "react-icons/io";
import { AiOutlineLock,AiOutlineUnlock , AiFillLock} from "react-icons/ai"
import { MdOutlineClear } from "react-icons/md";
import { UsersContext } from "../Context/UsersContext";


const ActionBar = ({color}) => {
    const { loading, setLoading, iconSize } = useContext(ColorsContext);
    const { userData, setUserData} = useContext(UsersContext);

    const [isLiked, setIsLiked,] = useState(false);
    const [isLocked, setIsLocked,] = useState(false);

    const currentlyDisplayedRandomPalette = JSON.parse(localStorage.getItem(`colors`));
    

    userData.savedColors.map((savedColor) => {
        if (currentlyDisplayedRandomPalette.includes(savedColor)) {
            return savedColor;
        }
    })
// lock color on tthe palette but change other colors
    const toggleLock = (ev) => {
        setIsLocked(!isLocked);
    }
    
    // save color to favorites (for registered users)
  
    //toggle liked color
     const toggleLike = () => {
        setIsLiked(!isLiked);
        setUserData({...userData, savedColors: userData.savedColors.push(color)})
        console.log(userData);
     }


    return (<Wrapper>
       

        <ColorNavBar>
       
                { isLiked ? 
                <IoMdHeart onClick={toggleLike} size={iconSize}/> 
                : 
                <IoMdHeartEmpty onClick={toggleLike} size={iconSize}/> }
                { isLocked ?
                <AiFillLock onClick={toggleLock}size={iconSize}/>
                :
                <AiOutlineLock onClick={toggleLock} size={iconSize}/>
                }
                <MdOutlineClear size={iconSize}/>

        </ColorNavBar>

    </Wrapper>)
}
const Wrapper = styled.div``;
const ColorNavBar = styled.div`
display: flex;
flex-direction: column;

`;
export default ActionBar;
