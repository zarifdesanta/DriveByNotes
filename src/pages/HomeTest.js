import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Container,
  Slider,
} from "@mui/material";
import NoteCard from "../components/NoteCard";
import NoteInput from "../components/NoteInput";
import AddIcon from "@mui/icons-material/Add";
import NotesIcon from "@mui/icons-material/Notes";

function Home() {
  const [noteList, setNoteList] = useState([]);
  const [note, setNote] = useState("");
  const [title, setNoteTitle] = useState("");
  const [priority, setPriority] = useState("");

  var [date, setDate] = useState(new Date());

  useEffect(() => {
    const noteList = JSON.parse(localStorage.getItem("notelist"));
    if (noteList) {
      setNoteList(noteList);
    }
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
      /*
      if (date.getHours() + ":" + date.getMinutes() === "23:59") {
        localStorage.removeItem("notelist");
        const noteList = JSON.parse(localStorage.getItem("notelist"));
        if (noteList) {
          setNoteList(noteList);
        }
      }*/
    };
  }, []);

  const handleSetNoteList = (note, title, priority) => {
    if (note === "" && title === "") {
      return;
    } else {
      var e = { note: note, title: title, priority: priority };
      noteList.push(e);
      setNoteList(noteList);
      //console.log(noteList);
      setNote("");
      setNoteTitle("");
      localStorage.setItem("notelist", JSON.stringify(noteList));
    }
  };

  const deleteNote = (deleteId) => {
    let notesCopy = [...noteList];
    notesCopy.splice(deleteId, 1);
    setNoteList(notesCopy);
    localStorage.setItem("notelist", JSON.stringify(notesCopy));
  };

  function valuetext(value) {
    if (value === 100) {
      setPriority("high");
    } else if (value === 50) {
      setPriority("medium");
    } else {
      setPriority("low");
    }
  }

  return (
    <div className="wrapper-around">
      <div className="container-header">
        <NoteInput
          title={title}
          note={note}
          valuetext={valuetext}
          priority={priority}
          setNoteTitle={setNoteTitle}
          setNote={setNote}
          handleSetNoteList={handleSetNoteList}
        ></NoteInput>
      </div>

      <Container>
        <Grid container spacing={1.5} justifyContent={"center"}>
          {noteList.map((item, id) => {
            return (
              <Grid item>
                <NoteCard
                  textInput={item.note}
                  title={item.title}
                  key={id}
                  deleteFunc={() => deleteNote(id)}
                  priority={item.priority}
                ></NoteCard>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
