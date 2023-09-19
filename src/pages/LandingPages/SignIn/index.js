/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useContext, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
// import MuiLink from "@mui/material/Link";

// // @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";

// Material Kit 2 React page layout routes
import routes from "routes";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { PostLogin } from "../Service/ApiService";
import { FilterContext } from "pages/ProductPages/ProductList/context/FilterContext";
import Swal from "sweetalert2";

function SignInBasic() {
  const [rememberMe, setRememberMe] = useState(false);
  // use to contain errors
  const [errors, setErrors] = useState({});
  // initial value of data Login
  const initialState = {
    email: "",
    password: "",
  };
  // use to contain data Login
  const [dataLogin, setDataLogin] = useState(initialState);
  // change status of button "remember me"
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  // useContext to transmit login status for re-render navbar
  const { setNavbar, navbar } = useContext(FilterContext);
  const navigate = useNavigate();
  const usertoken = JSON.parse(localStorage.getItem("userToken"));
  const previousPageUrl = localStorage.getItem("previousPage");

  if (usertoken) {
    goBack();
  }

  // Call API
  const fetchLogin = async () => {
    try {
      const response = await PostLogin(dataLogin);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userToken", JSON.stringify(response.data.userToken));
        setNavbar(!navbar);
        // navigate
        if (response.data.userToken.role === "Admin") {
          navigate("/admin");
        } else {
          if (previousPageUrl) {
            navigate(`/products/ProductDetail/${previousPageUrl}`);
            localStorage.removeItem("previousPage");
          } else {
            goBack();
          }
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Login faild",
        text: "Please check your email and password.",
        icon: "error",
      });
    }
  };

  // handle login
  function handleLogin(e) {
    e.preventDefault();
    const newErrors = validateForm(dataLogin);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
      fetchLogin();
    }
  }

  // handle when user type information
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setDataLogin({
      ...dataLogin,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Validate data login
  const validateForm = (dataLogin) => {
    let errors = {};

    if (!dataLogin.email) {
      errors.email = "email is required";
    } else if (!/\S+@\S+\.\S+/.test(dataLogin.email)) {
      errors.email = "Invalid email format";
    }
    if (!dataLogin.password) {
      errors.password = "password is required";
    } else if (dataLogin.password.length < 6 || dataLogin.password.length > 20) {
      errors.password = "Password must be between 6 - 20 characters";
    }

    return errors;
  };

  // hidden error when typing
  const handleInputFocus = (name) => {
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // return to previous page
  function goBack() {
    navigate(-1);
  }

  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: false,
          label: <Icon>shopping_cart</Icon>,
          color: "info",
        }}
        transparent
        light
      />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Sign in
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  <MKBox mb={2}>
                    <MKInput
                      type="email"
                      label="Email"
                      name="email"
                      fullWidth
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus("email")}
                      error={errors.email}
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      label="Password"
                      name="password"
                      fullWidth
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus("password")}
                      error={errors.password}
                    />
                  </MKBox>
                  <MKBox display="flex" alignItems="center" ml={-1}>
                    <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                    <MKTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      onClick={handleSetRememberMe}
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;Remember me
                    </MKTypography>
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" color="info" fullWidth onClick={handleLogin}>
                      sign in
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Don&apos;t have an account?{" "}
                      <MKTypography
                        component={Link}
                        to="/authentication/sign-up/cover"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign up
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>

      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox>
    </>
  );
}

export default SignInBasic;
