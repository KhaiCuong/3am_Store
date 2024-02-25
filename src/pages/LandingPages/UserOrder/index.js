import { useEffect, useState } from "react";
import "../UserInformation/animate.css";
import "../UserInformation/style.css";
import bgImage from "assets/images/bg2.jpg";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import { Icon } from "@mui/material";
import { GetOrdersByUserID } from "services/ApiService";
import Swal from "sweetalert2";
import { PutOrderStatus } from "services/ApiService";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { GetPaymentList } from "services/ApiService";
import { Domain } from "services/Domain";

// import team1 from "assets/images/team-5.jpg";
// import MKBox from "components/MKBox";
// import HorizontalTeamCard from "examples/Cards/TeamCards/HorizontalTeamCard";

export default function UserOrder() {
  const usertoken = JSON.parse(localStorage.getItem("userToken"));
  let [orders, setOrders] = useState([]);
  let [completes, setCompletes] = useState([]);
  let [cancels, setCancels] = useState([]);
  let [reset, setReset] = useState(true);
  let [page, setPage] = useState(" Order ");
  const [payment, setPayment] = useState([]);
  const [paymentFailed, setPaymentFailed] = useState([]);
  // const [shipCode, setShipCode] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const response = await GetOrdersByUserID(usertoken.userId);
        if (response.status === 200) {
          const filteredOrders = response.data.filter(
            (order) => order.status === "Preparing" || order.status === "Delivery"
          );
          setOrders(filteredOrders);

          const filteredCompleted = response.data.filter((order) => order.status === "Completed");
          console.log("filteredCompleted", filteredCompleted);
          setCompletes(filteredCompleted);

          const filteredCanceled = response.data.filter((order) => order.status === "Canceled");
          setCancels(filteredCanceled);

          const paymentRespone = await GetPaymentList();
          if (paymentRespone.status === 200) {
            let ListOrderPayment = [];
            let ListOrderPaymentFailed = [];
            let ListShipCode = [];

            paymentRespone.data.forEach((pm) => {
              if (pm.status === true) {
                ListOrderPayment.push(pm.orderId);
              } else if (pm.status === false) {
                ListOrderPaymentFailed.push(pm.orderId);
              } else {
                ListShipCode.push(pm.orderId);
              }
            });
            setPayment(ListOrderPayment);
            setPaymentFailed(ListOrderPaymentFailed);
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchOrderList();
  }, [page, reset]);

  const handleChangePage = (e) => {
    const { value } = e.target;
    if (value == "History") {
      setPage("Completed");
    } else {
      setPage(value);
    }
  };

  const handlePayment = (orId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Payment it?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        navigate(`/checkout/${orId}`);
      }
    });
  };

  const handleChangeStatus = (orderId, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to confirm it?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await PutOrderStatus(orderId, status);
          if (response.status === 200) {
            Swal.fire({
              title: "Completed",
              text: "successfully!",
              icon: "success",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "ok",
            }).then((result) => {
              if (result.isConfirmed) {
                setReset(!reset);
                window.location.reload();
              }
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Faild",
            text: "An error occurred, please try again later.",
            icon: "error",
          });
        }
      }
    });
  };
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
                      <div className="d-flex justify-content-end align-items-center">
                        <div>
                          <input
                            type="submit"
                            value=" Order "
                            onClick={handleChangePage}
                            className="btn text-light btn-secondary border-radius-left"
                          />
                          <input
                            type="submit"
                            value="History"
                            onClick={handleChangePage}
                            className="btn text-light btn-secondary ml-1 mr-1"
                          />

                          <input
                            type="submit"
                            value="Cancel"
                            onClick={handleChangePage}
                            className="btn text-light btn-secondary border-radius-right "
                          />
                        </div>
                      </div>
                      <div className="mb-1">
                        {page === " Order " && (
                          <h3 className="text-center">
                            <b>Your Order</b>{" "}
                          </h3>
                        )}
                        {page === "Cancel" && (
                          <h3 className="text-center">
                            <b>Order Cancel</b>
                          </h3>
                        )}
                        {page === "Completed" && (
                          <h3 className="text-center">
                            <b>Order History</b>
                          </h3>
                        )}
                      </div>
                      <div style={{ overflowY: "scroll", height: "600px" }}>
                        <div className="d-flex align-items-center justify-content-start flex-wrap">
                          {page === " Order " &&
                            orders.map((item) => (
                              <div
                                className="card rounded p-4"
                                style={{ width: "32%", marginRight: "0.5%", marginLeft: "0.5%" }}
                                key={item.id}
                              >
                                <img
                                  className="card-img-top"
                                  alt="Card image cap"
                                  src={`${Domain}/${item.image}`}
                                  style={{ height: "300px" }}
                                />
                                <div className="card-body pl-0 pr-0">
                                  <h5 className="card-title fontsize-small font-weight-bold">
                                    {item.username}
                                  </h5>
                                  <div className="card-text fontsize-small">
                                    <p className="p-0 mb-0">Quantity: {item.quantity}</p>
                                    <p className="p-0 mb-0">Total Price: {item.totalPrice} $</p>
                                    <p className="p-0 mb-0">
                                      Order date: {moment(item.createAt).format("DD/MM/YYYY")}
                                    </p>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between">
                                    {item.status === "Preparing" && (
                                      <h4 className="font-weight-bold" style={{ color: "orange" }}>
                                        Preparing
                                      </h4>
                                    )}
                                    {item.status === "Delivery" && (
                                      <h4 className="font-weight-bold" style={{ color: "blue" }}>
                                        Delivery
                                      </h4>
                                    )}
                                    <btn
                                      className="btn btn-info mb-0"
                                      hidden={!paymentFailed.includes(item.orderId)}
                                      onClick={() => {
                                        handlePayment(item.orderId);
                                      }}
                                    >
                                      Payment Now
                                    </btn>
                                    <h4
                                      className="font-weight-bold"
                                      style={{ color: "Aqua" }}
                                      hidden={!payment.includes(item.orderId)}
                                    >
                                      Paid
                                    </h4>
                                    <h4
                                      className="font-weight-bold"
                                      style={{ color: "silver" }}
                                      hidden={
                                        payment.includes(item.orderId) ||
                                        paymentFailed.includes(item.orderId)
                                      }
                                    >
                                      Ship COD
                                    </h4>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                  <Link
                                    to={"orderdetail/" + item.orderId}
                                    className="btn btn-primary"
                                  >
                                    Detail
                                  </Link>
                                  {item.status === "Preparing" && (
                                    <input
                                      type="submit"
                                      value=" Cancel "
                                      onClick={() => handleChangeStatus(item.orderId, "Canceled")}
                                      className="btn text-light btn-secondary"
                                    />
                                  )}
                                  {item.status === "Delivery" && (
                                    <input
                                      type="submit"
                                      value="Received"
                                      onClick={() => handleChangeStatus(item.orderId, "Completed")}
                                      className="btn text-light btn-secondary"
                                    />
                                  )}
                                </div>
                              </div>
                            ))}

                          {page === "Cancel" &&
                            cancels.map((item) => (
                              <div
                                className="card rounded p-4"
                                style={{ width: "32%", marginRight: "0.5%", marginLeft: "0.5%" }}
                                key={item.id}
                              >
                                <img
                                  className="card-img-top"
                                  alt="Card image cap"
                                  style={{ height: "300px" }}
                                  src={`${Domain}/${item.image}`}
                                />
                                <div className="card-body  pl-0 pr-0">
                                  <h5 className="card-title fontsize-small font-weight-bold">
                                    {item.username}
                                  </h5>
                                  <div className="card-text fontsize-small">
                                    <p className="p-0 mb-0">Quantity: {item.quantity}</p>
                                    <p className="p-0 mb-0">Total Price: {item.totalPrice} $</p>
                                    <p className="p-0 mb-0">
                                      Order date: {moment(item.createAt).format("DD/MM/YYYY")}
                                    </p>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between">
                                    <h4 className="font-weight-bold" style={{ color: "red" }}>
                                      Canceled
                                    </h4>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                  {/* <input
                                    type="submit"
                                    value=" Detail "
                                    className="btn text-light btn-primary"
                                  /> */}

                                  <Link
                                    to={"orderdetail/" + item.orderId}
                                    className="btn btn-primary"
                                  >
                                    {" "}
                                    Detail{" "}
                                  </Link>
                                </div>
                              </div>
                            ))}

                          {page === "Completed" &&
                            completes.map((item) => (
                              <div
                                className="card rounded p-4"
                                style={{ width: "32%", marginRight: "0.5%", marginLeft: "0.5%" }}
                                key={item.id}
                              >
                                <img
                                  className="card-img-top"
                                  alt="Card image cap"
                                  style={{ height: "300px" }}
                                  src={`${Domain}/${item.image}`}
                                />
                                <div className="card-body pl-0 pr-0">
                                  <h5 className="card-title fontsize-small font-weight-bold">
                                    {item.username}
                                  </h5>
                                  <div className="card-text fontsize-small">
                                    <p className="p-0 mb-0">Quantity: {item.quantity}</p>
                                    <p className="p-0 mb-0">Total Price: {item.totalPrice} $</p>
                                    <p className="p-0 mb-0">
                                      Order date: {moment(item.createAt).format("DD/MM/YYYY")}
                                    </p>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between">
                                    <h4 className="font-weight-bold" style={{ color: "green" }}>
                                      Completed
                                    </h4>
                                    <h4
                                      className="font-weight-bold"
                                      style={{ color: "Aqua" }}
                                      hidden={!payment.includes(item.orderId)}
                                    >
                                      Paid
                                    </h4>
                                    <h4
                                      className="font-weight-bold"
                                      style={{ color: "silver" }}
                                      hidden={
                                        payment.includes(item.orderId) ||
                                        paymentFailed.includes(item.orderId)
                                      }
                                    >
                                      Ship COD
                                    </h4>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                  <Link
                                    to={"orderdetail/" + item.orderId}
                                    className="btn btn-primary"
                                  >
                                    {" "}
                                    Detail{" "}
                                  </Link>
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
        </div>
      </section>
    </>
  );
}
