import { useShoppingCart } from "context/ShoppingCartContext";
import "./Cart.css";
import { MDBCardImage, MDBIcon, MDBTypography } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { GetBrandByID, GetProductByID } from "services/ApiService";
import { Icon } from "@mui/material";

// eslint-disable-next-line react/prop-types
export function CartItem({ id, quantity }) {
  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity, SetPrice, setCanOrder } =
    useShoppingCart();
  // eslint-disable-next-line no-unused-vars
  const [item, setItem] = useState([]);
  // eslint-disable-next-line no-unused-vars
  let [count, setCount] = useState(quantity);
  const [cate, setCate] = useState(quantity);
  const [rangeError, setRangeError] = useState(checkQuantityError);
  const [instockError, setInstockError] = useState(true);

  function checkQuantityError() {
    if (count > 50 || count < 1) {
      setCanOrder(false);
      return false;
    } else {
      setCanOrder(true);
      return true;
    }
  }

  // handale when user change quantity product
  // function handleChangeInput(e) {
  //   setCount(e.target.value);
  //   validatetionQuantity();
  //   changeQuantity(item.productId, e.target.value);
  // }

  useEffect(() => {
    const fetchProductDataByID = async () => {
      try {
        const response = await GetProductByID(id);
        if (response.status === 200) {
          setItem(response.data);
          console.log("response.data.instock", response.data.instock);
          console.log("count", count);

          if (response.data.instock < count && rangeError) {
            setInstockError(false);
            setCanOrder(false);
          }
          SetPrice(id, response.data.price);
          const category = await GetBrandByID(response.data.categoryId);
          if (category.status === 200) {
            setCate(category.data);
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchProductDataByID();
  }, []);

  // handle when user click the "+" button
  function incrementCount() {
    count = count + 1;
    setCount(count);
    validatetionQuantity();
  }
  // handle when user click the "-" button
  function decrementCount() {
    count = count - 1;
    setCount(count);
    validatetionQuantity();
  }

  function validatetionQuantity() {
    if (count > 50 || count < 1) {
      setRangeError(false);
      setInstockError(true);
      setCanOrder(false);
    } else if (item.instock < count) {
      setRangeError(true);
      setInstockError(false);
      setCanOrder(false);
    } else {
      setRangeError(true);
      setInstockError(true);
      setCanOrder(true);
    }
  }

  return (
    <div className="d-flex align-items-center mb-3 border border-primary rounded p-3">
      {/* Show image product */}
      <div className="flex-shrink-0" style={{ width: "150px", height: "101px" }}>
        <MDBCardImage
          src={`http://localhost:8080/${item.image}`}
          fluid
          style={{ width: "150px", height: "101px" }}
          alt="image"
        />
      </div>

      <div className="flex-grow-1 ms-3">
        {/* remove product from cart */}
        <button
          className="float-end text-black border-0 bg-white"
          onClick={() => {
            removeFromCart(item.productId);
          }}
        >
          <MDBIcon fas icon="times" />
        </button>
        <MDBTypography tag="h4" className="text-primary">
          {item.produc_name > 20 ? `${item.produc_name(0, 20)}...` : item.produc_name}
          &nbsp; <Icon>auto_awesome</Icon>
        </MDBTypography>
        <div className="d-flex align-items-center justify-content-between">
          <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
            Brand: {cate.category_name}
          </MDBTypography>
          <div className="def-number-input number-input safari_only">
            <button
              className="minus"
              onClick={() => {
                decreaseCartQuantity(item.productId);
                decrementCount();
              }}
            ></button>
            <input
              className="quantity fw-bold text-black pl-0 pr-0"
              style={{ width: "200px" }}
              disabled
              value={count}
              type="number"
            />
            <button
              className="plus"
              onClick={() => {
                increaseCartQuantity(item.productId);
                incrementCount();
              }}
            ></button>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between">
          <p className="fw-bold mb-0 me-5 pe-3">{item.price}$</p>
          <span className="err-text" hidden={rangeError}>
            You can only buy from 1 to 50 products at a time
          </span>
          <span className="err-text" hidden={instockError}>
            The quantity of product is not enough
          </span>
        </div>
      </div>
    </div>
  );
}
