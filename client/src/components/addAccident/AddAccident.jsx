import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import appActions from "../../store/actions";
import AccidentSeverity from "./AccidentSeverity";
import AccidentVehicules from "./AccidentVehicules";
import AccidentCasualities from "./AccidentCasualities";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AddAccident = () => {
  const [succes, setSuccess] = useState(false);
  const accidentDetails = useSelector(
    (state) => state.AppState.accidentDetails
  );
  const { id, severity, victims, injured, dead, casualities, vehicules } =
    accidentDetails;

  const selectedAccident = useSelector(
    (state) => state.AppState.accidentDetails
  );

  const dispatch = useDispatch();
  const accidentId = selectedAccident.id;
  const URL = `${process.env.REACT_APP_BACKEND_SERVER}/accident/${accidentDetails}`;
  const handleSubmitAccidentDetails = () => {
    fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accidentDetails),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((resData) => {
        setSuccess(true);
        dispatch({
          type: appActions.SET_ACCIDENT_DETAILS,
          payload: resData,
        });
      });
  };
  return (
    <Box sx={{ m: 5 }}>
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3,
          textAlign: "left",
          fontWeight: "bold",
        }}
      >
        Accident Identifiant: {selectedAccident.id}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: 5 }}>
        <Box>
          <AccidentSeverity
            value={accidentDetails.severity}
            onChange={(e) => {
              dispatch({
                type: appActions.SET_ACCIDENT_DETAILS,
                payload: { ...accidentDetails, severity: e.target.value },
              });
            }}
            variant="outlined"
          />
        </Box>
        <Box sx={{}}>
          <TextField
            value={injured}
            label="Injured"
            onChange={(e) => {
              dispatch({
                type: appActions.SET_ACCIDENT_DETAILS,
                payload: { ...accidentDetails, injured: e.target.value },
              });
            }}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box>
          <TextField
            label="Dead"
            value={dead}
            onChange={(e) => {
              dispatch({
                type: appActions.SET_ACCIDENT_DETAILS,
                payload: { ...accidentDetails, dead: e.target.value },
              });
            }}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box>
          <AccidentCasualities />
        </Box>

        <Box>
          <AccidentVehicules />
        </Box>
      </Box>
      <Button
        sx={{ mt: 5 }}
        size="large"
        variant="contained"
        onClick={handleSubmitAccidentDetails}
        fullWidth
      >
        Submit
      </Button>
      <SuccessDialog succes={succes} />
    </Box>
  );
};

export default AddAccident;

function SuccessDialog({ succes }) {
  const [open, setOpen] = useState(succes);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle color="green" id="alert-dialog-title">
          Succes !
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Accident infos was added succefully
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
