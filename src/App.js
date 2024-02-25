import { useEffect } from "react";

// react-router components
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "assets/theme";

// Material Kit 2 React routes
// import routes from "routes";
import Home from "pages/HomePage";
import ProductList from "pages/ProductPages/ProductList";
import SignInPage from "layouts/pages/authentication/sign-in";
import SignUpBasic from "pages/LandingPages/SignUp";
import ProductDetail from "pages/ProductPages/ProductDetail";
import Admin from "pages/AdminPages";
import Dashboard from "pages/AdminPages/Pages/Dashboard";
import Author from "pages/LandingPages/Author";
import AboutUs from "pages/LandingPages/AboutUs";
import UserInformation from "pages/LandingPages/UserInformation";
import UpdateProduct from "pages/AdminPages/Pages/Product/UpdateProduct";
import ProductManager from "pages/AdminPages/Pages/Product/ProductManager";
import CreateProduct from "pages/AdminPages/Pages/Product/CreateProduct";
import BrandManager from "pages/AdminPages/Pages/Brand/BrandManager";
import CreateBrand from "pages/AdminPages/Pages/Brand/CreateBrand";
import UpdateBrand from "pages/AdminPages/Pages/Brand/UpdateBrand";
import AccountManager from "pages/AdminPages/Pages/Account/AccountManager";
import CreateAccount from "pages/AdminPages/Pages/Account/CreateAccount";
import UserOrder from "pages/LandingPages/UserOrder";
import UserOrderDetail from "pages/LandingPages/UserOrderDetail";
import PayPalCheckout from "components/Paypal/PayPalCheckout";
import ResetPassword from "pages/LandingPages/ResetPassword";
import NotFound from "pages/PageNotFound";
import OrderManager from "pages/AdminPages/Pages/Order/OrderManager";
import UpdateOrder from "pages/AdminPages/Pages/Order/UpdateOrder";
import ReviewManager from "pages/AdminPages/Pages/Review/ReviewManager";

export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  // const getRoutes = (allRoutes) =>
  //   allRoutes.map((route) => {
  //     if (route.collapse) {
  //       return getRoutes(route.collapse);
  //     }

  //     if (route.route) {
  //       return <Route exact path={route.route} element={route.component} key={route.key} />;
  //     }

  //     return null;
  //   });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Routes>
        <Route path="home" element={<Home />} />

        <Route path="products">
          <Route index element={<ProductList />} />
          <Route path="productdetail/:id" element={<ProductDetail />} />
        </Route>
        <Route path="user-infor" element={<UserInformation />} />

        <Route path="user-order">
          <Route index element={<UserOrder />} />
          <Route path="orderdetail/:id" element={<UserOrderDetail />} />
        </Route>
        <Route path="checkout/:id" element={<PayPalCheckout />} />

        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpBasic />} />
        <Route path="reset-password/:id" element={<ResetPassword />} />
        <Route path="notfound" element={<NotFound />} />

        <Route path="about-us" element={<AboutUs />} />
        <Route path="contact" element={<Author />} />

        <Route path="admin" element={<Admin></Admin>}>
          <Route index element={<Dashboard />} />
          <Route path="products">
            <Route index element={<ProductManager />} />
            <Route path="update/:id" element={<UpdateProduct />} />
            <Route path="create" element={<CreateProduct />} />
          </Route>
          <Route path="brands">
            <Route index element={<BrandManager />} />
            <Route path="update/:id" element={<UpdateBrand />} />
            <Route path="create" element={<CreateBrand />} />
          </Route>
          <Route path="orders">
            <Route index element={<OrderManager />} />
            <Route path="update/:id" element={<UpdateOrder />} />
          </Route>
          <Route path="accounts">
            <Route index element={<AccountManager />} />
            <Route path="create" element={<CreateAccount />} />
          </Route>
          <Route path="reviews" element={<ReviewManager />} />
        </Route>
        {/* {getRoutes(routes)} */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </ThemeProvider>
  );
}
