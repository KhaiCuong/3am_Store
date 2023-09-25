import { Icon } from "@mui/material";
import { PostBrand } from "pages/AdminPages/service/ApiService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CreateBrand() {
  const navigate = useNavigate();
  const [brand, setBrand] = useState([]);

  const handleBack = () => {
    navigate("/admin/brands");
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setBrand({
      ...brand,
      [name]: value,
    });
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
          ...brand,
          status: brand.status === "true" ? true : false,
        };

        const response = await PostBrand(data);
        console.log("response", response);

        if (response.status === 201) {
          Swal.fire("Created!", "Your Brand has been Created.", "success");
          // handle success or navigate to another page
          navigate("/admin/brands");
        }
      }
    } catch (error) {
      console.error("err", error);
      // Handle the error, show a message, or perform other actions as needed
    }
  };

  return (
    <div className="container space-sideBar mt-5 pt-5 font-weight-bold text-uppercase">
      <h2 className="text-center">Create new Brand</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="category_id" className="form-label w-100">
            Brand Id:
          </label>
          <input
            type="text"
            className="form-control"
            id="category_id"
            name="category_id"
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="category_name" className="form-label w-100">
            Brand Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="category_name"
            name="category_name"
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
