import { Icon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { PutUserInfor } from "services/ApiService";
import "../css/style.css";

export default function AdminHeader() {
  const navigate = useNavigate();

  // get usertoken
  const usertoken = JSON.parse(localStorage.getItem("userToken"));
  // handle when user logout
  function handleLogout() {
    if (usertoken != null) {
      localStorage.removeItem("token");
      localStorage.removeItem("userToken");
    }
    navigate("home");
  }

  const handleChangePassword = (e) => {
    e.preventDefault();
    const UpdatePassword = async () => {
      try {
        // Get New Password
        const { value: formValues } = await Swal.fire({
          title: "Reset Password",
          html:
            '<input id="swal-input1" class="swal2-input" placeholder=""Enter New Password"">' +
            '<input id="swal-input2" class="swal2-input" placeholder="Re-enter New Password">',
          focusConfirm: false,
          preConfirm: () => {
            return [
              document.getElementById("swal-input1").value,
              document.getElementById("swal-input2").value,
            ];
          },
        });

        // check "Enter New Password" and "Re-enter New Password" are they similar?
        if (!formValues || formValues[0] !== formValues[1]) {
          // if they are not the same
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Passwords do not match.",
          });
        } else {
          // if they are the same
          Swal.fire({
            title: "Are you sure?",
            text: "You want to submit it!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!",
          }).then(async (result) => {
            if (result.isConfirmed) {
              if (formValues[0].length >= 6) {
                // if new password valid
                let newdata = {
                  userId: 1,
                  fullname: "Admin",
                  phone_number: "0946643252",
                  address: "Thu Duc",
                  role: "Admin",
                  email: "admin@gmail.com",
                  password: formValues[0],
                };
                const response = await PutUserInfor(usertoken.userId, newdata);
                if (response.status === 200) {
                  Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Reset Password successfully !",
                  });
                }
              } else {
                // if new password less than 6 character
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Password must be at least 6 characters long.",
                });
              }
            }
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while updating the password.",
        });
      }
    };
    UpdatePassword();
  };

  console.log(navigate);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top height-40 ">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebar"
            aria-controls="offcanvasExample"
          >
            <span className="navbar-toggler-icon" data-bs-target="#sidebar"></span>
          </button>
          <a className="navbar-brand me-auto ms-lg-0 ms-3 text-uppercase fw-bold p-0" href="#">
            3AM Store
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#topNavBar"
            aria-controls="topNavBar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="topNavBar">
            <form className="d-flex ms-auto my-3 my-lg-0 align-items-center">
              <div className="input-group">
                <input
                  className="form-control height-30"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-primary mb-0 height-30 " type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
            <ul className="navbar-nav ml-2">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle ms-2"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-fill"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li className="cursor-pointer">
                    <p className="dropdown-item mb-0" onClick={handleChangePassword}>
                      Reset Password &ensp;&ensp;<Icon className="h-100">lock_reset</Icon>
                    </p>
                  </li>
                  <li className="cursor-pointer">
                    <p className="dropdown-item mb-0" onClick={handleLogout}>
                      Sign out &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                      <Icon className="h-100">logout</Icon>
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
