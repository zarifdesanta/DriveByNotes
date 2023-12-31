import { Container, Typography } from "@mui/material";
import React from "react";

function Footer({ toggleTextColor }) {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="body5" sx={{ color: toggleTextColor() }}>
        Contact Email: zarifdesanta@gmail.com
      </Typography>
      <Typography variant="body5" sx={{ color: toggleTextColor() }}>
        &copy; 2023 drivebynotes.netlify.app
      </Typography>
    </Container>
  );
}

export default Footer;
