import { DialogContent, DialogContentText, TextField } from "@mui/material";
import React from "react";

const Profile = () => {
  // const []
  return (
    <DialogContent dividers>
      <DialogContentText>
        You can update your profile by updating these fields
      </DialogContentText>
      <TextField
        autoFocus
        margin="normal"
        type="text"
        inputProps={{ minLength: 2 }}
        fullWidth
        variants="standard"
        value
      />
    </DialogContent>
  );
};

export default Profile;
