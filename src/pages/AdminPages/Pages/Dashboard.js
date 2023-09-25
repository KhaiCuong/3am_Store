import "../css/style.css";
import "../css/dataTables.bootstrap5.min.css";
import ChartQuantityProduct from "../Chart/ChartQuantityProduct";
import ChartProductOrder from "../Chart/ChartProductOrder";
import { useEffect, useState } from "react";
import { GetBrandList, GetOrderDetailList, GetProductList } from "../service/ApiService";
import { Icon } from "@mui/material";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [brand, setBrand] = useState(false);
  const [product, setProduct] = useState(false);
  const [detailList, setDetailList] = useState([]);

  useEffect(() => {
    const fetchTransportData = async () => {
      try {
        const detail = await GetOrderDetailList();
        if (detail.status === 200) {
          setDetailList(detail.data);
          let total = 0;
          for (let i = 0; i < detail.data.length; i++) {
            total = total + detail.data[i].quantity * detail.data[i].price;
          }
          setTotalRevenue(total);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchDataBrand = async () => {
      try {
        const response = await GetBrandList();
        if (response.status === 200) {
          setBrand(response.data.length);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchDataProduct = async () => {
      try {
        const response = await GetProductList();
        if (response.status === 200) {
          setProduct(response.data.length);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchDataBrand();
    fetchTransportData();
    fetchDataProduct();
  }, []);

  return (
    <>
      <main className="mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h4>Dashboard</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-3" style={{ height: "180px" }}>
              <div className="card bg-primary text-white h-100 my-card-style">
                <div className="card-body">
                  <div className="font-weight-bold">
                    TOTAL REVENUE &nbsp;<Icon>monetization_on</Icon>
                  </div>
                  <div className="mt-1"> {totalRevenue} VND</div>
                </div>

                <div className="card-footer d-flex">
                  <Link to="/admin/products" className="text-white">
                    View Details
                  </Link>
                  <span className="ms-auto">
                    <i className="bi bi-chevron-right"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3" style={{ height: "180px" }}>
              <div className="card p-0 bg-warning text-white h-100 my-card-style">
                <div className="card-body ">
                  <div className="font-weight-bold">
                    NUMBER OF BRAND &nbsp;<Icon>account_balance</Icon>
                  </div>
                  <div className="mt-1"> {brand} Brands</div>
                </div>
                <div className="card-footer d-flex">
                  <Link to="/admin/brands" className="text-white">
                    View Details
                  </Link>
                  <span className="ms-auto">
                    <i className="bi bi-chevron-right"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3" style={{ height: "180px" }}>
              <div className="card p-0 bg-success text-white h-100 my-card-style">
                <div className="card-body ">
                  <div className="font-weight-bold">
                    NUMBER OF PRODUCT &nbsp;<Icon>access_time</Icon>
                  </div>
                  <div className="mt-1"> {product} Products</div>
                </div>
                <div className="card-footer d-flex">
                  <Link to="/admin/products" className="text-white">
                    View Details
                  </Link>
                  <span className="ms-auto">
                    <i className="bi bi-chevron-right"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="row" id="chart-js">
            <div className="col-md-4 mb-3">
              <div className="card p-0 h-100">
                <div className="card-header">
                  <span className="me-2">
                    <i className="bi bi-bar-chart-fill"></i>
                  </span>
                  Quantity Product
                </div>
                <div className="card-body" style={{ width: "100%", height: "100%" }}>
                  <ChartQuantityProduct></ChartQuantityProduct>
                </div>
              </div>
            </div>
            <div className="col-md-8 mb-3">
              <div className="card p-0 h-100">
                <div className="card-header">
                  <span className="me-2">
                    <i className="bi bi-bar-chart-fill"></i>
                  </span>
                  Quantity Order of Product
                </div>
                <div className="card-body">
                  <ChartProductOrder></ChartProductOrder>
                </div>
              </div>
            </div>
          </div>
          <div className="row" id="order-list">
            <div className="col-md-12 mb-3">
              <div className="card">
                <div className="card-header">
                  <span>
                    <i className="bi bi-table me-2"></i>
                  </span>{" "}
                  Data Table
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      id="example"
                      className="table table-striped data-table"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Order ID</th>
                          <th>Product Id</th>
                          <th>Product Name</th>
                          <th>Quantity</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailList.length > 0 ? (
                          detailList.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.detail_id}</td>
                                <td>{item.order_id}</td>
                                <td>{item.product_id}</td>
                                <td>{item.product_name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                              </tr>
                            );
                          })
                        ) : (
                          <div>No product to show</div>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
