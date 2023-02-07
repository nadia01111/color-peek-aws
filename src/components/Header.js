import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { useContext } from "react";
import { UsersContext } from "./Context/UsersContext";
import {BsPersonCircle} from "react-icons/bs";


const Header = () => {
    const {currentUser} = useContext(UsersContext);
    const {isAuthenticated, user, loginWithRedirect, logout} = useAuth0();
    console.log(currentUser);

    return (
        <Wrapper>
            <Div1>
                <StyeldLink to="/"><Img src={logo} alt="logo"/> </StyeldLink>
            </Div1>
            <Div1><H1>
            <Name to="/"><h1>Color palette generator</h1></Name>
            {isAuthenticated? null:<Div2><h5>Sing in to save and explore palettes</h5></Div2>}
            </H1></Div1>
            
        
          {isAuthenticated? <Div2>
          <H3>Hello,<Lnk to={`/users/${currentUser?._id}`}>{user.nickname}</Lnk>!</H3>
          
          <LogInBtn onClick={() => logout({ returnTo: window.location.origin })}>LogOut</LogInBtn></Div2>
          :
          
          <LogInBtn onClick={() => loginWithRedirect()}>LogIn</LogInBtn> }
        
          
            
         
        
       
        </Wrapper>
    )
}

const Name = styled(Link)`
color:black;
text-decoration:none;
text-align: start;

`;
const Lnk = styled(Link)`
padding: 5px;
border-radius: 3px;
:hover{
  cursor: pointer;
  color: white;
  background: linear-gradient(180deg, #5938ff, #f4a261);
  margin-bottom: 2px;
}
`;

const H3 = styled.h3`
margin-right: 20px;
`;
const Div1 = styled.div`
display: flex;
align-items: center;
`;
const Div2 = styled.div`
display: flex;
align-items: center;
justify-content: center;

`;
const StyeldLink = styled(Link)`
color:black;
text-decoration:none;
`;
const Img = styled.img`
height:100px;
margin-left:50px;
`;

const H1 = styled.div`

`;
const Wrapper = styled.div`
margin-left: 20px;
margin-right: 20px;
display: flex;
height: 100px;
align-items: center;
justify-content: space-between;
`;
// const  = styled.div``;
const LogInBtn = styled.button`
color:#5938ff;
font-weight: bold;
width: 80px;
margin-right: 30px;
margin-left: 10px;
text-decoration: none;
border: 1px solid gray;
border-radius: 3px;
padding: 8px 6px;
cursor: pointer;
  :hover {
    background-color:#f4a261;
    color: #5938ff;
  }
  :active {
    transform: scale(0.98);
    
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);

        }
`;

export default Header;