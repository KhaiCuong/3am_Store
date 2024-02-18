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

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import Switch from "@mui/material/Switch";
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
import bgImage from "assets/images/bg3.jpg";
import { useEffect, useState } from "react";
import { GetUserList, PostRegister } from "services/ApiService";
import Swal from "sweetalert2";

function SignUpBasic() {
  const navigate = useNavigate();
  const [emailUser, setEmailUser] = useState([]);
  // initial value of data Register
  const initialState = {
    fullname: "",
    phone_number: "",
    address: "",
    password: "",
    email: "",
    role: "User",
  };
  // use to contain data Register
  const [dataInput, setDataInput] = useState(initialState);
  // use to contain errors
  const [errors, setErrors] = useState({});

  // handle when user type information
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataInput({
      ...dataInput,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Call API
  const fetchRegister = async () => {
    try {
      const response = await PostRegister(dataInput);
      if (response.status === 201) {
        Swal.fire({
          title: "Registered successfully!",
          text: "Your account has been successfully registered.",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/signin");
          }
        });
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validate form before call API to create
    const newErrors = validateForm(dataInput);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const listerror = Object.values(newErrors).join("\n");
      Swal.fire({
        icon: "error",
        title: listerror,
      });
      return;
    } else {
      fetchRegister();
    }
  };
  // hidden error when typing
  const handleInputFocus = (name) => {
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Validate data
  const validateForm = (dataInput) => {
    let errors = {};
    if (!dataInput.fullname) {
      errors.fullname = "User Name is required";
    } else if (dataInput.fullname.length < 3 || dataInput.fullname.length > 30) {
      errors.fullname = "User Name must be between 3 - 30 characters";
    }
    if (!dataInput.phone_number) {
      errors.phone_number = "Phone Number is required";
    }
    if (!dataInput.address) {
      errors.address = "Address is required";
    }
    if (!dataInput.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(dataInput.email)) {
      errors.email = "Invalid email format";
    } else if (Object.values(emailUser).includes(dataInput.email)) {
      errors.email = "Email already used!";
    }
    if (!dataInput.password) {
      errors.password = "Password is required";
    } else if (dataInput.password.length < 6 || dataInput.password.length > 20) {
      errors.password = "Password must be between 6 - 20 characters";
    }
    return errors;
  };

  // Get user list
  useEffect(() => {
    const fetchDataList = async () => {
      try {
        const listUser = await GetUserList();
        if (listUser.status === 200) {
          let arr = [];
          for (let i = 0; i < listUser.data.length; i++) {
            arr[i] = listUser.data[i].email;
          }
          setEmailUser(arr);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchDataList();
  }, []);

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
                  Sign up
                </MKTypography>
                {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <FacebookIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <GitHubIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <GoogleIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                </Grid> */}
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Name"
                      name="fullname"
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus("fullname")}
                      error={errors.fullname}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="email"
                      label="Email"
                      name="email"
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus("email")}
                      error={errors.email}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      label="Password"
                      name="password"
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus("password")}
                      error={errors.password}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Address"
                      name="address"
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus("address")}
                      error={errors.address}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Phone number"
                      name="phone_number"
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus("phone_number")}
                      error={errors.phone_number}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" color="info" onClick={handleSubmit} fullWidth>
                      sign up
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Already have an account
                      <MKTypography
                        component={Link}
                        to="/signin"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign in
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

export default SignUpBasic;
