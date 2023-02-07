import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Palettes from "./Collages/Palettes";
import CreateCollage from "./Collages/CreateCollage";
import Header from "./Header";
import HomePage from "./HomePage/HomePage";
import UserPage from "./User/UserPage";
import NavBar from "./NavBar";
import UserFeed from "./User/UserFeed";




const App = () => {
  return (
 
    <BrowserRouter>
    <GlobalStyles/>
      <Header />
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/users/:userID" element={<UserPage/>}/>
        <Route path="/palettes" element={<Palettes/>}/>
        <Route path="/palettes/saved/:userID" element={<UserFeed/>}/>
        <Route path="/palettes/create" element={<CreateCollage/>}/>
        <Route path="/palettes/generate" element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
