import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HelpPage from "./components/pages/HelpPage/HelpPage";
import HomePage from "./components/pages/HomePage/HomePage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/help/' element={<HelpPage />} />
        <Route path='/products/' element={<HelpPage />} />
      </Routes>
    </div>
  );
}

export default App;
