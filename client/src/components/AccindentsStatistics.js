import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccidentDatePicker from "./AccidentDatePicker";

const AccindentsStatistics = () => {
  const statistics = useSelector(
    (state) => state.AppState.currentStationStatistics
  );
  const selectedStation = useSelector(
    (state) => state.AppState.selectedStation
  );

  return (
    <>
      <Grid container gap={6} p={2}>
        <Grid item xs={4}>
          <Box sx={{ m: 3, mb: 3, display: "flex", alignItems: "center" }}>
            <Box sx={{ fontSize: 12 }}>
              <Typography color="red">longitude:</Typography>{" "}
              <Typography sx={{ fontSize: 12, fontWeight: "bold" }}>
                {selectedStation.longitude}
              </Typography>
              <Typography color="red">latitude:</Typography>{" "}
              <Typography sx={{ fontSize: 12, fontWeight: "bold" }}>
                {" "}
                {selectedStation.latitude}
              </Typography>{" "}
            </Box>{" "}
          </Box>
        </Grid>
        <Grid xs={5} item>
          <AccidentDatePicker />
        </Grid>

        <Grid item xs={3} sx={{ bgcolor: "#eee" }}>
          <Paper sx={{ p: 1, border: "1px solid #bbb" }} elevation={4}>
            <Typography variant="body2" sx={{ color: "#000" }}>
              Accidents
            </Typography>
            <Typography
              p={5}
              sx={{ color: "blue", fontWeight: "bold", fontSize: 23 }}
            >
              {statistics.victims}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3} sx={{ bgcolor: "#eee" }}>
          <Paper sx={{ p: 1, border: "1px solid #bbb" }} elevation={4}>
            <Typography variant="body2" sx={{ color: "#000" }}>
              Injured
            </Typography>
            <Typography
              p={5}
              sx={{ color: "red", fontWeight: "bold", fontSize: 23 }}
            >
              {statistics.injured}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3} sx={{ bgcolor: "#eee" }}>
          <Paper sx={{ p: 1, border: "1px solid #bbb" }} elevation={4}>
            <Typography variant="body2" sx={{ color: "#000" }}>
              Dead
            </Typography>
            <Typography
              p={5}
              sx={{ color: "green", fontWeight: "bold", fontSize: 23 }}
            >
              {statistics.dead}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3} sx={{ bgcolor: "#eee" }}>
          <Paper sx={{ p: 1, border: "1px solid #bbb" }} elevation={4}>
            <Typography variant="body2" sx={{ color: "#000" }}>
              Severity
            </Typography>
            <Typography
              p={5}
              sx={{ color: "green", fontWeight: "bold", fontSize: 23 }}
            >
              {statistics.severity}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default AccindentsStatistics;
