import React from "react";
import "../styles/NoteCard.css";
import {
  Card,
  Typography,
  CardActions,
  CardContent,
  Button,
  Badge,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Draggable from "react-draggable";

function NoteCard({
  textInput,
  title,
  deleteFunc,
  priority = "low",
  toggleTextColor,
}) {
  const setPriorityColor = () => {
    if (priority === "high") {
      return "error";
    } else if (priority === "medium") {
      return "warning";
    } else {
      return "primary";
    }
  };

  return (
    <Draggable>
      <Badge color={setPriorityColor()} badgeContent="">
        <Card
          className="card-hover"
          sx={{
            columnWidth: 5000,
            backgroundColor: "transparent",
            borderRadius: 0,
            borderStyle: "dashed",
            borderWidth: 1,
            borderColor: toggleTextColor(),
          }}
          variant="outlined"
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 18, fontWeight: "bold" }}
              color={toggleTextColor()}
              gutterBottom
            >
              {title}
            </Typography>
            <Typography
              fontStyle={{ color: toggleTextColor() }}
              variant="body2"
              
            >
              {textInput}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "end" }}>
            <Button size="small" sx={{ color: "red" }} onClick={deleteFunc}>
              <DeleteOutlineIcon></DeleteOutlineIcon>
            </Button>
          </CardActions>
        </Card>
      </Badge>
    </Draggable>
  );
}

export default NoteCard;
