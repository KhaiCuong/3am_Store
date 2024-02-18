import { useEffect, useState } from "react";
import "../UserInformation/animate.css";
import "../UserInformation/style.css";
import bgImage from "assets/images/bg3.jpg";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import { Icon } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import Swal from "sweetalert2";
import { GetUserByVerifyCode } from "services/ApiService";
import { PutPassword } from "services/ApiService";

export default function ResetPassword() {
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const initialState = {
    confirmPassword: "",
    password: "",
  };
  const navigate = useNavigate();
  const [dataReset, setDataReset] = useState(initialState);
  const [uId, setUId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(dataReset);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      resetPassword();
    }
  };

  // Call API
  const resetPassword = async () => {
    const dataNew = {
      code: id,
      password: dataReset.password,
    };
    try {
      const response = await PutPassword(uId, dataNew);
      if (response.status === 200) {
        Swal.fire({
          title: "Reset Password successfully!",
          text: "Your Password was update!",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/signin");
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Reset faild",
        text: "Please rey again.",
        icon: "error",
      });
    }
  };

  const validateForm = (dataReset) => {
    let errors = {};
    if (!dataReset.password) {
      errors.password = "password is required";
    } else if (dataReset.password.length < 6 || dataReset.password.length > 20) {
      errors.password = "Password must be between 6 - 20 characters";
    }
    if (!dataReset.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (dataReset.confirmPassword.length < 6 || dataReset.confirmPassword.length > 20) {
      errors.confirmPassword = "Confirm Password must be between 6 - 20 characters";
    } else if (dataReset.confirmPassword !== dataReset.password) {
      errors.confirmPassword = "Confirm Password don't match";
    }
    return errors;
  };

  // handle when user type information
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setDataReset({
      ...dataReset,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await GetUserByVerifyCode(id);
        if (response.status === 200) {
          setUId(response.data.userId);
        }
      } catch (error) {
        navigate("/notfound");
      }
    };
    fetchUserData();
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
        sticky
      />
      <section
        className="ftco-section"
        style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}
      >
        <div className="container-Order ">
          <div className="row justify-content-center ">
            <div className="col-lg-12 col-md-12 bg-light heigh-100 w-75 d-flex justify-content-around">
              <form className="w-50 mt-5 pt-3">
                <h2 className="d-flex justify-content-around">
                  <b>RESET PASSWORD</b>
                </h2>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Password</label>

                  <MKInput
                    type="password"
                    name="password"
                    fullWidth
                    onChange={handleInputChange}
                    error={errors.password}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Confirm Password</label>
                  <MKInput
                    type="password"
                    name="confirmPassword"
                    fullWidth
                    onChange={handleInputChange}
                    error={errors.confirmPassword}
                  />
                </div>

                <MKButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                  Reset
                </MKButton>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
