/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
// import MKBadge from "components/MKBadge";

// Presentation page components
import ExampleCard from "pages/HomePage/components/ExampleCard";

// Data

// Paginate
import ReactPaginate from "react-paginate";
import { NumberOfPage, ProductData } from "./data/ProductData";
import { useContext, useState } from "react";
import { FilterContext } from "../context/FilterContext";

function Product() {
  const { sort, fKey } = useContext(FilterContext);
  const totalPage = NumberOfPage();
  const [page, setPage] = useState(1);
  const data = [
    {
      title: "Design Blocks",
      items: ProductData(page, sort, fKey),
    },
  ];
  const renderData = data.map(({ title, items }) => (
    <Grid container spacing={3} sx={{ mb: 3 }} key={title}>
      <Grid item xs={12} lg={12}>
        <Grid container spacing={3}>
          {items.map(({ image, name, count, route, pro }) => (
            <Grid item xs={12} md={4} lg={3} sx={{ mb: 2 }} key={name}>
              <Link to={pro ? "/" : route}>
                <ExampleCard image={image} name={name} count={count} pro={pro} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  ));
  const handlePageClick = (event) => {
    setPage(+event.selected + 1);
    console.log("page", page);
  };
  return (
    <>
      <MKBox component="section" my={0} py={0}>
        <Container sx={{ mt: 0 }}>{renderData}</Container>
      </MKBox>

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
    </>
  );
}

export default Product;
