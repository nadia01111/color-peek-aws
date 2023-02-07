import styled from "styled-components"
import { FcLikePlaceholder, FcLike, FcBookmark, FcLock, FcUnlock, FcAddImage,FcPicture, FcGrid} from "react-icons/fc";
import { useContext, useState } from "react";
import { ColorsContext } from "./Context/ColorsContext";
import { Link, useNavigate } from "react-router-dom";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 
import { UsersContext } from "./Context/UsersContext";

const NavBar = () => {
   
    const {colors, setColors,isLiked, setIsLiked,iconSize,fetchColors,btnRef} = useContext(ColorsContext);
    const {currentUser, savePalette, isSaved, setIsSaved} = useContext(UsersContext);
    const currentPalette = JSON.parse(localStorage.getItem(`currentPalette`));
    const [userID,setUserID] = useState(currentUser?._id);

        let navigate = useNavigate();

        //press the button and see new palette
        const generateNewPalette =()=> {
            fetchColors()
            navigate("/palettes/generate")
        };
        


    return (
    <Wrapper>
        <NewPaletteBtn ref={btnRef} onClick={generateNewPalette}>
            <h2>Presse to generate new palette</h2></NewPaletteBtn>

        {isSaved? <SaveBtn onClick={savePalette}><FcLike  size={iconSize}/><span>Palette saved</span></SaveBtn>:
        <SaveBtn onClick={savePalette}><FcLikePlaceholder size={iconSize}/><span>Save palette</span></SaveBtn>
        }
        <Tippy content="saved palettes"><Lnk to={`/palettes/saved/${userID}`}><FcBookmark size={iconSize}/></Lnk></Tippy>
        <Tippy content="create palette from picture"><Lnk to="/palettes/create"><FcAddImage size={iconSize}/></Lnk></Tippy>
        <Tippy content="explore trending palettes"><Lnk to="/palettes"><FcGrid size={iconSize}/></Lnk></Tippy>
        
        
    </Wrapper>

    )
}

const SaveBtn =styled.button`
width: 150px;
border: none;
background-color: transparent;
display: flex;
padding:5px;
align-items:center;
justify-content:space-around;
border-radius: 5px;
:hover{
 
cursor: pointer;
background-color: lightgray;
}
:active {
    transform: scale(0.98);
    
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);

        }
`;


const Lnk = styled(Link)`
text-decoration:none;
:active {
    transform: scale(0.98);
    
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);

        }
`;
const NewPaletteBtn =styled.button`
border-radius: 5px;
width: 400px;
background-color: transparent;
text-align: center;
border: none;
:hover{
    cursor: pointer;
    background-color: lightgray;
}
:focus {
     outline: none;
}
:active {
    transform: scale(0.98);
    
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);

        }
`;

const Wrapper = styled.div`
border-top:1px solid lightgray;
border-bottom:1px solid lightgray;
height: 40px;
display: flex;
align-items: center;

justify-content: space-around;
`

export default NavBar;