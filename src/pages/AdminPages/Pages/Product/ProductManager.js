import "../../css/style.css";
import "../../css/dataTables.bootstrap5.min.css";
import "../../AdminManager.css";
import { GetProductList, PutProductStatus } from "services/ApiService";
import { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";
import { Icon } from "@mui/material";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

export default function ProductManager() {
  // Product
  const [data, setData] = useState([]);
  const [statusProduct, setStatusProduct] = useState(false);
  const [total, setTotal] = useState(false);

  // Pagination
  const [page, setPage] = useState(1); // current page
  const [totalPage, setTotalPage] = useState(1); // current page
  const count = (page - 1) * 12;

  // handle when user change product status
  const handleChangeStatus = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "The changes you make may affect the display of products.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await PutProductStatus(id);
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
            setStatusProduct(!statusProduct);
          }
        } catch (error) {
          console.log("err", error);
        }
      }
    });
  };

  // handle when user switch to order page
  const handlePageClick = (event) => {
    setPage(+event.selected + 1);
  };

  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const response = await GetProductList();
        if (response.status === 200) {
          // Set total page
          setTotalPage(Math.ceil(response.data.length / 12).toFixed());
          console.log("totalPage", totalPage);
          // Set total Product
          setTotal(response.data.length);
          let listProduct = [];
          // only display 12 products per page
          for (var i = 0 + count; i < 12 + count; i++) {
            if (response.data[i] != null) {
              listProduct[i] = response.data[i];
            } else {
              break;
            }
          }
          setData(listProduct);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchDataProduct();
  }, [statusProduct, page]);

  return (
    <main className="mt-5 pt-3 mb-5">
      <div className="container pt-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="text-secondary small"> Total : {total} Products</div>
          <h2 className="text-center font-weight-bold">PRODUCT TABLE</h2>

          <Link to="create" className="btn btn-danger rounded d-flex align-items-center">
            <Icon>add</Icon> <span> &nbsp;Create New Product</span>
          </Link>
        </div>
        <div style={{ minHeight: "900px" }}>
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th>No</th>
                <th>Product Name</th>
                <th>Instock</th>
                <th>Price</th>
                <th>Show/Hidden</th>
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
                      <td>
                        {item.produc_name}{" "}
                        <b className="text-danger" hidden={item.type == 2 ? false : true}>
                          {" "}
                          Auction
                        </b>
                      </td>
                      <td>{item.instock}</td>
                      <td>
                        <CurrencyFormat
                          value={item.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"đ"}
                        />
                      </td>
                      <td>
                        <label className="switch ml-4">
                          <input
                            type="checkbox"
                            onChange={() => {
                              handleChangeStatus(item.productId);
                            }}
                            checked={item.status}
                          />
                          <span className="slider round "></span>
                        </label>
                      </td>
                      <td>
                        <Link to={"update/" + item.productId} className="btn btn-primary">
                          Update
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <div>No product to show</div>
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
