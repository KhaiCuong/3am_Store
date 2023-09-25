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
} from "../../service/ApiService";
import Swal from "sweetalert2";
import { Icon } from "@mui/material";

export default function UpdateProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [brand, setBrand] = useState([]);

  let [images, setImages] = useState([]);
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
  };

  //upload Image
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      for (var i = 0; i < e.target.files.length; i++) {
        formData.append("files", e.target.files[i]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
            status: product.status === "true" ? true : false,
          };
          const response = await PutProduct(id, data);
          console.log("response", response);

          if (response.status === 200) {
            // Check if new files are selected
            if (formData.get("files")) {
              const imageResponse = await PostNewImage(id, formData);

              if (imageResponse.status === 200) {
                Swal.fire("Updated!", "Your Product has been updated.", "success");
                // handle success or navigate to another page
                navigate("/admin/products");
              }
            } else {
              Swal.fire("Updated!", "Your Product has been updated.", "success");
              // handle success or navigate to another page
              navigate("/admin/products");
            }
          }
        } catch (error) {
          console.log("err", error);
        }
      }
    });
  };

  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const response = await GetProductByID(id);
        if (response.status === 200) {
          setProduct(response.data);
          const imageResponse = await GetProductImageByID(response.data.product_id);
          if (imageResponse.status === 200) {
            setImages(imageResponse.data);
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

    fetchBrand();
    fetchDataProduct();
  }, []);

  return (
    <div className="container space-sideBar mt-5 pt-5 font-weight-bold text-uppercase">
      <h2 className="text-center">Update product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="product_id" className="form-label w-100">
            Product Id:
          </label>
          <input
            type="text"
            className="form-control"
            id="product_id"
            name="product_id"
            value={product.product_id}
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
              false
            </option>
          </select>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="category_id" className="form-label w-100">
            Brand:
          </label>
          <select
            id="category_id"
            className="form-control"
            name="category_id"
            onChange={handleChangeInput}
          >
            {brand.length > 0 ? (
              brand.map((item, index) => {
                return (
                  <option
                    key={index}
                    value={item.category_id}
                    selected={item.category_id === product.category_id}
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
          <div className="mb-3 mt-3 col-md-6">
            <label htmlFor="instock" className="form-label w-100">
              Instock:
            </label>
            <input
              type="number"
              className="form-control"
              id="instock"
              value={product.instock}
              name="instock"
              style={{ width: "60%" }}
              onChange={handleChangeInput}
            />
          </div>
          <div className="mb-3 mt-3 col-md-6">
            <label htmlFor="price" className="form-label w-100">
              Price:
            </label>
            <input
              type="number"
              className="form-control"
              value={product.price}
              id="price"
              name="price"
              style={{ width: "60%" }}
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
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="photoimg" className="form-label w-100">
            Old Photo
          </label>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {images.map((item, index) => (
              <div key={index} style={{ width: "200px", height: "200px", margin: "5px" }}>
                <img
                  src={`http://localhost:5051/${item}`}
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
