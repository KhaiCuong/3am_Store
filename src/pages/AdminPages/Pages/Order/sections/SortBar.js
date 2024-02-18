import { useState } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";

// eslint-disable-next-line react/prop-types
function SortBar({ onSortByStatus }) {
  const [dropdown, setDropdown] = useState(null);
  const openDropdown = ({ currentTarget }) => setDropdown(currentTarget);
  const closeDropdown = () => setDropdown(null);

  //   const [setSelectedStatus] = useState("");

  const handleStatusChange = (status) => {
    // setSelectedStatus(status);
    onSortByStatus(status);
  };

  // Styles
  const iconStyles = {
    ml: 1,
    fontWeight: "bold",
    transition: "transform 200ms ease-in-out",
  };

  const dropdownIconStyles = {
    transform: dropdown ? "rotate(180deg)" : "rotate(0)",
    ...iconStyles,
  };

  return (
    <MKBox component="section" py={1}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6} textAlign="center">
            <MKButton variant="gradient" color="secondary" onClick={openDropdown}>
              <Icon>sort</Icon> <Icon sx={dropdownIconStyles}>expand_more</Icon>
            </MKButton>
            <Menu anchorEl={dropdown} open={Boolean(dropdown)} onClose={closeDropdown}>
              <MenuItem onClick={() => handleStatusChange("")} style={{ color: "black" }}>
                All
              </MenuItem>
              <MenuItem onClick={() => handleStatusChange("Preparing")} style={{ color: "orange" }}>
                Preparing
              </MenuItem>
              <MenuItem onClick={() => handleStatusChange("Completed")} style={{ color: "green" }}>
                Completed
              </MenuItem>
              <MenuItem onClick={() => handleStatusChange("Delivery")} style={{ color: "blue" }}>
                Delivery
              </MenuItem>
              <MenuItem onClick={() => handleStatusChange("Canceled")} style={{ color: "red" }}>
                Canceled
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default SortBar;
