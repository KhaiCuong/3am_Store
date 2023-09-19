import { useContext, useEffect, useState } from "react";
import "./animate.css";
import "./style.css";
// import {} from "./Services/ApiService";
import Swal from "sweetalert2";
import bgImage from "assets/images/bg2.jpg";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import { Icon } from "@mui/material";
import {
  GetDetailByOrderID,
  GetOrdersByProductID,
  GetUserByID,
  PutUserInfor,
} from "./service/ApiService";
import { FilterContext } from "pages/ProductPages/ProductList/context/FilterContext";
import { useNavigate } from "react-router-dom";

export default function UserInformation() {
  const navigate = useNavigate();
  const usertoken = JSON.parse(localStorage.getItem("userToken"));

  const { navbar, setNavbar } = useContext(FilterContext); // get information from context

  // contain user Data
  let [user, setUser] = useState([]);
  let [pass, setPass] = useState([]);
  // contain Order Data
  let [orderNameList, setOrderNameList] = useState([]);
  let [orderQuantityList, setOrderQuantityList] = useState([]);
  let [orderPriceList, setOrderPriceList] = useState([]);

  // use to re-render page
  let [reset, setReset] = useState(false);

  // handle when user change information
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    const UpdatePassword = async () => {
      try {
        // Get New Password
        const { value: formValues } = await Swal.fire({
          title: "Reset Password",
          html:
            '<input id="swal-input1" class="swal2-input" placeholder=""Enter New Password"">' +
            '<input id="swal-input2" class="swal2-input" placeholder="Re-enter New Password">',
          focusConfirm: false,
          preConfirm: () => {
            return [
              document.getElementById("swal-input1").value,
              document.getElementById("swal-input2").value,
            ];
          },
        });

        // check "Enter New Password" and "Re-enter New Password" are they similar?
        if (!formValues || formValues[0] !== formValues[1]) {
          // if they are not the same
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Passwords do not match.",
          });
        } else {
          // if they are the same
          Swal.fire({
            title: "Are you sure?",
            text: "You want to submit it!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!",
          }).then(async (result) => {
            if (result.isConfirmed) {
              if (formValues[0].length >= 6) {
                // if new password valid
                let newdata = {
                  user_id: user.user_id,
                  fullname: user.fullname,
                  phone_number: user.phone_number,
                  address: user.address,
                  role: user.role,
                  email: user.email,
                  password: formValues[0],
                };
                const response = await PutUserInfor(usertoken.user_id, newdata);
                if (response.status === 200) {
                  if (response.data.password !== pass) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userToken");
                    setNavbar(!navbar);
                    navigate("/signin");
                  } else {
                    // if new Password and old password is the same
                    Swal.fire({
                      icon: "error",
                      title: "Error",
                      text: "The password you just entered is the same as the old password",
                    });
                  }
                }
              } else {
                // if new password less than 6 character
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Password must be at least 6 characters long.",
                });
              }
            }
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while updating the password.",
        });
      }
    };
    UpdatePassword();
  };

  const handleChangeInfor = (e) => {
    e.preventDefault();
    const UpdateInFor = async () => {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You want to submit it!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, update it!",
        });

        if (result.isConfirmed) {
          const response = await PutUserInfor(usertoken.user_id, user);
          if (response.status === 200) {
            setReset(!reset);
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    UpdateInFor();
  };

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const response = await GetOrdersByProductID(usertoken.user_id);
        let nameList = [];
        let quantityList = [];
        let priceList = [];
        if (response.status === 200) {
          for (let i = 0; i < response.data.length; i++) {
            const order = await GetDetailByOrderID(response.data[i].order_id);
            if (order.status === 200) {
              for (let j = 0; j < order.data.length; j++) {
                nameList.push(order.data[j].produc_name);
                quantityList.push(order.data[j].quantity);
                priceList.push(order.data[j].price);
              }
            }
          }
          setOrderNameList(nameList);
          setOrderQuantityList(quantityList);
          setOrderPriceList(priceList);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    // call API to get User profile
    const fetchUserDataByID = async () => {
      try {
        if (usertoken != null) {
          const response = await GetUserByID(usertoken.user_id);
          if (response.status === 200) {
            setUser(response.data);
            setPass(response.data.password);
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchUserDataByID();

    fetchOrderList();
  }, [reset]);

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
      <section className="ftco-section " style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5"></div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-12">
              <div className="wrapper">
                <div className="row no-gutters">
                  <div className="col-md-6 d-flex align-items-stretch">
                    <div className="contact-wrap  w-100 p-md-5 p-4">
                      <h3 className="mb-4 text-center">Your Information</h3>
                      <div id="form-message-warning" className="mb-4"></div>
                      <div id="form-message-success" className="mb-4">
                        Your message was sent, thank you!
                      </div>
                      <form
                        method="POST"
                        id="contactForm"
                        name="contactForm"
                        onSubmit={handleChangeInfor}
                      >
                        <div className="row">
                          <div className="col-md-3 ">
                            <div className="form-group pr-0 pl-0  mb-0">Email</div>
                          </div>
                          <div className="col-md-9 ">
                            <div className="form-group pr-0 pl-0">
                              <input
                                type="email"
                                className="form-control pr-1 pl-1"
                                name="email"
                                value={user.email}
                                onChange={handleChangeInput}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-md-3 ">
                            <div className="form-group pr-0 pl-0 mb-0  mb-0">Username</div>
                          </div>
                          <div className="col-md-9">
                            <div className="form-group pr-0 pl-0">
                              <input
                                type="text"
                                className="form-control pr-1 pl-1"
                                name="fullname"
                                value={user.fullname}
                                onChange={handleChangeInput}
                              />
                            </div>
                          </div>
                          <div className="col-md-3 ">
                            <div className="form-group pr-0 pl-0  mb-0">Phone</div>
                          </div>
                          <div className="col-md-9 ">
                            <div className="form-group pr-0 pl-0">
                              <input
                                type="text"
                                className="form-control pr-1 pl-1"
                                name="phone_number"
                                value={user.phone_number}
                                onChange={handleChangeInput}
                              />
                            </div>
                          </div>
                          <div className="col-md-3 ">
                            <div className="form-group pr-0 pl-0  mb-0">Address</div>
                          </div>

                          <div className="col-md-9 ">
                            <div className="form-group pr-0 pl-0">
                              <input
                                type="text"
                                className="form-control pr-1 pl-1"
                                name="address"
                                value={user.address}
                                onChange={handleChangeInput}
                              />
                            </div>
                          </div>
                          <div className="col-md-12 mb-3">
                            <div className="form-group pr-0 pl-0">
                              <p className="text-danger" style={{ fontSize: "12px" }}>
                                *If you want to change the above information , please enter it and
                                click &quot;Update Information&quot; button to submit
                              </p>
                            </div>
                          </div>

                          <div className="col-md-6 ">
                            <div className="form-group pr-0 pl-0 d-flex justify-content-around">
                              <input
                                type="submit"
                                value="Update Information"
                                className="btn text-light btn-primary  "
                              />
                            </div>
                          </div>
                          <div className="col-md-6 ">
                            <div className="form-group pr-0 pl-0 d-flex justify-content-around">
                              <input
                                type="button"
                                value="Reset Password"
                                onClick={handleChangePassword}
                                className="btn text-light btn-primary  "
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex align-items-stretch">
                    <div className="info-wrap bg-primary  w-100 p-lg-5 p-4">
                      <h3 className="mb-4 mt-md-4 font-weight-bold">YOUR ORDER</h3>
                      <p className="text-light text-right">
                        <i className="fas fa-arrow-down"></i> Scroll down to see the review
                      </p>

                      <div
                        style={{ overflowY: "scroll", height: "420px", borderRadius: "10px" }}
                        className="p-3 scrollbar border "
                      >
                        {orderNameList.map((item, index) => (
                          <div
                            key={index}
                            className="dbox w-100 align-items-start border border border-light p-2  text-secondary mb-2 bg-light"
                            style={{ borderRadius: "10px" }}
                          >
                            <div className="d-flex align-items-center justify-content-between w-100  ">
                              <div className="d-flex align-items-center">
                                <Icon className="small">browse_gallery</Icon>
                                <span className="font-weight-bold" style={{ fontSize: "14px" }}>
                                  &nbsp;Product:&nbsp;
                                </span>
                                <span className="small">
                                  {item > 20 ? `${item.substring(0, 20)}...` : item}
                                </span>
                              </div>
                            </div>

                            <div className="d-flex  align-items-start justify-content-between w-100 ">
                              <div className="col-sm-5 pl-0 pr-0 d-flex align-items-center">
                                <Icon className="small">discount</Icon>
                                <span className="font-weight-bold" style={{ fontSize: "14px" }}>
                                  &nbsp;Quantity:&nbsp;
                                </span>
                                <span className="small"> {orderQuantityList[index]}</span>
                              </div>
                            </div>
                            <div className=" w-100 ">
                              <div className="font-weight-bold d-flex align-items-center">
                                <Icon className="small">monetization_on</Icon>
                                <span style={{ fontSize: "14px" }}>&nbsp;Price:&nbsp;</span>
                                <span className="small">{orderPriceList[index]} VND</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
