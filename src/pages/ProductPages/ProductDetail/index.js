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
import { useShoppingCart } from "context/ShoppingCartContext";

// Material Kit 2 React page layout routes
import routes from "routes";

// Hooks
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetFeedbacksByProductId,
  GetProductByID,
  GetProductImageByID,
  GetUserByID,
  PostFeedback,
} from "../service/ApiService";
import Swal from "sweetalert2";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const usertoken = JSON.parse(localStorage.getItem("userToken"));

  const { addMultiQuantity } = useShoppingCart();

  // date
  const today = new Date();
  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  const date =
    today.getFullYear() + "-" + checkTime(today.getMonth() + 1) + "-" + checkTime(today.getDate());

  // contain product information
  let [count, setCount] = useState(1);
  let [data, setData] = useState([]);
  let [images, setImages] = useState([]);

  // use to contain errors
  const [errors, setErrors] = useState("");

  // contain user information
  let [user, setUser] = useState([]);

  // contain feedback list
  let [totalStar, setTotalStar] = useState(0);
  let [fbList, setFbList] = useState([]);
  let [content, setContent] = useState("");
  let [star, setStar] = useState(5);

  // use to rerender page -> displays the comment just sent
  let [reset, setReset] = useState(false);

  let feedbackInfor = {
    title: user.fullname,
    content: content,
    start: star,
    product_id: id,
    user_id: user.user_id,
  };

  useEffect(() => {
    // get product information
    const fetchProductDataByID = async () => {
      try {
        const response = await GetProductByID(id);
        if (response.status === 200) {
          setData(response.data);
          const imageResponse = await GetProductImageByID(response.data.product_id);
          if (imageResponse.status === 200) {
            setImages(imageResponse.data);
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    // get user information
    const fetchUserDataByID = async () => {
      try {
        if (usertoken != null) {
          const response = await GetUserByID(usertoken.user_id);
          if (response.status === 200) {
            setUser(response.data);
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    // get list feedback
    const fetchFeedbackDataByProductID = async () => {
      try {
        // contain total start
        var sum = 0;
        const response = await GetFeedbacksByProductId(id);
        if (response.status === 200) {
          setFbList(response.data);
          for (var i = 0; i < response.data.length; i++) {
            sum = sum + response.data[i].start;
          }
          // conatain average start
          setTotalStar(sum / response.data.length);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchProductDataByID();
    fetchUserDataByID();
    fetchFeedbackDataByProductID();
  }, [reset]);

  // hadle save content off feedback
  function handleContent(e) {
    setContent(e.target.value);
  }

  // hadle save star off feedback
  function handleStar(rate) {
    setStar(rate);
  }

  // Validate data login
  const validateForm = (data) => {
    let err = "";
    if (data.content == "") {
      // when user doesn't input content
      err = "Content is required!";
    } else {
      // when user aldready feedback for your product
      fbList.forEach((element) => {
        if (element.user_id == feedbackInfor.user_id) {
          Swal.fire({
            title: "Send feedback faild!",
            text: "You cannot submit feedback because you have already done it for this product",
            icon: "error",
          });
          err = "Send feedback faild!";
        }
      });
    }
    return err;
  };

  // handle sumit feedback
  function handleSubmit(e) {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You want to submit Feetback!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const newErrors = validateForm(feedbackInfor);
        if (newErrors.length > 0) {
          setErrors(newErrors);
        } else {
          try {
            const response = await PostFeedback(feedbackInfor);
            if (response.status === 200) {
              Swal.fire("Completed!", "Feedback submitted successfully.", "success");
              setReset(!reset);
            }
          } catch (error) {
            setErrors(error);
          }
        }
      }
    });
  }
  // handale when user change quantity product
  const handleChangeInput = (e) => {
    setCount(e.target.value);
    // changeQuantity(item.product_id, e.target.value);
  };

  // check product instock
  function handleAddProductToCart(e) {
    e.preventDefault();
    if (count > 50 || count < 1) {
      Swal.fire({
        title: "Add To Cart faild!",
        text: "You can only buy from 1 to 50 products at a time",
        icon: "error",
      });
    } else if (data.instock < count) {
      Swal.fire({
        title: "Add To Cart faild!",
        text: "The quantity of product is not enough to meet your requirements!",
        icon: "error",
      });
    } else {
      addMultiQuantity(id, count, data.image, data.produc_name);
    }
  }

  // hidden error when typing
  const handleInputFocus = () => {
    setErrors("");
  };

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
  // return to previous page
  function goBack() {
    navigate(-1);
  }

  function goLogin() {
    // save previousPage Url for navigate after sign in
    localStorage.setItem("previousPage", window.location.href.slice(-4));
    navigate("/signin");
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
            <a onClick={goBack} className="goback-btn">
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
                      <img src={`http://localhost:5051/${images[0]}`} height="390px" />
                    </div>

                    <div className="tab-pane" id="pic-2">
                      <img src={`http://localhost:5051/${images[1]}`} height="390px" />
                    </div>
                    <div className="tab-pane" id="pic-3">
                      <img src={`http://localhost:5051/${images[2]}`} height="390px" />
                    </div>

                    {images[3] && (
                      <div className="tab-pane" id="pic-4">
                        <img src={`http://localhost:5051/${images[3]}`} height="390px" />
                      </div>
                    )}
                    {images[4] && (
                      <div className="tab-pane" id="pic-5">
                        <img src={`http://localhost:5051/${images[4]}`} height="390px" />
                      </div>
                    )}
                  </div>
                  <ul className="preview-thumbnail nav nav-tabs">
                    <li className="active">
                      <a data-target="#pic-1" data-toggle="tab">
                        <img
                          src={`http://localhost:5051/${images[0]}`}
                          height="71px"
                          width="103px"
                        />
                      </a>
                    </li>
                    <li>
                      <a data-target="#pic-2" data-toggle="tab">
                        <img
                          src={`http://localhost:5051/${images[1]}`}
                          height="71px"
                          width="103px"
                        />
                      </a>
                    </li>
                    <li>
                      <a data-target="#pic-3" data-toggle="tab">
                        <img
                          src={`http://localhost:5051/${images[2]}`}
                          height="71px"
                          width="103px"
                        />
                      </a>
                    </li>
                    {images[3] && (
                      <li>
                        <a data-target="#pic-4" data-toggle="tab">
                          <img
                            src={`http://localhost:5051/${images[3]}`}
                            height="71px"
                            width="103px"
                          />
                        </a>
                      </li>
                    )}
                    {images[4] && (
                      <li>
                        <a data-target="#pic-5" data-toggle="tab">
                          <img
                            src={`http://localhost:5051/${images[4]}`}
                            height="71px"
                            width="103px"
                          />
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="details col-md-6 position-relative">
                  <h2 className="product-title">{data.produc_name}</h2>
                  <div className="rating">
                    <div className="stars">
                      <span className={totalStar >= 1 ? "fa fa-star checked" : "fa fa-star"}></span>
                      <span className={totalStar >= 2 ? "fa fa-star checked" : "fa fa-star"}></span>
                      <span className={totalStar >= 3 ? "fa fa-star checked" : "fa fa-star"}></span>
                      <span className={totalStar >= 4 ? "fa fa-star checked" : "fa fa-star"}></span>
                      <span className={totalStar == 5 ? "fa fa-star checked" : "fa fa-star"}></span>
                    </div>
                    <span className="review-no"> {fbList.length} reviews &nbsp;</span>
                  </div>
                  <p className="product-description">
                    {/* {data.description.length > 27
                      ? `${data.description.substring(0, 100)}...`
                      : data.description} */}
                    {data.description}
                  </p>
                  <h4 className="price">
                    Current price: <span>$180</span>
                  </h4>
                  {/* <p className="vote">
                    <strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong>
                  </p> */}
                  <h5 className="sizes mt-1">
                    sizes: &nbsp;&nbsp;
                    <input type="radio" id="small" name="size" value="small" />
                    <label htmlFor="small">S &nbsp; </label>
                    <input type="radio" id="medium" name="size" value="medium" />
                    <label htmlFor="medium">M &nbsp; </label>
                    <input type="radio" id="large" name="size" value="large" />
                    <label htmlFor="large">L &nbsp; </label>
                  </h5>
                  <div className="def-number-input number-input safari_only mt-5">
                    <button
                      className="minus"
                      onClick={() => {
                        decrementCount();
                      }}
                    ></button>
                    <input
                      className="quantity fw-bold text-black"
                      type="number"
                      value={count}
                      onChange={handleChangeInput}
                    />
                    <button
                      className="plus"
                      onClick={() => {
                        incrementCount();
                      }}
                    ></button>
                  </div>
                  <span className="text-danger small font-weight-light">
                    Instock: {data.instock}
                  </span>

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
                    <button
                      className="add-to-cart btn btn-primary"
                      type="button"
                      onClick={handleAddProductToCart}
                    >
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
      <form onSubmit={handleSubmit} method="post">
        <div className="card-cmt mt-5">
          <div className="row">
            <div className="col-2">
              <img
                src="https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                width="70"
                className="rounded-circle mt-2 img-ml"
              />
            </div>

            <div className="col-10">
              <div className="comment-box ml-2">
                {usertoken != null ? (
                  <h4>{user.fullname}</h4>
                ) : (
                  <h4>
                    Please login to comment &nbsp; &nbsp;
                    <button className="btn btn-primary" onClick={goLogin}>
                      Login
                    </button>
                  </h4>
                )}

                <div className="rating">
                  <input
                    type="radio"
                    name="rating"
                    value="5"
                    id="5"
                    onChange={() => {
                      handleStar(5);
                    }}
                  />
                  <label htmlFor="5">☆</label>
                  <input
                    type="radio"
                    name="rating"
                    value="4"
                    id="4"
                    onChange={() => {
                      handleStar(4);
                    }}
                  />
                  <label htmlFor="4">☆</label>
                  <input
                    type="radio"
                    name="rating"
                    value="3"
                    id="3"
                    onChange={() => {
                      handleStar(3);
                    }}
                  />
                  <label htmlFor="3">☆</label>
                  <input
                    type="radio"
                    name="rating"
                    value="2"
                    id="2"
                    onChange={() => {
                      handleStar(2);
                    }}
                  />
                  <label htmlFor="2">☆</label>
                  <input
                    type="radio"
                    name="rating"
                    value="1"
                    id="1"
                    onChange={() => {
                      handleStar(1);
                    }}
                  />
                  <label htmlFor="1">☆</label>
                </div>

                <div className="comment-area">
                  <textarea
                    className="form-control"
                    placeholder="what is your view?"
                    rows="4"
                    onBlur={handleContent}
                    onFocus={() => handleInputFocus()}
                  ></textarea>
                </div>
                <p className="small text-danger">{errors}</p>

                <div className="comment-btns mt-2 mb-4">
                  <div className="d-flex justify-content-end align-items-center">
                    <button
                      className="btn btn-success send btn-sm"
                      disabled={usertoken == null}
                      type="submit"
                    >
                      Send <i className="fa fa-long-arrow-right ml-1"></i>
                    </button>
                    <div style={{ width: "20px" }}></div>
                    {/* <button className="btn btn-secondary btn-sm">Cancel</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="card-list">
        {fbList.map((item, index) => (
          <div className="comment-box ml-2 pt-3" key={index}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center justify-content-start">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                  width="30"
                  className="rounded-circle img-ml"
                />
                <h5 className="mb-0"> &nbsp; &nbsp; {item.title} &nbsp; &nbsp; &nbsp;</h5>
                <div>
                  <span className="small text-primaryno">{item.start}</span>
                  <label htmlFor="1" className="text-primary">
                    ☆
                  </label>
                </div>
              </div>
              <div>
                <span className="small ">{date} &nbsp; &nbsp; &nbsp;</span>
              </div>
            </div>

            <div className="w-75 text-box">
              <span>
                {/* {item.content.length > 120
                  ? `${item.content.substring(0, 120)}...`
                  : item.content} */}
                {item.content}
              </span>
            </div>
            {index != fbList.length - 1 && <hr className="my-hr" />}
          </div>
        ))}
      </div>

      {/* </div> */}

      {/* {fbList.map((item, index) => (
        <div
          class="dbox w-100 align-items-start border border border-light p-2  text-secondary mb-2 bg-light"
          style={{ borderRadius: "10px" }}
        >
          <div className="d-flex align-items-center justify-content-between w-100 ">
            <div>
              <span className="font-weight-bold" style={{ fontSize: "14px" }}>
                {listUser[index]}
              </span>
            </div>
            <div style={{ fontSize: "10px" }}>
              {item.rate}
              <i class="fas fa-star text-danger ml-1"></i>
            </div>
          </div>

          <div className="d-flex  align-items-start justify-content-between w-100 ">
            <div className="col-sm-5 pl-0 pr-0">
              <span className="font-weight-bold" style={{ fontSize: "14px" }}>
                FEEDBACK ABOUT:
              </span>
            </div>
            <div className="col-sm-7  pl-0 pr-0">
              <span>{listService[index]} </span>
            </div>
          </div>
          <div className=" w-100 ">
            <div className="font-weight-bold">
              <span style={{ fontSize: "14px" }}>CONTENT :</span>
            </div>
            <div className="border p-1 rounded">
              <span>
                {" "}
                {item.content.length > 120
                  ? `${item.content.substring(0, 120)}...`
                  : item.content}{" "}
              </span>
            </div>
          </div>
        </div>
      ))} */}

      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}
