import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components"
import { UsersContext } from "../Context/UsersContext";
import { FcLike} from "react-icons/fc";
// import UserFeed from "./UserFeed";
// import { user } from "./user";
import { ColorsContext } from "../Context/ColorsContext";
import UserFeed from "./UserFeed";

const UserPage = () => {
// console.log("user");
    const {currentUser} = useContext(UsersContext);
    console.log(currentUser);
    return (
    <Wrapper>

        <Bio>
            <Avatar src={currentUser?.avatar}></Avatar>
            <Name>{currentUser?.nickname}</Name>
        </Bio>

        <H1> <FcLike/>  My Palettes</H1>
        <Wrap1>
            {currentUser?.savedPalettes?.length > 0 ? 
            <UserFeed savedPalettes={currentUser?.savedPalettes}/>
            : <h5>You don't have any palettes saved</h5>}
        </Wrap1>
               
    </Wrapper>

    )
}

const Wrap1 = styled.div`

width: 90vw;
padding: 5px;

`;

const H1 = styled.h1`
text-align: center;
margin: 10px;
padding-bottom:10px;
`;


const Bio = styled.div`
margin-top:50px;
margin-bottom:30px;
display:flex;
align-items:flex-end;
position: relative;
left: -15%;
`;

const Name = styled.h3`
font-variation-settings: 'wght' 900;
padding-left:30px;
font-size:42px;
font-weight: bold;
`;
const Avatar = styled.img`
border-radius:20%;
`;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

export default UserPage;