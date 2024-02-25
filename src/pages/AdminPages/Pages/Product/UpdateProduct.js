import "../../css/style.css";
import "../../css/dataTables.bootstrap5.min.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetBrandList,
  GetProductByID,
  GetProductImageByID,
  PostNewImage,
  PutProduct,
} from "services/ApiService";
import Swal from "sweetalert2";
import { Icon } from "@mui/material";
import { Domain } from "services/Domain";
import { GetAuctionByProductID } from "services/ApiService";
import moment from "moment";
import { PutAuction } from "services/ApiService";
import { GetBidByAutionID } from "services/ApiService";

export default function UpdateProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [bid, setPid] = useState([]);

  const [brand, setBrand] = useState([]);
  let [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [minDate, setMinDate] = useState("");
  const [myFile, setMyFile] = useState("");
  const [check, setCheck] = useState(true);
  const [auction, setAuction] = useState([]);

  // Validate data
  const validateForm = (dataInput, dataAution, checked) => {
    let errors = {};
    if (!dataInput.produc_name) {
      errors.produc_name = "Please enter your Product Name";
    } else if (dataInput.produc_name.length < 3 || dataInput.produc_name.length > 30) {
      errors.produc_name = "Product Name must be between 3 - 30 characters";
    }

    if (!dataInput.diameter) {
      errors.diameter = "Please enter your diameter";
    } else if (dataInput.produc_name < 0 || dataInput.produc_name.length > 100) {
      errors.produc_name = "diameter must be between 0 - 100 mm";
    }

    if (!dataInput.instock) {
      errors.instock = "Please enter your instock";
    } else if (dataInput.instock < 0) {
      errors.instock = "instock must be greater than 0";
    }

    if (!dataInput.price) {
      errors.price = "Please enter your price";
    } else if (dataInput.price < 0) {
      errors.price = "price must be greater than 0";
    }

    if (!dataInput.description) {
      errors.description = "Please enter your description";
    } else if (dataInput.description.length < 3 || dataInput.description.length > 300) {
      errors.description = "Product Name must be between 3 - 300 characters";
    }

    if (!dataAution.startTime && checked === false) {
      errors.startTime = "Please enter Start Time Aution";
    }
    if (!dataAution.endTime && checked === false) {
      errors.endTime = "Please enter Entime Time Aution";
    } else if (dataAution.endTime <= dataAution.startTime && checked === false) {
      errors.endTime = "End time must be greater than start time";
    }
    return errors;
  };

  const formData = new FormData();

  const handleBack = () => {
    navigate("/admin/products");
  };
  const { id } = useParams();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleChangeInputAution = (e) => {
    const { name, value } = e.target;
    setAuction({
      ...auction,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  //upload Image
  const handleFileChange = (e) => {
    setMyFile(e.target.files);
  };

  const handleSubmit = (e) => {
    if (myFile.length > 0) {
      for (var i = 0; i < myFile.length; i++) {
        formData.append("files", myFile[i]);
      }
    }
    e.preventDefault();
    const newErrors = validateForm(product, auction, check);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Swal.fire({
        icon: "error",
        title: "Please Enter Information",
      });
      return;
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            let data = {
              ...product,
              type: check ? 1 : 2,
              status: product.status === "true" || product.status === true ? true : false,
              isWaterproof:
                product.isWaterproof === "true" || product.isWaterproof === true ? true : false,
              totalBuy: product.totalBuy == null ? 0 : Number(product.totalBuy),
            };
            const response = await PutProduct(id, data);

            console.log("auction.autionId", auction.autionId);

            if (response.status === 200) {
              // Check if new files are selected
              if (formData.get("files")) {
                const imageResponse = await PostNewImage(id, formData);
                if (imageResponse.status === 201) {
                  if (check === false) {
                    let dataAutions = {
                      ...auction,
                      status: true,
                      name: product.produc_name,
                      lastBidPrice: product.price,
                      productId: product.productId,
                    };
                    const auctionRespone = await PutAuction(auction.autionId, dataAutions);
                    if (auctionRespone.status === 200) {
                      Swal.fire("Updated!", "Your Product has been Updated.", "success");
                      navigate("/admin/products");
                    } else {
                      Swal.fire({
                        title: "Updated faild",
                        text: "Please try later",
                        icon: "error",
                      });
                    }
                  } else {
                    Swal.fire("Updated!", "Your Product has been Updated.", "success");
                    navigate("/admin/products");
                  }
                }
              } else {
                if (check === false) {
                  let dataAutions = {
                    ...auction,
                    status: true,
                    name: product.produc_name,
                    lastBidPrice: product.price,
                    productId: product.productId,
                  };
                  const auctionRespone = await PutAuction(auction.autionId, dataAutions);
                  if (auctionRespone.status === 200) {
                    Swal.fire("Updated!", "Your Product has been Updated.", "success");
                    navigate("/admin/products");
                  } else {
                    Swal.fire({
                      title: "Updated faild",
                      text: "Please try late",
                      icon: "error",
                    });
                  }
                } else {
                  Swal.fire("Updated!", "Your Product has been Updated.", "success");
                  navigate("/admin/products");
                }
              }
            }
          } catch (error) {
            console.log("err", error);
          }
        }
      });
    }
  };

  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const response = await GetProductByID(id);
        if (response.status === 200) {
          setProduct(response.data);
          const imageResponse = await GetProductImageByID(response.data.productId);
          if (imageResponse.status === 200) {
            setImages(imageResponse.data);
          }

          const auctionResponse = await GetAuctionByProductID(response.data.productId);
          if (auctionResponse.status === 200) {
            setCheck(false);
            const startTimeFormat = moment
              .utc(auctionResponse.data.startTime)
              .format("YYYY-MM-DDTHH:mm");
            const endTimeFormat = moment
              .utc(auctionResponse.data.endTime)
              .format("YYYY-MM-DDTHH:mm");

            setAuction(auctionResponse.data);
            auction.startTime = startTimeFormat;
            auction.endTime = endTimeFormat;
            auction.autionId = auctionResponse.data.autionId;
            setAuction(auction);
            const bidResponse = await GetBidByAutionID(auctionResponse.data.autionId);
            if (bidResponse.status === 200) {
              setPid([...bidResponse.data].sort((a, b) => b.bidId - a.bidId));
            }
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    const fetchBrand = async () => {
      try {
        const response = await GetBrandList();
        if (response.status === 200) {
          setBrand(response.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    const today = new Date().toISOString().slice(0, 16);
    setMinDate(today);

    fetchBrand();
    fetchDataProduct();
  }, []);

  return (
    <div className="container space-sideBar mt-5 pt-5 font-weight-bold text-uppercase">
      <h2 className="text-center">
        Update product
        <b className="text-danger" hidden={product.type == 2 ? false : true}>
          {" "}
          Auction
        </b>
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="productId" className="form-label w-100">
            Product Id:
          </label>
          <input
            type="text"
            className="form-control"
            id="productId"
            name="productId"
            value={product.productId}
            onChange={handleChangeInput}
            disabled
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="produc_name" className="form-label w-100">
            Product Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="produc_name"
            value={product.produc_name}
            name="produc_name"
            onChange={handleChangeInput}
          />
          <span
            className="text-danger h6"
            hidden={errors.produc_name != null || errors.produc_name != "" ? false : true}
          >
            {errors.produc_name}
          </span>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="status" className="form-label w-100">
            Status:
          </label>
          <select id="status" className="form-control" name="status" onChange={handleChangeInput}>
            <option value="true" selected={product.status}>
              True
            </option>
            <option value="false" selected={!product.status}>
              False
            </option>
          </select>
        </div>
        <div className="row">
          <div className="mb-3 mt-3 col-md-4">
            <label htmlFor="isWaterproof" className="form-label">
              Waterproof:
            </label>
            <select
              id="isWaterproof"
              className="form-control"
              name="isWaterproof"
              onChange={handleChangeInput}
              style={{ width: "80%" }}
            >
              <option value="true" selected={product.isWaterproof}>
                True
              </option>
              <option value="false" selected={!product.isWaterproof}>
                False
              </option>
            </select>
          </div>
          <div className="mb-3 mt-3 col-md-4">
            <label htmlFor="diameter" className="form-label w-100">
              Diameter:
            </label>
            <input
              type="number"
              className="form-control"
              value={product.diameter}
              id="diameter"
              name="diameter"
              style={{ width: "80%" }}
              onChange={handleChangeInput}
            />
            <span
              className="text-danger h6"
              hidden={errors.diameter != null || errors.diameter != "" ? false : true}
            >
              {errors.diameter}
            </span>
          </div>
          <div className="mb-3 mt-3 col-md-4">
            <label htmlFor="gender" className="form-label w-100">
              Gender:
            </label>
            <select
              id="gender"
              className="form-control"
              name="gender"
              onChange={handleChangeInput}
              style={{ width: "80%" }}
            >
              <option value="Men" selected={product.gender}>
                Men
              </option>
              <option value="Woman" selected={!product.gender}>
                Woman
              </option>
            </select>
          </div>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="categoryId" className="form-label w-100">
            Brand:
          </label>
          <select
            id="categoryId"
            className="form-control"
            name="categoryId"
            onChange={handleChangeInput}
          >
            {brand.length > 0 ? (
              brand.map((item, index) => {
                return (
                  <option
                    key={index}
                    value={item.categoryId}
                    selected={item.categoryId === product.categoryId}
                  >
                    {item.category_name}
                  </option>
                );
              })
            ) : (
              <option value="">No information displayed</option>
            )}
          </select>
        </div>

        <div className="row">
          <div className="mb-3 mt-3 col-md-4">
            <label htmlFor="instock" className="form-label w-100">
              Instock:
            </label>
            <input
              type="number"
              className="form-control"
              id="instock"
              value={product.instock}
              name="instock"
              style={{ width: "80%" }}
              onChange={handleChangeInput}
            />
            <span
              className="text-danger h6"
              hidden={errors.instock != null || errors.instock != "" ? false : true}
            >
              {errors.instock}
            </span>
          </div>
          <div className="mb-3 mt-3 col-md-4">
            <label htmlFor="price" className="form-label w-100">
              Price:
            </label>
            <input
              type="number"
              className="form-control"
              value={product.price}
              id="price"
              name="price"
              style={{ width: "80%" }}
              onChange={handleChangeInput}
            />
            <span
              className="text-danger h6"
              hidden={errors.price != null || errors.price != "" ? false : true}
            >
              {errors.price}
            </span>
          </div>
          <div className="mb-3 mt-3 col-md-4">
            <label htmlFor="totalBuy" className="form-label w-100">
              Total Buy:
            </label>
            <input
              type="number"
              className="form-control"
              id="totalBuy"
              name="totalBuy"
              style={{ width: "80%" }}
              defaultValue={0}
              onChange={handleChangeInput}
            />
          </div>
        </div>

        <div className="mb-3 mt-3">
          <label htmlFor="description" className="form-label w-100">
            Description:
          </label>
          <textarea
            rows="3"
            className="form-control"
            value={product.description}
            id="description"
            name="description"
            onChange={handleChangeInput}
          />
          <span
            className="text-danger h6"
            hidden={errors.description != null || errors.description != "" ? false : true}
          >
            {errors.description}
          </span>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="photoimg" className="form-label w-100">
            Old Photo
          </label>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {images.map((item, index) => (
              <div key={index} style={{ width: "200px", height: "200px", margin: "5px" }}>
                <img
                  src={`${Domain}/${item}`}
                  alt={item}
                  className=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </div>
          <label htmlFor="photoimg" style={{ marginTop: "10px" }} className="form-label w-100">
            Add New Photo:
          </label>
          <input
            type="file"
            className="form-control height-20"
            id="photoimg"
            onChange={handleFileChange}
            multiple
          />
        </div>
        <div className="row" hidden={check}>
          <div className="mb-3 mt-3 col-md-6">
            <label htmlFor="startTime" className="form-label w-100">
              Start Time:
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="startTime"
              name="startTime"
              style={{ width: "80%" }}
              min={minDate}
              onChange={handleChangeInputAution}
              value={auction.startTime}
            />
            <span
              className="text-danger h6"
              hidden={errors.startTime != null || errors.startTime != "" ? false : true}
            >
              {errors.startTime}
            </span>
          </div>
          <div className="mb-3 mt-3 col-md-6">
            <label htmlFor="endTime" className="form-label w-100">
              End Time:
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="endTime"
              name="endTime"
              style={{ width: "80%" }}
              min={minDate}
              onChange={handleChangeInputAution}
              value={auction.endTime}
            />
            <span
              className="text-danger h6"
              hidden={errors.endTime != null || errors.endTime != "" ? false : true}
            >
              {errors.endTime}
            </span>
          </div>
        </div>

        <div className="">
          <h4 className="text-center bold">
            <b>Bid List</b>
          </h4>

          <div className="d-flex align-items-center justify-content-start flex-wrap ">
            <div className="p-2 w-100" style={{ overflowY: "scroll", height: "360px" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Fullname</th>
                    <th scope="col">Bid price</th>
                    <th scope="col">Bid time</th>
                  </tr>
                </thead>
                <tbody>
                  {bid.map((item, index) => (
                    <tr className="text-secondary" key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        {item.userName}{" "}
                        <b
                          className="text-danger"
                          style={{ fontSize: "18px" }}
                          hidden={index === 0 ? false : true}
                        >
                          {" "}
                          win
                        </b>
                      </td>
                      <td>{item.pidPice}</td>
                      <td>{moment.utc(item.createdAt).format("YYYY-MM-DD HH:mm")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-around align-items-center mt-4">
          <div className="d-flex justify-content-between align-items-center w-50">
            <button
              className="btn btn-secondary d-flex align-items-center"
              onClick={() => handleBack()}
            >
              <Icon>arrow_back_ios</Icon> <span> &nbsp;Back</span>
            </button>

            <button type="submit" className="btn btn-primary d-flex align-items-center">
              <Icon>data_saver_on</Icon> <span> &nbsp;Update</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
