import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Review from "./pages/Review";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
