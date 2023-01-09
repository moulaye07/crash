import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import appActions from "../store/actions";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(accident, localization, date, time, severity) {
  return { accident, localization, date, time, severity };
}

export default function StationAccidentsList() {
  const [rows, setRows] = useState([]);
  const selectedStation = useSelector(
    (state) => state.AppState.selectedStation
  );
  const selectedStationAccidents = useSelector(
    (state) => state.AppState.selectedStationAccidents
  );
  const accidentDetails = useSelector(
    (state) => state.AppState.accidentDetails
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const URL = `${process.env.REACT_APP_BACKEND_SERVER}/accident/node`;

    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedStation),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((resData) => {
        console.log(resData);
        dispatch({
          type: appActions.SET_SELECTED_STATION_ACCIDENTS,
          payload: resData.accidents,
        });
      });

    setRows(
      selectedStationAccidents.map((accident) => {
        return createData(
          accident.id,
          accident.localization,
          accident.date,
          accident.timestamp,
          accident.severity
        );
      })
    );
    console.log(rows);
  }, [selectedStation]);

  // this function is for updating accident info by the police ,because the policeman must provide infos that are not detected by the camera

  const updateAccident = (id) => {
    const accident = selectedStationAccidents.filter(
      (accd) => accd.id == id
    )[0];
    dispatch({ type: appActions.SET_ACCIDENT_DETAILS, payload: accident });
    dispatch({ type: appActions.SET_RIGHT_SECTION_TAP, payload: 1 });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">accident</StyledTableCell>
            <StyledTableCell align="center">localization</StyledTableCell>
            <StyledTableCell align="center">date</StyledTableCell>
            <StyledTableCell align="center">time</StyledTableCell>
            <StyledTableCell align="center">severity</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              sx={{ cursor: "pointer" }}
              onClick={() => updateAccident(row.accident)}
              key={row.id}
            >
              <StyledTableCell align="center" component="th" scope="row">
                {row.accident}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.localization.longitude}
              </StyledTableCell>
              <StyledTableCell align="center">{row.date}</StyledTableCell>
              <StyledTableCell align="center">{row.time}</StyledTableCell>
              <StyledTableCell align="center">{row.severity}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
