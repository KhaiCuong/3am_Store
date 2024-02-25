import { Icon } from "@mui/material";
import { GetBrandList, PostImage, PostProduct } from "services/ApiService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { PostAuction } from "services/ApiService";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [auction, setAuction] = useState([]);

  const [check, setCheck] = useState(true);
  const formData = new FormData();
  const [brand, setBrand] = useState([]);
  const [errors, setErrors] = useState({});
  const [minDate, setMinDate] = useState("");
  const [myFile, setMyFile] = useState("");

  // Validate data
  const validateForm = (dataInput, dataAution, checked) => {
    let errors = {};
    if (!dataInput.productId) {
      errors.productId = "Please enter your Product Id";
    } else if (dataInput.productId.length > 30) {
      errors.productId = "Product Id must be between 1 - 30 characters";
    }
    if (!dataInput.produc_name) {
      errors.produc_name = "Please enter your Product Name";
    } else if (dataInput.produc_name.length < 3 || dataInput.produc_name.length > 30) {
      errors.produc_name = "Product Name must be between 3 - 30 characters";
    }
    if (!dataInput.status) {
      errors.status = "Please enter your status";
    }
    if (!dataInput.isWaterproof) {
      errors.isWaterproof = "Please enter your isWaterproof";
    }
    if (!dataInput.diameter) {
      errors.diameter = "Please enter your diameter";
    } else if (dataInput.produc_name < 0 || dataInput.produc_name.length > 100) {
      errors.produc_name = "diameter must be between 0 - 100 mm";
    }

    if (!dataInput.gender) {
      errors.gender = "Please enter your gender";
    }

    if (!dataInput.categoryId) {
      errors.categoryId = "Please enter your categoryId";
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

  const handleBack = () => {
    navigate("/admin/products");
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newErrors = validateForm(product, auction, check);
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        Swal.fire({
          icon: "error",
          title: "Please Enter Information",
        });
        return;
      } else {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Create it!",
        });
        if (result.isConfirmed) {
          let data = {
            ...product,
            status: product.status == "true" ? true : false,
            type: check ? 1 : 2,
            isWaterproof:
              product.isWaterproof === "true" || product.isWaterproof === true ? true : false,
            totalBuy: product.totalBuy == null ? 0 : Number(product.totalBuy),
          };

          const response = await PostProduct(data);
          console.log("response data product", response);

          if (response.data.status === 201) {
            if (myFile.length > 0) {
              for (var i = 0; i < myFile.length; i++) {
                formData.append("files", myFile[i]);
              }
            }
            // Check if new files are selected
            console.log("formData.get()", formData.get("files"));
            if (formData.get("files")) {
              const imageResponse = await PostImage(response.data.data.productId, formData);
              if (imageResponse.status === 201) {
                if (check === false) {
                  let dataAutions = {
                    ...auction,
                    status: true,
                    name: product.produc_name,
                    lastBidPrice: product.price,
                    productId: product.productId,
                  };
                  const auctionRespone = await PostAuction(dataAutions);
                  if (auctionRespone.status === 201) {
                    Swal.fire("Created!", "Your Product has been Created.", "success");
                    navigate("/admin/products");
                  } else {
                    Swal.fire({
                      title: "Create faild",
                      text: "Please try later",
                      icon: "error",
                    });
                  }
                } else {
                  Swal.fire("Created!", "Your Product has been Created.", "success");
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

                const auctionRespone = await PostAuction(dataAutions);
                if (auctionRespone.status === 201) {
                  Swal.fire("Created!", "Your Product has been Created.", "success");
                  navigate("/admin/products");
                } else {
                  Swal.fire({
                    title: "Create faild",
                    text: "Please try late",
                    icon: "error",
                  });
                }
              } else {
                Swal.fire("Created!", "Your Product has been Created.", "success");
                navigate("/admin/products");
              }
            }
          }
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Create faild",
        text: error.response.data.message,
        icon: "error",
      });
    }
  };

  useEffect(() => {
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
  }, [check]);

  return (
    <div className="container space-sideBar mt-5 pt-5 font-weight-bold text-uppercase">
      <h2 className="text-center">Create new product</h2>
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
            onChange={handleChangeInput}
          />
          <span
            className="text-danger h6"
            hidden={errors.productId != null || errors.productId != "" ? false : true}
          >
            {errors.productId}
          </span>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="produc_name" className="form-label w-100">
            Product Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="produc_name"
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
            <option value=""> --- Select status --- </option>

            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          <span
            className="text-danger h6"
            hidden={errors.status != null || errors.status != "" ? false : true}
          >
            {errors.status}
          </span>
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
              <option value=""> --- Select Waterproof --- </option>

              <option value="true">True</option>
              <option value="false">False</option>
            </select>
            <span
              className="text-danger h6"
              hidden={errors.isWaterproof != null || errors.isWaterproof != "" ? false : true}
            >
              {errors.isWaterproof}
            </span>
          </div>
          <div className="mb-3 mt-3 col-md-4">
            <label htmlFor="diameter" className="form-label w-100">
              Diameter:
            </label>
            <input
              type="number"
              className="form-control"
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
              <option value=""> --- Select Gender --- </option>
              <option value="Men">Men</option>
              <option value="Woman">Woman</option>
            </select>
            <span
              className="text-danger h6"
              hidden={errors.gender != null || errors.gender != "" ? false : true}
            >
              {errors.gender}
            </span>
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
            <option value=""> --- Select watch brand --- </option>
            {brand.length > 0 ? (
              brand.map((item, index) => {
                return (
                  <option key={index} value={item.categoryId}>
                    {item.category_name}
                  </option>
                );
              })
            ) : (
              <option value="">No information displayed</option>
            )}
          </select>
          <span
            className="text-danger h6"
            hidden={errors.categoryId != null || errors.categoryId != "" ? false : true}
          >
            {errors.categoryId}
          </span>
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
            id="description"
            name="description"
            onChange={handleChangeInput}
          />
        </div>
        <span
          className="text-danger h6"
          hidden={errors.description != null || errors.description != "" ? false : true}
        >
          {errors.description}
        </span>

        <div className="mb-3 mt-3">
          <label htmlFor="photoimg" style={{ marginTop: "10px" }} className="form-label w-100">
            Photo:
          </label>
          <input
            type="file"
            className="form-control height-20"
            id="photoimg"
            onChange={handleFileChange}
            multiple
          />
        </div>

        <div className="form-check ml-2 mt-5 text-danger">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            onChange={() => {
              setCheck(!check);
            }}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault ">
            Auction product
          </label>
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
            />
            <span
              className="text-danger h6"
              hidden={errors.endTime != null || errors.endTime != "" ? false : true}
            >
              {errors.endTime}
            </span>
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
              <Icon>add</Icon> <span> &nbsp;Create</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
