import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import axios from "axios";

// ==========================
//  Pages - Categories
// ==========================
import AllProducts from "./Pages/HomeProducts";
import Beatuy from "./Pages/ProductsOfPages/Beatuy";
import MensShoes from "./Pages/ProductsOfPages/MensShoes";
import Fragrances from "./Pages/ProductsOfPages/Fragrances";
import Furniture from "./Pages/ProductsOfPages/Furniture";
import Groceries from "./Pages/ProductsOfPages/Groceries";
import HomeDecoration from "./Pages/ProductsOfPages/HomeDecoration";
import KitchenAccesories from "./Pages/ProductsOfPages/KitchenAccesories";
import Laptops from "./Pages/ProductsOfPages/Laptops";
import MensShirts from "./Pages/ProductsOfPages/MensShirts";
import MensWatches from "./Pages/ProductsOfPages/MensWatches";
import MobileAccessories from "./Pages/ProductsOfPages/MobileAccessories";
import Motorcycle from "./Pages/ProductsOfPages/Motorcycle";
import SkinCare from "./Pages/ProductsOfPages/SkinCare";
import Smartphones from "./Pages/ProductsOfPages/Smartphones";
import SportsAccessories from "./Pages/ProductsOfPages/SportsAccessories";
import SunGlasses from "./Pages/ProductsOfPages/SunGlasses";
import Tablets from "./Pages/ProductsOfPages/Tablets";
import Tops from "./Pages/ProductsOfPages/Tops";
import Vehicle from "./Pages/ProductsOfPages/Vehicle";
import WomensBags from "./Pages/ProductsOfPages/WomensBags";
import WomensDresses from "./Pages/ProductsOfPages/WomensDresses";
import WomensJewellery from "./Pages/ProductsOfPages/WomensJewellery";
import WomensShoes from "./Pages/ProductsOfPages/WomensShoes";
import WomensWatches from "./Pages/ProductsOfPages/WomensWatches";

// ==========================
//  Other Pages
// ==========================
import DetailsItem from "./Pages/DetailsItem/DetailsItem";
import AddToCart from "./Pages/Add to cart/AddToCart";
import SearchProducts from "./Pages/SearchPage/SearchProducts";

// ==========================
// 📌 Auth & Profile
// ==========================
import Register from "./Pages/login&register/register";
import Login from "./Pages/login&register/login";
import Profile from "./Pages/profileUser/profile";
import EditeProfile from "./Pages/profileUser/editeProfile";
import ChangePassword from "./Pages/profileUser/changePassword";

// ==========================
// 📌 Admin
// ==========================
import AllUsers from "./Pages/Admin/allUsers";
import AllCarts from "./Pages/Admin/allCarts";

// ==========================
// 📌 Components
// ==========================
import Footer from "./Components/Footer";
import Head from "./Components/Head";

// ==========================
// 📌 UI Library
// ==========================
import { Drawer, IconButton } from "@material-tailwind/react";

const App = () => {
  // ==========================
  // 📌 State
  // ==========================
  const [aboutAdding, setAboutAdding] = useState([]);
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const [checkSearch, setCheckSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categoriesNameSideBar, setCategoriesNameSideBar] = useState([]);

  // ==========================
  // ==========================
  const getProducts = async () => {
    try {
      const res = await axios.get("https://e-commerce-nodejs-blush.vercel.app/products");
      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios.get(
        "https://e-commerce-nodejs-blush.vercel.app/products/allCategoriesName"
      );
      setCategoriesNameSideBar(res.data.categoriesName);
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================
  // ==========================
  useEffect(() => {
    window.scrollTo(0, 0);
    getProducts();
    getCategories();

    const timer = setTimeout(() => {
      setLoading(true);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  // ==========================
  // ==========================
  const openDrawer = () => {
    setCheck(true);
    setOpen(true);
  };

  const closeDrawer = () => {
    setCheck(false);
    setOpen(false);
  };

  return (
    <div className="bg-white dark:bg-blue-gray-900">

      {/* ==========================
           Sidebar
      ========================== */}
      <div className="removeShadowBlack">
        <Drawer open={open} className="p-6 w-[75%] lg:w-[320px]">

          <div className="mb-6 flex justify-between border-b pb-4">
            <h2 className="text-xl font-bold text-green-600">Menu</h2>
            <IconButton onClick={closeDrawer}>✕</IconButton>
          </div>

          <div className="flex flex-col gap-2">
            {categoriesNameSideBar.map((item, index) => (
              <Link key={index} to={`/${item}`} className="px-4 py-3 hover:bg-gray-100 rounded">
                {item}
              </Link>
            ))}
          </div>
        </Drawer>
      </div>

    
      <div className={`${check ? "blur-sm" : ""}`}>

        {/* ==========================
             Header
        ========================== */}
        <Head
          openDrawer={openDrawer}
          setCheckSearch={setCheckSearch}
          checkSearch={checkSearch}
          aboutAdding={aboutAdding}
          categoriesNameSideBar={categoriesNameSideBar}
        />

        {/* ==========================
             Routes
        ========================== */}
        <Routes>

          {/* Home */}
          <Route path="/" element={<AllProducts products={products} setProducts={setProducts} />} />

          {/* Categories */}
          <Route path="/beauty" element={<Beatuy Loading={loading} />} />
          <Route path="/fragrances" element={<Fragrances Loading={loading} />} />
          <Route path="/furniture" element={<Furniture Loading={loading} />} />
          <Route path="/groceries" element={<Groceries Loading={loading} />} />
          <Route path="/home-decoration" element={<HomeDecoration Loading={loading} />} />
          <Route path="/kitchen-accessories" element={<KitchenAccesories Loading={loading} />} />
          <Route path="/laptops" element={<Laptops Loading={loading} />} />
          <Route path="/mens-shirts" element={<MensShirts Loading={loading} />} />
          <Route path="/mens-shoes" element={<MensShoes Loading={loading} />} />
          <Route path="/mens-watches" element={<MensWatches Loading={loading} />} />
          <Route path="/mobile-accessories" element={<MobileAccessories Loading={loading} />} />
          <Route path="/motorcycle" element={<Motorcycle Loading={loading} />} />
          <Route path="/skin-care" element={<SkinCare Loading={loading} />} />
          <Route path="/smartphones" element={<Smartphones Loading={loading} />} />
          <Route path="/sports-accessories" element={<SportsAccessories Loading={loading} />} />
          <Route path="/sunglasses" element={<SunGlasses Loading={loading} />} />
          <Route path="/tablets" element={<Tablets Loading={loading} />} />
          <Route path="/tops" element={<Tops Loading={loading} />} />
          <Route path="/vehicle" element={<Vehicle Loading={loading} />} />
          <Route path="/womens-bags" element={<WomensBags Loading={loading} />} />
          <Route path="/womens-dresses" element={<WomensDresses Loading={loading} />} />
          <Route path="/womens-jewellery" element={<WomensJewellery Loading={loading} />} />
          <Route path="/womens-shoes" element={<WomensShoes Loading={loading} />} />
          <Route path="/womens-watches" element={<WomensWatches Loading={loading} />} />

          {/* Details */}
          <Route path="/details/:id" element={<DetailsItem aboutAdding={aboutAdding} setAboutAdding={setAboutAdding} Loading={loading} />} />

          {/* Cart */}
          <Route path="/adding" element={<AddToCart aboutAdding={aboutAdding} setAboutAdding={setAboutAdding} Loading={loading} />} />

          {/* Search */}
          <Route path="/search" element={<SearchProducts checkSearch={checkSearch} Loading={loading} />} />

          {/* Auth */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/editeProfile" element={<EditeProfile />} />
          <Route path="/Changepassword" element={<ChangePassword />} />

          {/* Admin */}
          <Route path="/allUsers" element={<AllUsers />} />
          <Route path="/allCarts" element={<AllCarts />} />

        </Routes>

        {/* ==========================
        ========================== */}
        <Footer />

      </div>
    </div>
  );
};

export default App;