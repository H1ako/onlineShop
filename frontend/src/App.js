// glbobal
import { Route, Routes } from "react-router-dom";
// components
import Navbar from "./components/Navbar/Navbar";
// pages
import HelpPage from "./components/pages/HelpPage/HelpPage";
import HomePage from "./components/pages/HomePage/HomePage";
import ProductPage from "./components/pages/ProductPage/ProductPage";
import ProductsPage from "./components/pages/ProductsPage/ProductsPage";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import DeliveriesPage from "./components/pages/DeliveriesPage/DeliveriesPage";
import FavouritesPage from "./components/pages/FavouritesPage/FavouritesPage";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/help/' element={<HelpPage />} />
        <Route path='/products/:productId' element={<ProductPage />} />
        <Route path='/products/' element={<ProductsPage />} />
        <Route path='/profile/' element={<ProfilePage />} />
        <Route path='/deliveries/' element={<DeliveriesPage />} />
        <Route path='/favourites/' element={<FavouritesPage />} />
      </Routes>
    </div>
  );
}

export default App;
