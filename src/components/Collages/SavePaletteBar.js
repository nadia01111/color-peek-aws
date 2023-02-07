import { IoMdHeartEmpty,IoMdHeart } from "react-icons/io";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { UsersContext } from "../Context/UsersContext";

const SavePaletteBar = ({num,paletteId}) => {
    const {currentUser, savePalette, isSaved, setIsSaved} = useContext(UsersContext);
    const [isLiked,setIsLiked] = useState(false);
    const [likeNum, setLikeNum]= useState(num);

    useEffect(() => {

    },[likeNum])

    const likeBntFunc = () => {
        setIsLiked(!isLiked);
        setLikeNum(likeNum+1);
        if (currentUser) {
            fetch("api/like-palette", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({_id:paletteId, currentUser:currentUser._id, isLiked})
            })
            .then((res) => res.json())
            .then((data) => {
            console.log(data.data);
            });
            }
    }


    return (<Wrapper>
    {isLiked ?
    <LikeWrap onClick={likeBntFunc}><IoMdHeart/>{likeNum}</LikeWrap>:
    <LikeWrap onClick={likeBntFunc}><IoMdHeartEmpty/>{likeNum}</LikeWrap>}
    </Wrapper>)

}

const Wrapper = styled.div``;
const LikeWrap = styled.div`
width:100px;
`;

export default SavePaletteBar;