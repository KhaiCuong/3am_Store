import "../../css/style.css";
import "../../css/dataTables.bootstrap5.min.css";
import "../../AdminManager.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { GetAllOrders } from "services/ApiService";
import moment from "moment";
import SortBar from "./sections/SortBar";
import { GetPaymentList } from "services/ApiService";
import Swal from "sweetalert2";
import { PutOrderStatus } from "services/ApiService";
import { PutPaymenttatus } from "services/ApiService";

export default function OrderManager() {
  // Brand
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(false);
  let [reset, setReset] = useState(true);
  const [payment, setPayment] = useState([]);
  const [paymentFailed, setPaymentFailed] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  // Pagination
  const [page, setPage] = useState(1); // current page
  const [totalPage, setTotalPage] = useState(1); // current page
  const count = (page - 1) * 12;

  // handle when user switch to order page
  const handlePageClick = (event) => {
    setPage(+event.selected + 1);
  };

  const sortByStatus = (status) => {
    setSelectedStatus(status);
  };

  useEffect(() => {
    const fetchDataBrand = async () => {
      try {
        const response = await GetAllOrders();
        if (response.status === 200) {
          console.log("response.data.jj", response.data);
          let filteredData = response.data;

          if (selectedStatus !== "") {
            filteredData = response.data.filter((item) => item.status === selectedStatus);
          }
          // Set total page
          setTotalPage(Math.ceil(filteredData.length / 12).toFixed());
          // Set total Brand
          setTotal(filteredData.length);
          let listBrand = [];
          // only display 12 Brands per page
          for (var i = 0 + count; i < 12 + count; i++) {
            if (filteredData[i] != null) {
              listBrand[i] = filteredData[i];
            } else {
              break;
            }
          }
          setData(listBrand);

          const paymentRespone = await GetPaymentList();
          if (paymentRespone.status === 200) {
            let ListOrderPayment = [];
            let ListOrderPaymentFailed = [];

            paymentRespone.data.forEach((pm) => {
              if (pm.status === true) {
                ListOrderPayment.push(pm.orderId);
              } else {
                ListOrderPaymentFailed.push(pm.orderId);
              }
            });
            setPayment(ListOrderPayment);
            setPaymentFailed(ListOrderPaymentFailed);
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchDataBrand();
  }, [page, selectedStatus, reset]);

  function getStatusColor(status) {
    switch (status) {
      case "Preparing":
        return "orange"; // Màu cam
      case "Completed":
        return "green"; // Màu xanh lá
      case "Delivery":
        return "blue"; // Màu xanh biển
      case "Canceled":
        return "red"; // Màu đỏ
      default:
        return "black"; // Màu mặc định
    }
  }

  const handleChangeStatus = async (orderID, status) => {
    /* inputOptions can be an object or Promise */
    const inputOptions = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          Preparing: "Preparing",
          Completed: "Completed",
          Delivery: "Delivery",
          Canceled: "Canceled",
        });
      }, 1000);
    });
    const { value: newStatus } = await Swal.fire({
      title: "Select Status",
      inputValue: status,
      width: 900,
      input: "radio",
      inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return "You need to choose something!";
        }
      },
    });
    if (newStatus) {
      try {
        const response = await PutOrderStatus(orderID, newStatus);
        if (response.status === 200) {
          Swal.fire({
            title: "Completed",
            text: "successfully!",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "ok",
          }).then((result) => {
            if (result.isConfirmed) {
              setReset(!reset);
            }
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Faild",
          text: "An error occurred, please try again later.",
          icon: "error",
        });
      }
    }
  };

  const handleChangeStatusPayment = async (id, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your changes may affect the payment history of the order.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await PutPaymenttatus(id, status);
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

  return (
    <main className="mt-5 pt-3 mb-5">
      <div className="container pt-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="text-secondary small"> Total : {total} Orders</div>

          <h2 className="text-center font-weight-bold">ORDER TABLE</h2>

          {/* <Link to="create" className="btn btn-danger rounded d-flex align-items-center">
            <Icon>add</Icon> <span> &nbsp;Create New Brand</span>
          </Link> */}
          <SortBar className="p-0" onSortByStatus={(status) => sortByStatus(status)} />
        </div>

        <div style={{ minHeight: "700px" }}>
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th>No</th>
                <th>User Order Name</th>
                <th>Order Date</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      style={{ backgroundColor: item.status === false ? "silver" : "white" }}
                    >
                      <td>{index + 1}</td>
                      <td style={{ width: "230px" }}>{item.username}</td>
                      <td>{moment(item.createAt).format("DD/MM/YYYY")}</td>
                      <td>${item.totalPrice}</td>
                      <td>
                        <div
                          className="font-weight-bold text-center"
                          style={{ color: getStatusColor(item.status) }}
                        >
                          {item.status}
                        </div>
                        <div
                          className="font-weight-bold bg-info text-center rounded text-white cursor-pointer"
                          onClick={() => {
                            handleChangeStatusPayment(item.orderId, false);
                          }}
                          hidden={!payment.includes(item.orderId)}
                        >
                          Paid
                        </div>
                        <div
                          className="font-weight-bold bg-danger text-center rounded text-white cursor-pointer"
                          onClick={() => {
                            handleChangeStatusPayment(item.orderId, true);
                          }}
                          hidden={!paymentFailed.includes(item.orderId)}
                        >
                          Not Pay
                        </div>
                      </td>
                      <td>
                        <Link to={"update/" + item.orderId} className="btn btn-primary">
                          Update
                        </Link>
                        <btn
                          className="btn btn-success ml-2"
                          onClick={() => {
                            handleChangeStatus(item.orderId, item.status);
                          }}
                        >
                          Change Status
                        </btn>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <div>No Brand to show</div>
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
