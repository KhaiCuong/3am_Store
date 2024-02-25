import { Icon } from "@mui/material";
import { PostBrand } from "services/ApiService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CreateBrand() {
  const navigate = useNavigate();
  const [brand, setBrand] = useState([]);
  const [errors, setErrors] = useState({});
  // Validate data
  const validateForm = (dataInput) => {
    let errors = {};
    if (!dataInput.categoryId) {
      errors.categoryId = "Please enter your category Id";
    } else if (dataInput.categoryId.length > 30) {
      errors.categoryId = "category Id must be between 1 - 30 characters";
    }

    if (!dataInput.category_name) {
      errors.category_name = "Please enter your Brand Name";
    } else if (dataInput.category_name.length < 3 || dataInput.category_name.length > 30) {
      errors.category_name = "Brand Name must be between 3 - 30 characters";
    }
    if (!dataInput.status) {
      errors.status = "Please enter your status";
    }

    if (!dataInput.description) {
      errors.description = "Please enter your description";
    } else if (dataInput.description.length < 3 || dataInput.description.length > 300) {
      errors.description = "Product Name must be between 3 - 300 characters";
    }
    return errors;
  };

  const handleBack = () => {
    navigate("/admin/brands");
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setBrand({
      ...brand,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm(brand);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Swal.fire({
        icon: "error",
        title: "Please Enter Information",
      });
      return;
    } else {
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
        Swal.fire({
          title: "Create faild",
          text: error.response.data.message,
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="container space-sideBar mt-5 pt-5 font-weight-bold text-uppercase">
      <h2 className="text-center">Create new Brand</h2>
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
            onChange={handleChangeInput}
          />
          <span
            className="text-danger h6"
            hidden={errors.categoryId != null || errors.categoryId != "" ? false : true}
          >
            {errors.categoryId}
          </span>
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
          <span
            className="text-danger h6"
            hidden={errors.category_name != null || errors.category_name != "" ? false : true}
          >
            {errors.category_name}
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
          <span
            className="text-danger h6"
            hidden={errors.description != null || errors.description != "" ? false : true}
          >
            {errors.description}
          </span>
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
