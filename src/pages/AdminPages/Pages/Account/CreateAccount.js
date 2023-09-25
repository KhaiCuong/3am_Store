import { Icon } from "@mui/material";
import { GetUserList } from "pages/AdminPages/service/ApiService";
import { PostUser } from "pages/AdminPages/service/ApiService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [acc, setAcc] = useState([]);
  const [listAcc, setListAcc] = useState([]);

  const handleBack = () => {
    navigate("/admin/accounts");
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setAcc({
      ...acc,
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
        if (Object.values(listAcc).includes(acc.email)) {
          Swal.fire("Error!", "Email already used!.", "error");
        } else {
          const response = await PostUser(acc);
          console.log("response", response);
          if (response.status === 200) {
            Swal.fire("Created!", "Your Account has been Created.", "success");
            // handle success or navigate to another page
            navigate("/admin/accounts");
          }
        }
      }
    } catch (error) {
      console.error("err", error);
      // Handle the error, show a message, or perform other actions as needed
    }
  };

  useEffect(() => {
    const fetchAccountList = async () => {
      try {
        const response = await GetUserList();
        if (response.status === 200) {
          // get list account
          let arr = [];
          for (let i = 0; i < response.data.length; i++) {
            arr[i] = response.data[i].email;
          }
          setListAcc(arr);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchAccountList();
  }, []);

  return (
    <div className="container space-sideBar mt-5 pt-5 font-weight-bold text-uppercase">
      <h2 className="text-center">Create new Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="fullname" className="form-label w-100">
            Fullname:
          </label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            name="fullname"
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label w-100">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="password" className="form-label w-100">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="role" className="form-label w-100">
            Role:
          </label>
          <select id="role" className="form-control" name="role" onChange={handleChangeInput}>
            <option value=""> --- Select role for account --- </option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="phone_number" className="form-label w-100">
            Phone Number:
          </label>
          <input
            type="number"
            className="form-control"
            id="phone_number"
            name="phone_number"
            style={{ width: "100%" }}
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="address" className="form-label w-100">
            Address:
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
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
