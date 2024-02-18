import "../../css/style.css";
import "../../css/dataTables.bootstrap5.min.css";
import "../../AdminManager.css";
import { GetBrandList } from "services/ApiService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@mui/material";
import ReactPaginate from "react-paginate";

export default function BrandManager() {
  // Brand
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(false);

  // Pagination
  const [page, setPage] = useState(1); // current page
  const [totalPage, setTotalPage] = useState(1); // current page
  const count = (page - 1) * 12;

  // handle when user switch to order page
  const handlePageClick = (event) => {
    setPage(+event.selected + 1);
  };

  useEffect(() => {
    const fetchDataBrand = async () => {
      try {
        const response = await GetBrandList();
        if (response.status === 200) {
          // Set total page
          setTotalPage((response.data.length / 12).toFixed());
          // Set total Brand
          setTotal(response.data.length);
          let listBrand = [];
          // only display 12 Brands per page
          for (var i = 0 + count; i < 12 + count; i++) {
            if (response.data[i] != null) {
              listBrand[i] = response.data[i];
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
  }, [page]);
  console.log("totalPage", totalPage);

  return (
    <main className="mt-5 pt-3 mb-5">
      <div className="container pt-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="text-secondary small"> Total : {total} Brand</div>
          <h2 className="text-center font-weight-bold">BRAND TABLE</h2>

          <Link to="create" className="btn btn-danger rounded d-flex align-items-center">
            <Icon>add</Icon> <span> &nbsp;Create New Brand</span>
          </Link>
        </div>

        <table className="table">
          <thead className="table-dark">
            <tr>
              <th>No</th>
              <th>Brand Name</th>
              <th>Description</th>
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
                    <td style={{ width: "230px" }}>{item.category_name}</td>
                    <td>
                      {item.description.length > 100
                        ? `${item.description.substring(0, 100)}...`
                        : item.description}
                    </td>
                    <td>
                      <Link to={"update/" + item.categoryId} className="btn btn-primary">
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
