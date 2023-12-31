import React from "react";
import { Button, Container } from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";
import { my_colors } from "../helper/Colors";

function Header({ isDark, toggleTextColor }) {
  return (
    <Container
      sx={{
        border: 2,
        borderColor: toggleTextColor(),
        display: "flex",
        justifyContent: "center",
        backgroundColor: isDark
          ? my_colors.at(0).bgDark
          : my_colors.at(0).bgLight,
      }}
    >
      <Button
        sx={{
          color: toggleTextColor(),
          fontSize: 24,
          fontWeight: "bold",
          backgroundColor: "transparent",
        }}
        size="big"
        disableFocusRipple={true}
        disableRipple={true}
        disableElevation={true}
        disableTouchRipple={true}
        startIcon={
          <NotesIcon
            fontSize="large"
            sx={{ color: toggleTextColor() }}
          ></NotesIcon>
        }
      >
        Drive By Notes
      </Button>
    </Container>
  );
}

export default Header;
