import "../../css/style.css";
import "../../css/dataTables.bootstrap5.min.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetBrandByID, PutBrand } from "services/ApiService";
import Swal from "sweetalert2";
import { Icon } from "@mui/material";

export default function UpdateBrand() {
  const navigate = useNavigate();
  const [brand, setBrand] = useState([]);

  const handleBack = () => {
    navigate("/admin/brands");
  };
  const { id } = useParams();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setBrand({
      ...brand,
      [name]: value,
    });
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
            ...brand,
            status: brand.status === "true" ? true : false,
          };
          const response = await PutBrand(id, data);
          if (response.status === 200) {
            Swal.fire("Updated!", "Your Brand has been updated.", "success");
            // handle success or navigate to another page
            navigate("/admin/brands");
          }
        } catch (error) {
          console.log("err", error);
        }
      }
    });
  };

  useEffect(() => {
    const fetchDataBrand = async () => {
      try {
        const response = await GetBrandByID(id);
        if (response.status === 200) {
          setBrand(response.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchDataBrand();
  }, []);

  return (
    <div className="container space-sideBar mt-5 pt-5 font-weight-bold text-uppercase">
      <h2 className="text-center">Update Brand</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="categoryId" className="form-label w-100">
            Brand Id:
          </label>
          <input
            type="text"
            className="form-control"
            id="categoryId"
            name="categoryId"
            value={brand.categoryId}
            onChange={handleChangeInput}
            disabled
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
            value={brand.category_name}
            name="category_name"
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="status" className="form-label w-100">
            Status:
          </label>
          <select id="status" className="form-control" name="status" onChange={handleChangeInput}>
            <option value="true" selected={brand.status}>
              True
            </option>
            <option value="false" selected={!brand.status}>
              false
            </option>
          </select>
        </div>

        <div className="mb-3 mt-3">
          <label htmlFor="description" className="form-label w-100">
            Description:
          </label>
          <textarea
            rows="3"
            className="form-control"
            value={brand.description}
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
              <Icon>data_saver_on</Icon> <span> &nbsp;Update</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
