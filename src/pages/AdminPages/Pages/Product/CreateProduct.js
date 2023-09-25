import { Icon } from "@mui/material";
import { GetBrandList } from "pages/AdminPages/service/ApiService";
import { PostImage } from "pages/AdminPages/service/ApiService";
import { PostProduct } from "pages/AdminPages/service/ApiService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const formData = new FormData();
  const [brand, setBrand] = useState([]);

  const handleBack = () => {
    navigate("/admin/products");
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
          status: product.status === "true" ? true : false,
        };

        const response = await PostProduct(data);
        console.log("response", response);

        if (response.status === 200) {
          // Check if new files are selected
          if (formData.get("files")) {
            const imageResponse = await PostImage(response.data.product_id, formData);
            if (imageResponse.status === 200) {
              Swal.fire("Created!", "Your Product has been Created.", "success");
              // handle success or navigate to another page
              navigate("/admin/products");
            }
          } else {
            Swal.fire("Created!", "Your Product has been Created.", "success");
            // handle success or navigate to another page
            navigate("/admin/products");
          }
        }
      }
    } catch (error) {
      console.error("err", error);
      // Handle the error, show a message, or perform other actions as needed
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

    fetchBrand();
  }, []);

  return (
    <div className="container space-sideBar mt-5 pt-5 font-weight-bold text-uppercase">
      <h2 className="text-center">Create new product</h2>
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
            onChange={handleChangeInput}
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
            name="produc_name"
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="status" className="form-label w-100">
            Status:
          </label>
          <select id="status" className="form-control" name="status" onChange={handleChangeInput}>
            <option value="true" selected>
              True
            </option>
            <option value="false">False</option>
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
            <option value=""> --- Select watch brand --- </option>
            {brand.length > 0 ? (
              brand.map((item, index) => {
                return (
                  <option key={index} value={item.category_id}>
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
            id="description"
            name="description"
            onChange={handleChangeInput}
          />
        </div>
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
