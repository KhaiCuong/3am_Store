import { useEffect, useState } from "react";
import "../UserInformation/animate.css";
import "../UserInformation/style.css";
import bgImage from "assets/images/bg2.jpg";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import { Icon } from "@mui/material";
import { GetDetailByOrderID } from "services/ApiService";
import { Link, useParams } from "react-router-dom";
import { GetOrderByID } from "services/ApiService";
import { OrderDetailItem } from "./OrderDetailItem";
import moment from "moment";

// import team1 from "assets/images/team-5.jpg";
// import MKBox from "components/MKBox";
// import HorizontalTeamCard from "examples/Cards/TeamCards/HorizontalTeamCard";

export default function UserOrderDetail() {
  // use to re-render page
  //   let [reset, setReset] = useState(false);
  const { id } = useParams();

  let [order, setOrder] = useState([]);
  let [details, setDetails] = useState([]);

  //   const handleChangePassword = (e) => {
  //     e.preventDefault();
  //     const UpdatePassword = async () => {
  //       try {
  //         // Get New Password
  //         const { value: formValues } = await Swal.fire({
  //           title: "Reset Password",
  //           html:
  //             '<input id="swal-input1" className="swal2-input" placeholder=""Enter New Password"">' +
  //             '<input id="swal-input2" className="swal2-input" placeholder="Re-enter New Password">',
  //           focusConfirm: false,
  //           preConfirm: () => {
  //             return [
  //               document.getElementById("swal-input1").value,
  //               document.getElementById("swal-input2").value,
  //             ];
  //           },
  //         });

  //         // check "Enter New Password" and "Re-enter New Password" are they similar?
  //         if (!formValues || formValues[0] !== formValues[1]) {
  //           // if they are not the same
  //           Swal.fire({
  //             icon: "error",
  //             title: "Error",
  //             text: "Passwords do not match.",
  //           });
  //         } else {
  //           // if they are the same
  //           Swal.fire({
  //             title: "Are you sure?",
  //             text: "You want to submit it!",
  //             icon: "warning",
  //             showCancelButton: true,
  //             confirmButtonColor: "#3085d6",
  //             cancelButtonColor: "#d33",
  //             confirmButtonText: "Yes, update it!",
  //           }).then(async (result) => {
  //             if (result.isConfirmed) {
  //               if (formValues[0].length >= 6) {
  //                 // if new password valid
  //                 let newdata = {
  //                   userId: user.userId,
  //                   fullname: user.fullname,
  //                   phone_number: user.phone_number,
  //                   address: user.address,
  //                   role: user.role,
  //                   email: user.email,
  //                   password: formValues[0],
  //                 };
  //                 const response = await PutUserInfor(usertoken.userId, newdata);
  //                 if (response.status === 200) {
  //                   if (response.data.password !== pass) {
  //                     localStorage.removeItem("token");
  //                     localStorage.removeItem("userToken");
  //                     setNavbar(!navbar);
  //                     navigate("/signin");
  //                   } else {
  //                     // if new Password and old password is the same
  //                     Swal.fire({
  //                       icon: "error",
  //                       title: "Error",
  //                       text: "The password you just entered is the same as the old password",
  //                     });
  //                   }
  //                 }
  //               } else {
  //                 // if new password less than 6 character
  //                 Swal.fire({
  //                   icon: "error",
  //                   title: "Error",
  //                   text: "Password must be at least 6 characters long.",
  //                 });
  //               }
  //             }
  //           });
  //         }
  //       } catch (error) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Error",
  //           text: "An error occurred while updating the password.",
  //         });
  //       }
  //     };
  //     UpdatePassword();
  //   };

  //   const handleChangeInfor = (e) => {
  //     e.preventDefault();
  //     const UpdateInFor = async () => {
  //       try {
  //         const result = await Swal.fire({
  //           title: "Are you sure?",
  //           text: "You want to submit it!",
  //           icon: "warning",
  //           showCancelButton: true,
  //           confirmButtonColor: "#3085d6",
  //           cancelButtonColor: "#d33",
  //           confirmButtonText: "Yes, update it!",
  //         });

  //         if (result.isConfirmed) {
  //           const response = await PutUserInfor(usertoken.userId, user);
  //           if (response.status === 200) {
  //             const dataDetail = {
  //               ...usertoken,
  //               fullname: response.data.fullname,
  //               phone_number: response.data.phone_number,
  //               address: response.data.address,
  //             };
  //             localStorage.setItem("userToken", JSON.stringify(dataDetail));
  //             setReset(!reset);

  //             Swal.fire({
  //               title: "Completed",
  //               text: "User information updated successfully!",
  //               icon: "success",
  //               showCancelButton: false,
  //               confirmButtonColor: "#3085d6",
  //               confirmButtonText: "ok",
  //             }).then((result) => {
  //               if (result.isConfirmed) {
  //                 try {
  //                   navigate("/homes");
  //                 } catch (error) {
  //                   console.log("err", error);
  //                 }
  //               }
  //             });
  //           }
  //         }
  //       } catch (error) {
  //         console.log("error", error);
  //       }
  //     };
  //     UpdateInFor();
  //   };

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const response = await GetOrderByID(id);
        if (response.status === 200) {
          setOrder(response.data);
          // Order Detail
          const order = await GetDetailByOrderID(id);
          if (order.status === 200) {
            setDetails(order.data);
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchOrderList();
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
          <div className="row justify-content-center">
            <div className="col-lg-12 col-md-12">
              <div className="wrapper w-100">
                <div className="row no-gutters w-100">
                  <div className="col-md-12 d-flex align-items-stretch w-100">
                    <div className="contact-wrap w-100 p-md-5 p-4 bg-light heigh-100">
                      <Link to={"/user-order"} className="text-secondary d-flex align-items-center">
                        <Icon>arrow_back_ios</Icon> <span> &nbsp;Back to my Order</span>
                      </Link>
                      <div className="card mt-3 mb-3 pr-3" style={{ maxWidth: "100%" }}>
                        <div className="row g-0">
                          <div className="col-md-5 border border-top-0 border-bottom-0 border-left-0">
                            <h4 className="text-center bold">
                              <b>Order Infor</b>
                            </h4>

                            <div className="card-body">
                              <p className="p-0 card-text text-secondary">
                                <b>Username:</b> {order.username}
                              </p>
                              <p className="p-0 card-text text-secondary">
                                <b>Address: </b> {order.address}
                              </p>
                              <p className="p-0  card-text text-secondary">
                                <b> Phone Number:</b> {order.phone_number}
                              </p>
                              <p className="p-0  card-text text-secondary">
                                <b>Quantity:</b> {order.quantity}
                              </p>
                              <p className="p-0  card-text text-secondary">
                                <b>Total Price:</b> {order.totalPrice ? order.totalPrice : 0} $
                              </p>
                              <p className="p-0  card-text text-secondary">
                                <b>Order date:</b> {moment(order.createAt).format("DD/MM/YYYY")}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-7">
                            <h4 className="text-center bold">
                              <b>Order Detail</b>
                            </h4>

                            <div className="d-flex align-items-center justify-content-start flex-wrap ">
                              <div
                                className="p-2 w-100"
                                style={{ overflowY: "scroll", height: "360px" }}
                              >
                                {details.map((item) => (
                                  <OrderDetailItem key={item.detailId} {...item} />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
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
