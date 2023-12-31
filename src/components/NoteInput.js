import React, { useEffect, useState } from "react";
import {
  TextField,
  Slider,
  Button,
  Typography,
  ButtonGroup,
  Menu,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../styles/Home.css";
import Draggable from "react-draggable";

function NoteInput({
  noteList,
  setNoteList,
  setIsGrid,
  isGrid,
  setIsDark,
  isDark,
  toggleTextColor,
}) {
  const [note, setNote] = useState("");
  const [title, setNoteTitle] = useState("");

  const handleSetNoteList = (note, title, priority) => {
    if (note === "" && title === "") {
      return;
    } else {
      var e = { note: note, title: title, priority: priority };
      noteList.push(e);
      const sortedNoteList = [...noteList].sort((a, b) =>
        a.priority === "high" ? -1 : 1
      );
      setNoteList(sortedNoteList);
      //console.log(noteList);
      setNote("");
      setNoteTitle("");
      localStorage.setItem("notelist", JSON.stringify(noteList));
    }
  };

  const handlePrioritySlider = (e) => {
    if (e === 100) {
      return "high";
    } else if (e === 50) {
      return "medium";
    } else {
      return "low";
    }
  };

  const [priority, setPriority] = useState("");

  function valuetext(value) {
    if (value === 100) {
      setPriority("high");
    } else if (value === 50) {
      setPriority("medium");
    } else {
      setPriority("low");
    }
  }

  const handleSetIsGrid = () => {
    setIsGrid(!isGrid);
    saveView(!isGrid);
    handleClose();
  };

  const handleSetIsDark = () => {
    setIsDark(!isDark);
    saveTheme(!isDark);
    handleClose();
  };

  const clearBoard = () => {
    noteList.splice(0, noteList.length);
    localStorage.clear();
    handleClose();
  };

  const saveTheme = (theme) => {
    localStorage.setItem("theme", JSON.stringify(theme));
  };

  const saveView = (view) => {
    localStorage.setItem("view", JSON.stringify(view));
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Draggable axis="none">
      <div
        className="input-container"
        style={{ borderColor: toggleTextColor() }}
      >
        {/**Title text field */}
        <TextField
          sx={{
            maxWidth: "100%",
            input: { color: toggleTextColor() },
            label: { color: toggleTextColor() },
            border: 0,
            borderBottom: 1,
            borderRadius: 0,
            borderColor: toggleTextColor(),
          }}
          InputProps={{
            disableUnderline: true,
          }}
          color="primary"
          label="Add Title..."
          InputLabelProps={{ style: { color: toggleTextColor() } }}
          variant="standard"
          value={title}
          onChange={(e) => setNoteTitle(e.target.value)}
        ></TextField>

        {/**Note text field */}
        <TextField
          sx={{
            maxWidth: "100%",
            input: { color: toggleTextColor() },
            label: { color: toggleTextColor() },
            border: 0,
            borderBottom: 1,
            borderRadius: 0,
            borderColor: toggleTextColor(),
          }}
          InputProps={{ disableUnderline: true }}
          color="primary"
          label="Add Note..."
          InputLabelProps={{ style: { color: toggleTextColor() } }}
          variant="standard"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></TextField>

        {/**Priority slider */}
        <Typography color={toggleTextColor()} alignSelf={""}>
          Priority
        </Typography>
        <Slider
          sx={{ color: toggleTextColor(), maxWidth: 190 }}
          aria-label="Priority"
          defaultValue={0}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={50}
          marks
          min={0}
          max={100}
          valueLabelFormat={(e) => handlePrioritySlider(e)}
        />

        <ButtonGroup variant="outlined">
          {/**Add btn */}
          <Button
            variant="outlined"
            sx={{
              color: toggleTextColor(),
              borderColor: toggleTextColor(),
              borderRadius: 0,
              borderWidth: 1,
            }}
            onClick={() => handleSetNoteList(note, title, priority)}
          >
            <AddIcon></AddIcon>
          </Button>
          {/**More options btn */}
          <Button
            variant="outlined"
            onClick={handleClick}
            sx={{
              color: toggleTextColor(),
              borderRadius: 0,
              borderColor: toggleTextColor(),
            }}
          >
            <MoreVertIcon></MoreVertIcon>
          </Button>
        </ButtonGroup>

        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleSetIsDark}>
            {isDark ? "Light Theme" : "Dark Theme"}
          </MenuItem>
          <MenuItem onClick={handleSetIsGrid}>
            {isGrid ? "List View" : "Grid View"}
          </MenuItem>
          <MenuItem onClick={clearBoard}>Clear Board</MenuItem>
        </Menu>
      </div>
    </Draggable>
  );
}

export default NoteInput;
