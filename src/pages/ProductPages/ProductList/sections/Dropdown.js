import { useContext, useState } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import { FilterContext } from "context/FilterContext";

function Dropdown() {
  const { setSort } = useContext(FilterContext);
  const [dropdown, setDropdown] = useState(null);
  const openDropdown = ({ currentTarget }) => setDropdown(currentTarget);
  const closeDropdown = () => setDropdown(null);

  const setDesc = () => {
    setSort("desc");
    setDropdown(null);
  };
  const setAsc = () => {
    setSort("asc");
    setDropdown(null);
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
    <MKBox component="section" py={12}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6} textAlign="center">
            <MKButton variant="gradient" color="secondary" onClick={openDropdown}>
              <Icon>sort</Icon> <Icon sx={dropdownIconStyles}>expand_more</Icon>
            </MKButton>
            <Menu anchorEl={dropdown} open={Boolean(dropdown)} onClose={closeDropdown}>
              <MenuItem onClick={setAsc}>
                Low To High <Icon>arrow_upward</Icon>
              </MenuItem>
              <MenuItem onClick={setDesc}>
                High To Low <Icon>arrow_downward</Icon>
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Dropdown;
