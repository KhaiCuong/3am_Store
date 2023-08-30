// CSS
import "../css/product.css";

// @mui material components
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import footerRoutes from "footer.routes";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Material Kit 2 React page layout routes
import routes from "routes";

// Hooks
import { useState } from "react";

export default function ProductDetail() {
  let [count, setCount] = useState(1);

  const a =
    "Suspendisse quos? Tempus cras iure temporibus? Eu laudantium cubilia sem semsdasdasdassssssssssssssssssssssssssssssssssb";

  // handle when user click the "+" button
  function incrementCount() {
    count = count + 1;
    setCount(count);
  }
  // handle when user click the "-" button
  function decrementCount() {
    count = count - 1;
    setCount(count);
  }
  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: false,
          label: <Icon>shopping_cart</Icon>,
          color: "info",
        }}
        sticky
      />

      <Grid container spacing={3} alignItems="center">
        <div className="container mt-5">
          {/* Back to previous page */}
          <div className="container mt-5 pt-5">
            <a>
              <Icon>arrow_back</Icon> Back to previous page
            </a>
          </div>
          {/* Product information */}
          <div className="card mt-2">
            <div className="container-fliud">
              <div className="wrapper row">
                <div className="preview col-md-6">
                  <div className="preview-pic tab-content">
                    <div className="tab-pane active" id="pic-1">
                      <img src="http://placekitten.com/400/252" />
                    </div>
                    <div className="tab-pane" id="pic-2">
                      <img src="http://placekitten.com/400/252" />
                    </div>
                    <div className="tab-pane" id="pic-3">
                      <img src="http://placekitten.com/400/252" />
                    </div>
                    <div className="tab-pane" id="pic-4">
                      <img src="http://placekitten.com/400/252" />
                    </div>
                    <div className="tab-pane" id="pic-5">
                      <img src="http://placekitten.com/400/252" />
                    </div>
                  </div>
                  <ul className="preview-thumbnail nav nav-tabs">
                    <li className="active">
                      <a data-target="#pic-1" data-toggle="tab">
                        <img src="http://placekitten.com/200/126" />
                      </a>
                    </li>
                    <li>
                      <a data-target="#pic-2" data-toggle="tab">
                        <img src="http://placekitten.com/200/126" />
                      </a>
                    </li>
                    <li>
                      <a data-target="#pic-3" data-toggle="tab">
                        <img src="http://placekitten.com/200/126" />
                      </a>
                    </li>
                    <li>
                      <a data-target="#pic-4" data-toggle="tab">
                        <img src="http://placekitten.com/200/126" />
                      </a>
                    </li>
                    <li>
                      <a data-target="#pic-5" data-toggle="tab">
                        <img src="http://placekitten.com/200/126" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="details col-md-6 position-relative">
                  <h3 className="product-title">men&apos;s shoes fashion</h3>
                  <div className="rating">
                    <div className="stars">
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                    </div>
                    <span className="review-no">41 reviews</span>
                  </div>
                  <p className="product-description">
                    {a.length > 27 ? `${a.substring(0, 100)}...` : a}

                    {/* {item.description.length > 27 ? `${item.description.substring(0, 27)}...` : item.description} */}
                  </p>
                  <h4 className="price">
                    Current price: <span>$180</span>
                  </h4>
                  {/* <p className="vote">
                    <strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong>
                  </p> */}
                  <h5 className="sizes">
                    sizes: &nbsp;&nbsp;
                    <input type="radio" id="small" name="size" value="small" />
                    <label htmlFor="small">S &nbsp; </label>
                    <input type="radio" id="medium" name="size" value="medium" />
                    <label htmlFor="medium">M &nbsp; </label>
                    <input type="radio" id="large" name="size" value="large" />
                    <label htmlFor="large">L &nbsp; </label>
                  </h5>
                  <div className="def-number-input number-input safari_only">
                    <button
                      className="minus"
                      onClick={() => {
                        decrementCount();
                      }}
                    ></button>
                    <input className="quantity fw-bold text-black" type="number" value={count} />
                    <button
                      className="plus"
                      onClick={() => {
                        incrementCount();
                      }}
                    ></button>
                  </div>

                  {/* <h5 className="colors">
                    colors:
                    <span
                      className="color orange not-available"
                      data-toggle="tooltip"
                      title="Not In store"
                    ></span>
                    <span className="color green"></span>
                    <span className="color blue"></span>
                  </h5> */}
                  <div className="box-null"></div>
                  <div className="action btn-add-to-cart">
                    <button className="add-to-cart btn btn-default" type="button">
                      add to cart <Icon>shopping_cart</Icon>
                    </button>
                    {/* <button className="like btn btn-default" type="button">
                      <span className="fa fa-heart"></span>
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Grid>
      {/* Comment area */}
      {/* <div className="d-flex justify-content-around"> */}
      <div className="card-cmt mt-5">
        <div className="row">
          <div className="col-2">
            <img
              src="https://i.imgur.com/xELPaag.jpg"
              width="70"
              className="rounded-circle mt-2 img-ml"
            />
          </div>

          <div className="col-10">
            <div className="comment-box ml-2">
              <h4>Add a comment</h4>

              <div className="rating">
                <input type="radio" name="rating" value="5" id="5" />
                <label htmlFor="5">☆</label>
                <input type="radio" name="rating" value="4" id="4" />
                <label htmlFor="4">☆</label>
                <input type="radio" name="rating" value="3" id="3" />
                <label htmlFor="3">☆</label>
                <input type="radio" name="rating" value="2" id="2" />
                <label htmlFor="2">☆</label>
                <input type="radio" name="rating" value="1" id="1" />
                <label htmlFor="1">☆</label>
              </div>

              <div className="comment-area">
                <textarea
                  className="form-control"
                  placeholder="what is your view?"
                  rows="4"
                ></textarea>
              </div>

              <div className="comment-btns mt-2 mb-4">
                <div className="d-flex justify-content-end align-items-center">
                  <button className="btn btn-success send btn-sm">
                    Send <i className="fa fa-long-arrow-right ml-1"></i>
                  </button>
                  <div style={{ width: "20px" }}></div>
                  <button className="btn btn-secondary btn-sm">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}

      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}
