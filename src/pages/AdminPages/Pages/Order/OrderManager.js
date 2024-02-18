import "../../css/style.css";
import "../../css/dataTables.bootstrap5.min.css";
import "../../AdminManager.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@mui/material";
import ReactPaginate from "react-paginate";
import { GetAllOrders } from "services/ApiService";
import moment from "moment";
import SortBar from "./sections/SortBar";

export default function OrderManager() {
  // Brand
  const [data, setData] = useState([]);

  const [total, setTotal] = useState(false);

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

          console.log("response.data", filteredData);

          // Set total page
          setTotalPage((filteredData.length / 12).toFixed());
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
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchDataBrand();
  }, [page, selectedStatus]);

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

  return (
    <main className="mt-5 pt-3 mb-5">
      <div className="container pt-4">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <div className="text-secondary small"> Total : {total} Brand</div>

            <SortBar className="p-0" onSortByStatus={(status) => sortByStatus(status)} />
          </div>
          <h2 className="text-center font-weight-bold">ORDER TABLE</h2>

          <Link to="create" className="btn btn-danger rounded d-flex align-items-center">
            <Icon>add</Icon> <span> &nbsp;Create New Brand</span>
          </Link>
        </div>

        <table className="table">
          <thead className="table-dark">
            <tr>
              <th>No</th>
              <th>User Order Name</th>
              <th>Order Date</th>
              <th>Quantity</th>
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
                    <td>{item.quantity}</td>
                    <td>${item.totalPrice}</td>
                    <td style={{ color: getStatusColor(item.status) }}>
                      <b>{item.status}</b>
                    </td>
                    <td>
                      <Link to={"update/" + item.orderId} className="btn btn-primary">
                        Update
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <div>No Brand to show</div>
            )}
          </tbody>
        </table>
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
