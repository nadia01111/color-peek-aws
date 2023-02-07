import styled from "styled-components"
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../Context/UsersContext";


const { v4: uuidv4 } = require("uuid");


//encode image from user to B64 fromat (for Google vision API)
const getBase64 = file => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        // console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };

const PaletteFromPicture = () => {
    const {currentUser, savePalette, isSaved, setIsSaved} = useContext(UsersContext);
    const [isLiked, setIsLiked] = useState(false)
    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);
    const [encodedURLs, setEncodedURLs] = useState([]);
    const [palette, setPalette] =useState(null);
    const [rgbProp, setRgbProp] =useState([]);
    const [status, setStatus] = useState("loading")


    ///getPaletteFromPicture 
    const getPaletteFromPicture = (ev) => {
        ev.preventDefault();
        let reader = new FileReader();
        let blob = new Blob([images[0]], { type: "image/jpg" });
        let ImageBase64;
        reader.onload = function () {
            ImageBase64 = reader.result;
            let image = {ImageBase64};
              fetch("/api/color-recognize", {
                  method: "POST",
                  headers: {
                 "Content-Type": "application/json",},
                 body:JSON.stringify(image),
                
          })
          .then((res) => res.json())
          .then((data) => {
              console.log(data.data);
              setPalette(data.data);
              setStatus("loaded")
          })  

        };
        reader.readAsDataURL(blob);
       
    }
///useEffect tto render image from user`s source
    useEffect(() => {
        if (images.length<1) return;
        const newImageUrls =[];
        const newImageEncodedUrls =[];
        images.forEach((image) => {
            newImageUrls.push(URL.createObjectURL(image));
            setImageURLs(newImageUrls);
            const encodedURI = btoa(URL.createObjectURL(image));
            newImageEncodedUrls.push(encodedURI)
            setEncodedURLs(newImageEncodedUrls);
        })
    },[images]);

   
    const onImageChange = (e) => {
        setImages([...e.target.files]);
    }
    const currentUserId=currentUser?._id;

    const paletteToSave = () => {
        setIsLiked(!isLiked);
        const pale = palette?.slice(0,5)?.map((element,index)=>{
            const { red, green, blue} = element.color;
            const rgb = "rgb("+red + "," + green+","+ blue+")";
            if (index<5){
              return rgb;  
            }
            
        });
        const _id = uuidv4()
        const isLikedBy = currentUserId;
        console.log(pale,isLikedBy);
        fetch("/api/save-palette-from-picture", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({_id:_id, palette:pale, isLikedBy})
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
            });


    }
    
// if (status ==="loading") {return <div>loading</div>}
    return (
        <Wrapper>
        <BtnWrap>
        <Input type="file" multiple accept="image/*" onChange={onImageChange}/>
        <Btn onClick={getPaletteFromPicture}>Generate Palette</Btn>

        </BtnWrap>
        <CollageWrap>
     
        {imageURLs?.map((imageSrc) => {
        return (<ReturnWrap>
            <Wrap1>
               <ImgWrap><Img src={imageSrc}/></ImgWrap>
               <SaveBtn onClick={paletteToSave}>Save Palette</SaveBtn> 
            </Wrap1>
            
            <PaletteWrap>
                    {status === "loading" ? null :
                    palette.slice(0,5).map((element) => {
                        const {red, green, blue} = element.color;
                        const rgb = "rgb("+red + "," + green+","+ blue+")";
                        return <OneColor color={rgb} key={rgb} />
                        
                    })}
                </PaletteWrap>
                
        </ReturnWrap>)
        
        })}
        
        </CollageWrap>
        </Wrapper>)
}

const SaveBtn = styled.button`
font-size: 34px;
font-family: 'Raleway', sans-serif;
color:#5938ff;
font-weight: bold;
width: 200px;
height: 150px;
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

        }`;
const ReturnWrap =styled.div`
`;
const Wrap1 =styled.div`

display: flex;

`;
const CollageWrap = styled.div``;
const PaletteWrap = styled.div`
width: 500px;
display: flex;
`;
const OneColor = styled.div`
width: calc(100%/5);
height: 100px ;
background-color: ${props => props.color ? props.color : "none"};
`;
const ImgWrap = styled.div`
width: 500px;
`;
const Img = styled.img`
width: inherit;
`;
const Btn = styled.button`
font-size: 16px;
text-decoration: none;
border: 1px solid gray;
border-radius: 3px;
padding: 8px 6px;
color: #5938ff; 
font-weight: bold;
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
const BtnWrap =styled.div`
margin: 10px;
`;

const Input = styled.input`

&[type=file]{

}

`;
const Wrapper = styled.div`
margin: 30px;
`

export default PaletteFromPicture;