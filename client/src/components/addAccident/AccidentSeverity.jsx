import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";

export default function BasicSelect(props) {
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Severity</InputLabel>
        <Select
          labelId="accident-severity"
          id="demo-simple-select"
          label="Severity"
          {...props}
        >
          <MenuItem value={"catastrophic"}>catastrophique</MenuItem>
          <MenuItem value={"fatal"}>fatal</MenuItem>
          <MenuItem value={"without victims"}>without victims</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
