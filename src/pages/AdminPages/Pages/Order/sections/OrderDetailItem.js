import "./Cart.css";
import { MDBCardImage, MDBTypography } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { GetBrandByID, GetProductByID } from "services/ApiService";
import { Icon } from "@mui/material";
import { Domain } from "services/Domain";

// eslint-disable-next-line react/prop-types
export function OrderDetailItem({ productId, quantity }) {
  // eslint-disable-next-line no-unused-vars
  const [item, setItem] = useState([]);
  const [cate, setCate] = useState(quantity);

  useEffect(() => {
    const fetchProductDataByID = async () => {
      try {
        const response = await GetProductByID(productId);
        if (response.status === 200) {
          setItem(response.data);
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
  return (
    <div className="d-flex align-items-center mb-3 border border-primary rounded p-3">
      {/* Show image product */}
      <div className="flex-shrink-0">
        <MDBCardImage
          src={`${Domain}/${item.image}`}
          fluid
          style={{ width: "150px", height: "101px" }}
          alt="image"
        />
      </div>

      <div className="flex-grow-1 ms-3">
        <MDBTypography tag="h4" className="text-primary">
          {item.produc_name > 20 ? `${item.produc_name(0, 20)}...` : item.produc_name}
          &nbsp; <Icon>auto_awesome</Icon>
        </MDBTypography>
        <div className="d-flex align-items-center justify-content-between">
          <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
            Brand: {cate.category_name}
          </MDBTypography>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <p className="fw-bold mb-0 me-5 pe-3">{item.price}$</p>
          <div className="mr-1 border pl-3 pr-3 border-primary">{quantity}</div>
        </div>
      </div>
    </div>
  );
}
