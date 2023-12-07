import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import Order from "./pages/Order/Order";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import SignInAdmin from "./pages/Admin/SignInAdmin.js";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";

import AdminPage from "./pages/Admin/AdminPage";
import { Profiler } from "react";
import AdminListOrder from "./pages/Admin/AdminListOrder.jsx";
import ManageProduct from "./pages/ProductDetails/ManageProduct.jsx";
import VerifyPayAdmin from "./pages/payment/VerifyPayAdmin.jsx";
import Warehouse from "./pages/Admin/Warehouse.jsx";


import Profile from "./pages/Account/Profile";
import EditProfile from "./pages/Account/EditProfile";
import Logout from "./pages/Account/Logout";


const Layout = () => {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/order" element={<Order />}></Route>
        <Route path="/profile" element={<Profiler />}></Route>
        {/* ==================== Header Navlink End here ===================== */}
        
        <Route path="/product/:_id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/editProfile" element={<EditProfile />}></Route>
        <Route path="/paymentgateway" element={<Payment />}></Route>
      </Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/logout" element={<Logout />}></Route>
      
      
      <Route path="/signinAdmin" element={<SignInAdmin />}></Route>
      <Route path="/AdminPage" element={<AdminPage /> }></Route>
      <Route path="/AdminListOrder" element={<AdminListOrder />}></Route>
      <Route path="/VerifyPayAdmin" element={<VerifyPayAdmin />}></Route>
      <Route path="/ProductDetails" element={<ProductDetails />}></Route>
      <Route path="/ManageProduct" element={<ManageProduct />}></Route>
      <Route path="/Warehouse" element={<Warehouse/>}></Route>
      
    </Route>
  )
);

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
