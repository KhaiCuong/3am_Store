import "../../css/style.css";
import "../../css/dataTables.bootstrap5.min.css";
import "../../AdminManager.css";
import { GetUserList, PutUserStatus } from "services/ApiService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@mui/material";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

export default function AccountManager() {
  // Account
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(false);

  // rerender view when deleted
  const [reset, setReset] = useState(false);

  // Pagination
  const [page, setPage] = useState(1); // current page
  const [totalPage, setTotalPage] = useState(1); // current page
  const count = (page - 1) * 12;

  // handle when user switch to order page
  const handlePageClick = (event) => {
    setPage(+event.selected + 1);
  };

  const handleChangeStatus = async (id, verify) => {
    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "You won't be able to revert this!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes, delete it!",
    // }).then(async (result) => {
    //   if (result.isConfirmed) {
    //     try {
    //       const response = await DeleteUserByID(id);
    //       if (response.status === 200) {
    //         Swal.fire("Deleted!", "Your file has been deleted.", "success");
    //         setReset(!reset);
    //       }

    // Swal.fire({
    //   position: "top-end",
    //   icon: "success",
    //   title: "Your work has been saved",
    //   showConfirmButton: false,
    //   timer: 1500
    // });
    //     } catch (error) {
    //       console.log("err", error);
    //     }
    //   }
    // });
    Swal.fire({
      title: "Are you sure?",
      text: "Your changes may affect user account access",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await PutUserStatus(id, !verify);
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
            setReset(!reset);
          }
        } catch (error) {
          console.log("err", error);
        }
      }
    });
  };

  useEffect(() => {
    const fetchDataAccount = async () => {
      try {
        const response = await GetUserList();
        if (response.status === 200) {
          // Set total page
          setTotalPage(Math.ceil(response.data.length / 12).toFixed());
          // Set total Account
          setTotal(response.data.length);
          let listAccount = [];
          // only display 12 Account per page
          for (var i = 0 + count; i < 12 + count; i++) {
            if (response.data[i] != null) {
              listAccount[i] = response.data[i];
            } else {
              break;
            }
          }
          setData(listAccount);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchDataAccount();
  }, [page, reset]);
  return (
    <main className="mt-5 pt-3 mb-5">
      <div className="container pt-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="text-secondary small"> Total : {total} Users</div>
          <h2 className="text-center font-weight-bold">ACCOUNT TABLE</h2>

          <Link to="create" className="btn btn-danger rounded d-flex align-items-center">
            <Icon>add</Icon> <span> &nbsp;Create New Account</span>
          </Link>
        </div>
        <div style={{ minHeight: "700px" }}>
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th>No</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      style={{ backgroundColor: item.verify === false ? "silver" : "white" }}
                    >
                      <td>{index + 1}</td>
                      <td>{item.fullname}</td>
                      <td>{item.email}</td>
                      <td>{item.phone_number}</td>
                      <td>{item.address}</td>
                      <td>{item.role}</td>
                      <td>
                        {/* <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleDelete(item.userId);
                        }}
                      >
                        Delete
                      </button> */}

                        <label className="switch ml-4">
                          <input
                            type="checkbox"
                            onChange={() => {
                              handleChangeStatus(item.userId, item.verify);
                            }}
                            checked={item.verify}
                          />
                          <span className="slider round "></span>
                        </label>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <div>No Account to show</div>
              )}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-center mb-5">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPage}
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
          />
        </div>
      </div>
    </main>
  );
}
