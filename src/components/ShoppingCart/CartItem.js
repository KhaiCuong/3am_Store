import { useShoppingCart } from "context/ShoppingCartContext";
import "./Cart.css";
import { MDBCardImage, MDBIcon, MDBTypography } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { GetCategoryByID, GetProductByID } from "./service/ApiService";
import { Icon } from "@mui/material";

// eslint-disable-next-line react/prop-types
export function CartItem({ id, quantity }) {
  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity, changeQuantity, SetPrice } =
    useShoppingCart();
  // eslint-disable-next-line no-unused-vars
  const [item, setItem] = useState([]);
  // eslint-disable-next-line no-unused-vars
  let [count, setCount] = useState(quantity);

  const [cate, setCate] = useState(quantity);

  // handale when user change quantity product
  const handleChangeInput = (e) => {
    setCount(e.target.value);
    changeQuantity(item.product_id, e.target.value);
  };

  useEffect(() => {
    const fetchProductDataByID = async () => {
      try {
        const response = await GetProductByID(id);
        if (response.status === 200) {
          setItem(response.data);
          SetPrice(id, response.data.price);
          const category = await GetCategoryByID(response.data.category_id);
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
          src={`http://localhost:5051${item.image}`}
          fluid
          style={{ width: "150px", height: "101px" }}
          alt="Generic placeholder image"
        />
      </div>

      <div className="flex-grow-1 ms-3">
        {/* remove product from cart */}
        <button
          className="float-end text-black border-0 bg-white"
          onClick={() => {
            removeFromCart(item.product_id);
          }}
        >
          <MDBIcon fas icon="times" />
        </button>

        <MDBTypography tag="h4" className="text-primary">
          {item.produc_name > 20 ? `${item.produc_name(0, 20)}...` : item.produc_name}
          &nbsp; <Icon>auto_awesome</Icon>
        </MDBTypography>

        <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
          Brand: {cate.category_name}
        </MDBTypography>

        <div className="d-flex align-items-center">
          <p className="fw-bold mb-0 me-5 pe-3">{item.price}$</p>

          <div className="def-number-input number-input safari_only">
            <button
              className="minus"
              onClick={() => {
                decreaseCartQuantity(item.product_id);
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
                increaseCartQuantity(item.product_id);
                incrementCount();
              }}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}
