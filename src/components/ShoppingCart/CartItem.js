import { useShoppingCart } from "context/ShoppingCartContext";
import "./Cart.css";
import { MDBCardImage, MDBIcon, MDBTypography } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export function CartItem({ quantity, type, times }) {
  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity, changeQuantity, changeDate } =
    useShoppingCart();
  // eslint-disable-next-line no-unused-vars
  const [item, setItem] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [location, setLocation] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [img, setImg] = useState([]);
  const [timeIn, setTimeIn] = useState([]);
  const [timeOut, setTimeOut] = useState([]);
  let [count, setCount] = useState(quantity);

  // var today = new Date();
  // const date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  // console.log("timeIn",timeIn)

  // handale when user change quantity product
  const handleChangeInput = (e) => {
    setCount(e.target.value);
    changeQuantity(item.accommodation_id, e.target.value, "Accommodation");
  };

  const handleChangeDateIn = (e) => {
    setTimeIn(e.target.value);
  };

  const handleChangeDateOut = (e) => {
    setTimeOut(e.target.value);
  };

  const handleSaveDate = () => {
    changeDate(item.accommodation_id, { timeIn, timeOut });
  };

  useEffect(() => {
    // if (typeof times != "undefined") {
    //   setTimeIn(times.timeIn);
    //   setTimeOut(times.timeOut);
    // }
    // call API get product information
    // axios
    //   .get(`http://localhost:5158/api/Accommodation/GetAccommodation/${id}`)
    //   .then((t) => {
    //     setItem(t.data.data);
    //     SetPrice(id, t.data.data.price);
    //     return t.data.data;
    //   })
    //   .then((item) => {
    //     axios
    //       .get(`http://localhost:5158/api/Location/GetLocation/${item.location_id}`)
    //       .then((t) => {
    //         setLocation(t.data.data.location_name);
    //       })
    //       .then((error) => console.log(error));
    //     axios
    //       .get(`http://localhost:5158/api/AccommodationImage/GetImagesByTouristSpotId/${id}`)
    //       .then((t) => {
    //         setImg(t.data.data[0]);
    //       })
    //       .then((error) => console.log(error));
    //   })
    //   .then((error) => console.log(error));
  }, []);

  // handle when user click the "+" button
  function incrementCount() {
    count = count + 1;
    setCount(count);
  }
  // handle when user click the "-" button
  function decrementCount() {
    count = count - 1;
    setCount(count);
  }

  return (
    <div className="d-flex align-items-center mb-3 border border-primary rounded p-3">
      {/* Show image product */}
      <div className="flex-shrink-0">
        <MDBCardImage
          src={`http://localhost:5158/${img}`}
          fluid
          style={{ width: "150px" }}
          alt="Generic placeholder image"
        />
      </div>

      <div className="flex-grow-1 ms-3">
        {/* remove product from cart */}
        <button
          className="float-end text-black border-0 bg-white"
          onClick={() => {
            removeFromCart(item.accommodation_id);
          }}
        >
          <MDBIcon fas icon="times" />
        </button>

        <MDBTypography tag="h5" className="text-primary">
          {type === "Accommodation" && item.accommodation_name}
          {type === "Accommodation" && <i className="fas fa-home ml-3"></i>}
        </MDBTypography>

        <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
          {type === "Accommodation" && `Location : ${location}`}
        </MDBTypography>

        <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
          Check-in date :{timeIn}
          <input
            type="date"
            id="checkin_date"
            onChange={handleChangeDateIn}
            onBlur={handleSaveDate}
            className="form-control"
          />
          {type === "Accommodation" && timeIn > timeOut && (
            <span className="text-danger "> Date must be less than Check-out Date</span>
          )}
        </MDBTypography>

        {type === "Accommodation" && (
          <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
            Check-out date : {timeOut}
            <input
              type="date"
              id="checkout_date"
              onChange={handleChangeDateOut}
              onBlur={handleSaveDate}
              className="form-control"
            />
            {timeOut < timeIn && (
              <span className="text-danger "> Date must be greater than Check-in Date</span>
            )}
          </MDBTypography>
        )}

        <div className="d-flex align-items-center">
          <p className="fw-bold mb-0 me-5 pe-3">{item.price}$</p>

          <div className="def-number-input number-input safari_only">
            <button
              className="minus"
              onClick={() => {
                decreaseCartQuantity(item.accommodation_id);
                decrementCount();
              }}
            ></button>
            <input
              className="quantity fw-bold text-black"
              onChange={handleChangeInput}
              value={count}
              type="number"
            />
            <button
              className="plus"
              onClick={() => {
                increaseCartQuantity(item.accommodation_id, "Accommodation", times);
                incrementCount();
              }}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}
