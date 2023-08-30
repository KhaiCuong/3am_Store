import React, { useEffect, useState } from "react";
import "./Cart.css";
import { MDBCol, MDBIcon, MDBInput, MDBRow, MDBTypography } from "mdb-react-ui-kit";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";
import { useShoppingCart } from "context/ShoppingCartContext";
import { CartItem } from "./CartItem";

// eslint-disable-next-line react/prop-types
const ShoppingCartModal = ({ isOpen }) => {
  const navigate = useNavigate();
  // get function cartItem to show list product in cart
  const { cartItems, closeCart } = useShoppingCart();
  // get userToken in localStorage to check user is logged in or not
  const usertoken = JSON.parse(localStorage.getItem("userToken"));

  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState([]);

  // calculate total amount to be paid
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total = total + Number(cartItems[i].price) * Number(cartItems[i].quantity);
  }

  // handle when the user clicks the "Login" button
  const handleLogin = () => {
    navigate("/login");
  };

  // handle when the user clicks the "Buy now" button
  const handleSubmit = (e) => {
    e.preventDefault();
    // call API to post the list of products that the user has added to the cart
    // for (let i = 0; i < cartItems.length; i++) {
    //   axios
    //     .post("http://localhost:5158/api/Booking/AddBooking", {
    //       user_id: user.user_id,
    //       accommodation_id: cartItems[i].id,
    //       quantity: cartItems[i].quantity,
    //       // created_at: cartItems[i].times.timeIn,
    //       // update_at: cartItems[i].times.timeOut,
    //     })
    //     .then()
    //     .catch((err) => console.log(err));
    // }
  };

  useEffect(() => {
    // call API to get User profile
    // if (usertoken != null) {
    //   axios
    //     .get(`http://localhost:5158/api/User/GetUser/${usertoken.user_id}`)
    //     .then(() => {
    //       setUser(res.data.data);
    //       SetOutEmail(res.data.data.email);
    //     })
    //     .then((error) => console.log(error));
    // }
  }, []);

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
        <MDBCol lg="7" className="px-4 py-4">
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
        <MDBCol lg="5" className="px-5 py-4">
          <MDBTypography tag="h3" className="mb-5 pt-2 text-center fw-bold text-uppercase">
            User Information
          </MDBTypography>
          {/* check user is logged in or not */}
          {usertoken != null ? (
            // aldready logged in
            <form className="mb-5" onSubmit={handleSubmit}>
              <MDBTypography tag="h5">Name</MDBTypography>
              <div className="mb-3">
                <MDBInput type="text" size="lg" name="user_name" value={user.user_name} />
              </div>
              <MDBTypography tag="h5">Phone Number</MDBTypography>
              <div className="mb-3">
                <MDBInput type="text" size="lg" name="phone_number" value={user.phone_number} />
              </div>
              <MDBTypography tag="h5">Email</MDBTypography>
              <div className="mb-3">
                <MDBInput type="text" size="lg" name="email" />
              </div>
              <div hidden>
                <input type="number" name="totalPrice" value={total} />
              </div>
              <p className="mb-5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit
                <a href="#!"> obcaecati sapiente</a>.
              </p>

              <button
                type="submit"
                className="ripple ripple-surface btn btn-primary btn-lg btn-block"
              >
                Buy now
              </button>

              <MDBTypography
                tag="h5"
                className="fw-bold mb-5"
                style={{ position: "absolute", bottom: "0" }}
              >
                <a href="#!" onClick={closeCart}>
                  <MDBIcon fas icon="angle-left me-2" />
                  Back to shopping
                </a>
              </MDBTypography>
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
                <a href="/login" className="text-white">
                  Login
                </a>
              </button>
              <MDBTypography
                tag="h5"
                className="fw-bold mb-5"
                style={{ position: "absolute", bottom: "0" }}
              >
                <a href="#!" onClick={closeCart}>
                  <MDBIcon fas icon="angle-left me-2" />
                  Back to shopping
                </a>
              </MDBTypography>
            </div>
          )}
        </MDBCol>
      </MDBRow>
    </ReactModal>
  );
};

export default ShoppingCartModal;
