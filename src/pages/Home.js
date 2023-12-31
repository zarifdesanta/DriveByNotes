import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import { Grid, Container, Typography } from "@mui/material";
import NoteCard from "../components/NoteCard";
import NoteInput from "../components/NoteInput";
import { Masonry } from "@mui/lab";
import { my_colors } from "../helper/Colors";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  const [noteList, setNoteList] = useState([]);
  const [isGrid, setIsGrid] = useState(true);
  const [isDark, setIsDark] = useState(true);

  var [date, setDate] = useState(new Date());

  useEffect(() => {
    const noteList = JSON.parse(localStorage.getItem("notelist"));

    if (noteList) {
      const sortedNoteList = [...noteList].sort((a, b) =>
        a.priority === "high" ? -1 : 1
      );
      setNoteList(sortedNoteList);
    }

    const theme = JSON.parse(localStorage.getItem("theme"));
    setIsDark(theme);

    const view = JSON.parse(localStorage.getItem("view"));
    setIsGrid(view);

    //console.log(my_colors.at(0).bgLight);

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

  const deleteNote = (deleteId) => {
    let notesCopy = [...noteList];
    notesCopy.splice(deleteId, 1);
    setNoteList(notesCopy);
    localStorage.setItem("notelist", JSON.stringify(notesCopy));
  };

  const toggleTextColor = () => {
    if (isDark) {
      return my_colors.at(0).textWhite;
    } else {
      return my_colors.at(0).textBlack;
    }
  };

  return (
    <div
      style={{
        background: isDark ? my_colors.at(0).bgDark : my_colors.at(0).bgLight,
      }}
    >
      <Header isDark={isDark} toggleTextColor={toggleTextColor}></Header>
      <Container>
        <div className="input-wrapper"></div>
        <Grid container justifyContent={"center"}>
          <Masonry
            columns={isGrid ? { xs: 1, sm: 2, md: 3, lg: 4 } : { xs: 1 }}
            spacing={2}
          >
            <NoteInput
              noteList={noteList}
              setNoteList={setNoteList}
              setIsGrid={setIsGrid}
              isGrid={isGrid}
              setIsDark={setIsDark}
              isDark={isDark}
              toggleTextColor={toggleTextColor}
            ></NoteInput>
            {noteList.map((item, id) => {
              return (
                <Grid item>
                  <NoteCard
                    textInput={item.note}
                    title={item.title}
                    key={id}
                    deleteFunc={() => deleteNote(id)}
                    priority={item.priority}
                    toggleTextColor={toggleTextColor}
                  ></NoteCard>
                </Grid>
              );
            })}
          </Masonry>
        </Grid>
      </Container>
      <Footer toggleTextColor={toggleTextColor}></Footer>
    </div>
  );
}

export default Home;
