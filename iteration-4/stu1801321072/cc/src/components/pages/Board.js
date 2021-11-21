import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { TextField, Button, Grid } from "@material-ui/core";
import store from "../../store";
import { postContent, getContent } from "../../actions/controller";
import { setContent } from "../../actions/index";
import "./board.css";
const Board = () => {
  const [currentPost, setCurrentPost] = useState("");

  const handleCuurentPost = (e) => {
    setCurrentPost(e);
  };

  const submitCurrentPost = () => {
    if (currentPost !== undefined && currentPost.trim() !== "") {
      postContent(currentPost, new Date().toLocaleDateString("en-US"));
    }
  };

  return (
    <div className="flex justify-between">
      <div class="mt-32 mr-56 ml-16">
        <Grid container={"center"} alignItems={"center"} spacing={1}>
          <Grid item>
            <TextField
              label="What's on your mind?"
              onChange={(e) => handleCuurentPost(e.target.value)}
              rows={4}
              multiline
              margin="normal"
              variant="outlined"
              style={{ width: "400px" }}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => submitCurrentPost()}>
              POST
            </Button>
          </Grid>
        </Grid>
      </div>
      <div class="mt-32 mr-56 ml-16">
        <div class="containerChat">
          <p class="commentChat">
            Nutrients are substances used by an organism to survive, grow, and
            reproduce. The seven major classes of relevant nutrients for animals
            (including humans) are carbohydrates, dietary fiber, fats, proteins,
            minerals, vitamins, and water. Nutrients can be grouped as either
            macronutrients (carbohydrates, dietary fiber, fats, proteins, and
            water needed in gram quantities) or micronutrients (vitamins and
            minerals needed in milligram or microgram quantities).
          </p>
          <span class="time">11/21/2021</span>
        </div>
      </div>
    </div>
  );
};
export default Board;
