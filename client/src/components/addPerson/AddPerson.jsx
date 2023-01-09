import { Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

function AddPerson() {
  const person = useSelector((state) => state.AppState.person);
  const dispatch = useDispatch();
  return (
    <Box>
      <TextField
        name="name"
        variant="outlined"
        label="name"
        value={person.name}
        onChange={(e) => {
          dispatch({ ...person, [e.target.name]: e.target.value });
        }}
      />
      <TextField
        name="cin"
        variant="outlined"
        label="name"
        value={person.name}
        onChange={(e) => {
          dispatch({ ...person, [e.target.name]: e.target.value });
        }}
      />
      <TextField
        name="phone"
        variant="outlined"
        label="name"
        value={person.name}
        onChange={(e) => {
          dispatch({ ...person, [e.target.name]: e.target.value });
        }}
      />
      <TextField
        name="address"
        variant="outlined"
        label="name"
        value={person.name}
        onChange={(e) => {
          dispatch({ ...person, [e.target.name]: e.target.value });
        }}
      />
      <TextField
        name="relatives"
        variant="outlined"
        label="name"
        value={person.name}
        onChange={(e) => {
          dispatch({ ...person, [e.target.name]: e.target.value });
        }}
      />
      <TextField
        name="email"
        variant="outlined"
        label="name"
        value={person.name}
        onChange={(e) => {
          dispatch({ ...person, [e.target.name]: e.target.value });
        }}
      />
      <TextField
        name="insurance"
        variant="outlined"
        label="name"
        value={person.name}
        onChange={(e) => {
          dispatch({ ...person, [e.target.name]: e.target.value });
        }}
      />
    </Box>
  );
}

export default AddPerson;
