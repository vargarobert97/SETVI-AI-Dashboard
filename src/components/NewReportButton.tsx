import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { useReportStore } from "../stores/reportStore.ts";
import React from "react";

const NewReportButton = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const addReport = useReportStore((state) => state.addReport);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
  };

  const handleCreate = () => {
    if (title.trim()) {
      addReport({
        title,
        content: "",
      });
      handleClose();
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        New Report
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Report</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Report Title"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate} disabled={!title.trim()}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewReportButton;
