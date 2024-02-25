import React, { useEffect, useState } from "react";
import "./Cart.css";
import { MDBCol, MDBInput, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";
import { useShoppingCart } from "context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { GetUserByID, PostOrder, PostOrderDetail, PutProductQuantity } from "services/ApiService";
import Swal from "sweetalert2";
import { PostPayment } from "services/ApiService";
import { PutProductTotalBuy } from "services/ApiService";

// eslint-disable-next-line react/prop-types
const ShoppingCartModal = ({ isOpen }) => {
  const { cartQuantity, canOrder, setCanOrder, cartItems, closeCart } = useShoppingCart();
  const navigate = useNavigate();
  // get userToken in localStorage to check user is logged in or not
  const usertoken = JSON.parse(localStorage.getItem("userToken"));
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState([]);
  const [select, setSelect] = useState("");
  const [errors, setErrors] = useState({});
  let [dataOrder, setDataOrder] = useState([]);

  // calculate total amount to be paid
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total = total + Number(cartItems[i].price) * Number(cartItems[i].quantity);
  }
  // handle when the user clicks the "Login" button
  const handleLogin = () => {
    closeCart();
    navigate("/signin");
  };

  // Validate data
  const validateForm = (dataInput) => {
    let errors = {};
    if (!dataInput.username) {
      errors.username = "Please enter your username";
    } else if (dataInput.username.length < 3 || dataInput.username.length > 30) {
      errors.username = "User Name must be between 3 - 30 characters";
    }
    if (!dataInput.phone_number) {
      errors.phone_number = "Please enter your Phone";
    }
    if (!dataInput.address) {
      errors.address = "Please enter your Address";
    }
    if (select === "" || select === null) {
      errors.payment = "Please Payment option";
    }
    return errors;
  };

  // handle when the user clicks the "Buy now" button
  const handleSubmit = (e) => {
    e.preventDefault();
    const AddOrder = async () => {
      try {
        const response = await PostOrder({
          ...dataOrder,
          totalPrice: total,
        });
        if (response.status === 201) {
          let orderID = response.data.orderId;

          for (let i = 0; i < cartItems.length; i++) {
            const dataDetail = {
              produc_name: cartItems[i].product_name,
              quantity: cartItems[i].quantity,
              price: cartItems[i].price,
              image: cartItems[i].image,
              productId: cartItems[i].id,
              orderId: response.data.orderId,
            };
            const detail = await PostOrderDetail(dataDetail);

            if (detail.status === 201) {
              PutProductQuantity(cartItems[i].id, cartItems[i].quantity);
              PutProductTotalBuy(cartItems[i].id, cartItems[i].quantity);
            }
          }
          if (select === "2") {
            try {
              console.log("response.data.orderId", orderID);
              const dataPayment = {
                orderId: orderID,
                fullname: usertoken.fullname ? usertoken.fullname : "",
                status: false,
              };
              const response = await PostPayment(dataPayment);
              if (response.status === 201) {
                closeCart();
                localStorage.removeItem("shopping-cart");
                navigate(`/checkout/${response.data.orderId}`);
              }
            } catch (error) {
              Swal.fire({
                title: "Payment faild",
                text: "Please try again.",
                icon: "error",
              });
            }
          } else {
            Swal.fire({
              title: "Completed",
              text: "Order successfully!",
              icon: "success",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "ok",
            }).then((result) => {
              if (result.isConfirmed) {
                try {
                  localStorage.removeItem("shopping-cart");
                  closeCart();
                  window.location.reload();
                } catch (error) {
                  console.log("err", error);
                }
              }
            });
          }
        }
      } catch (error) {
        Swal.fire({
          title: "Order faild",
          text: "Please try again.",
          icon: "error",
        });
      }
    };
    const newErrors = validateForm(dataOrder);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const listerror = Object.values(newErrors).join("\n");
      Swal.fire({
        icon: "error",
        title: listerror,
      });
      return;
    } else {
      AddOrder();
    }
  };

  // handle when user change information
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataOrder({
      ...dataOrder,
      [name]: value,
      quantity: cartQuantity ? cartQuantity : 0,
      image: cartItems[0] ? cartItems[0].image : "",
    });
  };

  const handleSelectChange = (e) => {
    console.log("e.target.value", e.target.value);
    setSelect(e.target.value); // Lưu giá trị lựa chọn vào state
  };

  // handle disable/enable "Buy now" button
  // const handleBuyButton = () => {
  //   if(!canOrder){
  //     return true
  //   }
  // };

  useEffect(() => {
    // call API to get User profile
    const fetchUserDataByID = async () => {
      try {
        if (usertoken != null) {
          const response = await GetUserByID(usertoken.userId);
          if (response.status === 200) {
            setUser(response.data);
          }
        }
        const initialState = {
          phone_number: usertoken ? usertoken.phone_number : "",
          address: usertoken ? usertoken.address : "",
          username: usertoken ? usertoken.fullname : "",
          userId: usertoken ? usertoken.userId : "",
          quantity: cartQuantity ? cartQuantity : 0,
          image: cartItems[0] ? cartItems[0].image : "",
        };

        setDataOrder(initialState);
      } catch (error) {
        console.log("error", error);
      }
    };
    console.log("Rerender");
    if (cartItems.length === 0) {
      setCanOrder(false);
    }
    fetchUserDataByID();
  }, [isOpen]);

  // console.log("total", cartItems);

  return (
    <ReactModal
      isOpen={isOpen}
      style={{ zIndex: 1000 }}
      className="Modal shopping-cart text-black"
      overlayClassName="Overlay"
    >
      <button className="closeBtn" onClick={closeCart}>
        <i className="fas fa-times-circle"></i>
      </button>

      <MDBRow>
        {/* Show product in Cart */}
        <MDBCol lg="7" sm="12" md="12" className="px-4 py-4">
          <MDBTypography tag="h3" className="mb-5 pt-2 text-center fw-bold text-uppercase">
            Your Products
          </MDBTypography>
          <div className="p-2" style={{ overflowY: "scroll", height: "360px" }}>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </div>
          <hr
            className="mb-4"
            style={{
              height: "2px",
              backgroundColor: "#1266f1",
              opacity: 1,
            }}
          />
          <div className="d-flex justify-content-between px-x">
            <p className="fw-bold">Discount: 0</p>
            <p className="fw-bold">$</p>
          </div>
          <div
            className="d-flex justify-content-between p-2 mb-2"
            style={{ backgroundColor: "#e1f5fe" }}
          >
            <MDBTypography tag="h5" className="fw-bold mb-0">
              Total: {total} $
            </MDBTypography>
            <MDBTypography tag="h5" className="fw-bold mb-0"></MDBTypography>
          </div>
        </MDBCol>

        {/* Show user information */}
        <MDBCol lg="5" sm="12" md="12" className="px-5 py-4">
          <MDBTypography tag="h3" className="mb-5 pt-2 text-center fw-bold text-uppercase">
            User Information
          </MDBTypography>
          {/* check user is logged in or not */}
          {usertoken != null ? (
            // aldready logged in
            <form className="mb-5" onSubmit={handleSubmit}>
              <MDBTypography tag="h5">Name</MDBTypography>
              <div className="mb-3">
                <MDBInput
                  type="text"
                  size="lg"
                  name="username"
                  error={errors.username}
                  value={dataOrder.username}
                  onChange={handleInputChange}
                />
              </div>
              <MDBTypography tag="h5">Phone Number</MDBTypography>
              <div className="mb-3">
                <MDBInput
                  type="text"
                  size="lg"
                  name="phone_number"
                  error={errors.phone_number}
                  value={dataOrder.phone_number}
                  onChange={handleInputChange}
                />
              </div>
              <MDBTypography tag="h5">Address</MDBTypography>
              <div className="mb-3">
                <MDBInput
                  type="text"
                  size="lg"
                  name="address"
                  value={dataOrder.address}
                  error={errors.address}
                  onChange={handleInputChange}
                />
              </div>
              <div hidden>
                <input type="number" name="totalPrice" value={total} />
              </div>

              <MDBTypography tag="h5">Payment</MDBTypography>

              <div className="mb-5">
                <select
                  className="form-select form-select-lg mb-3 text-secondary"
                  aria-label=".form-select-lg example"
                  onChange={handleSelectChange}
                >
                  <option value="" disabled selected>
                    Payment Options
                  </option>
                  <option value="1">Ship COD</option>
                  <option value="2">Paypal</option>
                </select>
              </div>
              <button
                type="submit"
                className="ripple ripple-surface btn btn-primary btn-lg btn-block mb-0"
                disabled={!canOrder}
              >
                Buy now
              </button>

              {/* <MDBTypography
                tag="h5"
                className="fw-bold mb-5"
                style={{ position: "absolute", bottom: "0" }}
              >
                <a href="#!" onClick={closeCart}>
                  <MDBIcon fas icon="angle-left me-2" />
                  Back to shopping
                </a>
              </MDBTypography> */}
            </form>
          ) : (
            // not logged in
            <div className="text-center pt-5">
              <p>Please login to make transactions </p>
              <button
                type="submit"
                className="ripple ripple-surface btn btn-primary btn-lg btn-block"
                onClick={handleLogin}
              >
                Login
              </button>
              {/* <MDBTypography
                tag="h5"
                className="fw-bold mb-5"
                style={{ position: "absolute", bottom: "0" }}
              >
                <a href="#!" onClick={closeCart}>
                  <MDBIcon fas icon="angle-left me-2" />
                  Back to shopping
                </a>
              </MDBTypography> */}
            </div>
          )}
        </MDBCol>
      </MDBRow>
    </ReactModal>
  );
};

export default ShoppingCartModal;
