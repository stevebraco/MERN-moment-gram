import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/postsActions";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const [postData, setPostData] = useState({
    // creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const user = JSON.parse(localStorage.getItem('profile'))
  // if we have the currentId then we want to loop over state.posts and call find method on them. we want the same id
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  ); //posts de combineReducer
  const dispatch = useDispatch();


  useEffect(() => {
    // if post exists then we're going set post data
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if we have a currentId
    if (currentId) {
      //Update
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name})) ;
    } else {
      //Create
      dispatch(createPost({ ...postData, name: user?.result?.name}));
    }
    clear();
  };

  const clear = () => {
  setCurrentId(null);
  setPostData({
    // creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
}

if(!user?.result?.name) {
  return (
    <Paper className={classes.paper}>
      <Typography variant='h6' align='center' >
        Please Sign In to create your own memories
      </Typography>

    </Paper>
  )
}

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        {/* <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        ></TextField> */}
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        ></TextField>
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        ></TextField>
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") }) // split for # before the word
          }
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          size="large"
          color="primary"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          fullWidth
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
