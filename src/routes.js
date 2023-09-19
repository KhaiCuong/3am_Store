// @mui material components
import Icon from "@mui/material/Icon";

const routes = [
  {
    name: "Home",
    icon: <Icon>dashboard</Icon>,
    route: "pages/HomePage",
  },
  {
    name: "products",
    icon: <Icon>view_day</Icon>,
    route: "/products",
  },
  {
    name: "Website",
    icon: <Icon>article</Icon>,

    collapse: [
      {
        name: "About us",
        route: "/about-us",
      },
      {
        name: "Contact",
        route: "/contact",
      },
    ],
  },
  {
    name: "Account",
    icon: <Icon>person</Icon>,
    collapse: [
      {
        name: "Sign up",
        route: "/signup",
      },
      {
        name: "Sign in",
        route: "/signin",
      },
    ],
  },
];

export default routes;
