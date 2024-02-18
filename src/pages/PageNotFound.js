import Icon from "@mui/material/Icon";
// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
// Material Kit 2 React page layout routes
import routes from "routes";

// Images
import bgImage from "assets/images/404.jpg";

function NotFound() {
  return (
    <>
      {" "}
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
      <section
        className="ftco-section"
        style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}
      >
        <div style={{ height: "630px" }}></div>
      </section>
    </>
  );
}

export default NotFound;
