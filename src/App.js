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
import ProductManager from "pages/AdminPages/Pages/ProductManager";
import Dashboard from "pages/AdminPages/Pages/Dashboard";
import Author from "pages/LandingPages/Author";
import AboutUs from "pages/LandingPages/AboutUs";
import UserInformation from "pages/LandingPages/UserInformation";

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
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpBasic />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="contact" element={<Author />} />

        <Route path="admin" element={<Admin></Admin>}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductManager />} />
        </Route>
        {/* {getRoutes(routes)} */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </ThemeProvider>
  );
}
