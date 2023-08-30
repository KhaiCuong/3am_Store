import { useEffect } from "react";

// react-router components
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "assets/theme";

// Material Kit 2 React routes
import routes from "routes";
import Home from "pages/HomePage";
import ProductList from "pages/ProductPages/ProductList";
import SignInPage from "layouts/pages/authentication/sign-in";
import SignUpBasic from "pages/LandingPages/SignUp";
import ProductDetail from "pages/ProductPages/ProductDetail";

export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(routes)}
        <Route path="/home" element={<Home />} />
        {/* <Route path="/admin" element={<Dashboard />} /> */}
        <Route path="/products" element={<ProductList />} />
        <Route path="/productdetail" element={<ProductDetail />} />

        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpBasic />} />

        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </ThemeProvider>
  );
}
