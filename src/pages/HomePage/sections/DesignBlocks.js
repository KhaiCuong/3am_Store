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
import MKBadge from "components/MKBadge";
import MKTypography from "components/MKTypography";

// Presentation page components
import ExampleCard from "pages/HomePage/components/ExampleCard";

// Data
import { dataCasio, dataOmega, dataOrient, dataRolex } from "./data/dataProduct";

function DesignBlocks() {
  const data = [
    {
      title: "Casio",
      description:
        "Casio tại Việt Nam gắn với hình ảnh những chiếc đồng hồ điện tử bền bỉ, chính xác, thách thức mọi điều kiện khắc nghiệt của môi trường.",
      items: dataCasio(),
    },
    {
      title: "Rolex",
      description:
        " Đồng hồ Rolex có kiểu dáng tinh tế, sang trọng và được chế tác tỉ mỉ, mang lại sự đẳng cấp cho người dùng.",
      items: dataRolex(),
    },
    {
      title: "Orient",
      description:
        "Orient có xu hướng thiết kế đơn giản. Khác với các hãng đồng hồ Nhật khác, Orient trọng tâm phát triển dòng máy cơ Automatic bình dân. ",
      items: dataOrient(),
    },
    {
      title: "Omega",
      description:
        "Omega đã có 170 năm đi cùng với thăng trầm của lịch sử ngành công nghiệp chế tác đồng hồ. Hãng đánh dấu thương hiệu của mình với mẫu đồng hồ du hành vũ trụ lừng danh. ",
      items: dataOmega(),
    },
  ];

  const renderData = data.map(({ title, description, items }) => (
    <Grid container spacing={3} sx={{ mb: 10 }} key={title}>
      <Grid item xs={12} lg={3}>
        <MKBox position="sticky" top="100px" pb={{ xs: 2, lg: 6 }}>
          <MKTypography variant="h3" fontWeight="bold" mb={1}>
            {title}
          </MKTypography>
          <MKTypography variant="body2" fontWeight="regular" color="secondary" mb={1} pr={2}>
            {description}
          </MKTypography>
        </MKBox>
      </Grid>
      <Grid item xs={12} lg={9}>
        <Grid container spacing={3}>
          {items.map(({ image, name, count, route, pro }) => (
            <Grid item xs={12} md={4} sx={{ mb: 2 }} key={name}>
              <Link to={pro ? "/" : route}>
                <ExampleCard image={image} name={name} count={count} pro={pro} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  ));

  return (
    <MKBox component="section" my={6} py={6}>
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={6}
          flexDirection="column"
          alignItems="center"
          sx={{ textAlign: "center", my: 6, mx: "auto", px: 0.75 }}
        >
          <MKBadge
            variant="contained"
            color="info"
            badgeContent="3AM Store"
            container
            sx={{ mb: 2 }}
          />
          <MKTypography variant="h2" fontWeight="bold">
            Top thương hiệu được yêu thích
          </MKTypography>
          <MKTypography variant="body1" color="text" fontSize="14px">
            3AM Store là một đại lý phân phối sản phẩm chính hãng của các thương hiệu hàng đầu như
            Rolex, Omega, Casio, Orient, ... Quý khách có thể an tâm mua sắm tại website của chúng
            tôi.
          </MKTypography>
        </Grid>
      </Container>
      <Container sx={{ mt: 6 }}>{renderData}</Container>
    </MKBox>
  );
}

export default DesignBlocks;
